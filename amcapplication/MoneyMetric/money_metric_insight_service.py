from .historical_data_engine import get_historical_data
from .dto import KeyValuePairDTO,EquityDTO,PortfolioDTO
import numpy as np
from scipy.optimize import minimize
from django.db.models import F, ExpressionWrapper, fields
from django.db.models import Sum
import math
import pandas as pd

def populate_portfolio_metrics(portfolio):
    symbol_list=portfolio.get_equity_symbols()
    
    historical_data=get_historical_data(symbol_list)
    returns, risks,latest_prices  =calculate_metrics(historical_data)
    portfolio.set_cagrs(returns)
    portfolio.set_risks(risks)
    portfolio.set_latest_prices(latest_prices)
    portfolio.Enable_metrics()
    portfolio_return, portfolio_risk=current_portfolio_risk_return(portfolio.get_equities(),portfolio.get_total_portfolio_value())
    portfolio.set_current_return(portfolio_return)
    portfolio.set_current_risk(portfolio_risk)
    return portfolio



def current_portfolio_risk_return(equity_list, total_portfolio_value):
    
    weights = [float(equity.amount_invested / total_portfolio_value) for equity in equity_list]
    
    expected_returns = [float(equity.cagr) for equity in equity_list]
    risk_values = [equity.risk for equity in equity_list]
    cov_matrix = np.diag(np.square(risk_values))

    # Calculate the portfolio return
    portfolio_return = np.dot(weights, expected_returns)

    # # Calculate the portfolio risk (standard deviation)
    portfolio_risk = np.sqrt(np.dot(weights, np.dot(cov_matrix, weights)))

    return portfolio_return, portfolio_risk
    
    

def calculate_metrics(historical_data):
    latest_prices = historical_data.tail(1)
    log_ret=np.log(historical_data / historical_data.shift(1))
    annual_mu_df=log_ret.mean()*12
    sigma=log_ret.std()
    annual_std_df=sigma*np.sqrt(12)
    risk_list=[KeyValuePairDTO(index, value) for index, value in annual_std_df.items()]
    cagr_list=[KeyValuePairDTO(index, np.exp(value) - 1) for index, value in annual_mu_df.items()]
    latest_price_list=[KeyValuePairDTO(index, value) for index, value in latest_prices.items()]
    return cagr_list,risk_list,latest_price_list

def get_optimised_portfolio(portfolio):
    if not portfolio.has_metrics:
        portfolio = populate_portfolio_metrics(portfolio)
    optimal_equity_list,optimised_return,optimised_risk=optimize_portfolio(equity_data_list=portfolio.get_equities())
    portfolio.set_equities(optimal_equity_list)
    portfolio.set_optimised_return(optimised_return)
    portfolio.set_optimised_risk(optimised_risk)
    portfolio.is_optimised=True
    return portfolio

def optimize_portfolio(equity_data_list, risk_free_rate=0.03):
    # Calculate expected returns
    expected_returns = [equity.get_cagr() for equity in equity_data_list]

    #  Calculate the covariance matrix (diagonal for independent equities)
    risk_values = [equity.get_risk() for equity in equity_data_list]
    cov_matrix = np.diag(np.square(risk_values))

    # Define the negative Sharpe ratio objective function
    def negative_sharpe(weights, expected_returns, cov_matrix, risk_free_rate):
        portfolio_return = np.sum(weights * expected_returns)
        portfolio_stddev = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_stddev
        return -sharpe_ratio

    # Define constraints (e.g., sum of weights equals 1)
    constraints = ({'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1})

    # Define bounds (weights between 0 and 1)
    bounds = tuple((0, 1) for asset in range(len(equity_data_list)))

    # Set initial guess for weights
    initial_weights = [1 / len(equity_data_list)] * len(equity_data_list)

    # Step 4: Solve the optimization problem
    result = minimize(negative_sharpe, initial_weights, args=(expected_returns, cov_matrix, risk_free_rate),
                      method='SLSQP', bounds=bounds, constraints=constraints)

    # Step 5: Extract the optimal weights
    optimal_weights = result.x
    for i, equity in enumerate(equity_data_list):
        equity.optimal_weight = optimal_weights[i]
    
    portfolio_return = np.sum(optimal_weights * expected_returns)

    # Step 7: Calculate the portfolio risk (standard deviation)
    portfolio_risk = np.sqrt(np.dot(optimal_weights.T, np.dot(cov_matrix, optimal_weights)))

    # Return the optimal weights, return, and risk
    
    return equity_data_list,portfolio_return,portfolio_risk

def generate_portfolio(investment_list):
    
    #equities_list = investment_list.values_list('equity', flat=True).distinct()
    equities_list = investment_list.values('equity__id','equity__symbol').distinct()
    equities_array = list(equities_list)
    equity_dtos = []

    for equity in equities_list:
    # Assuming you have a function or method to calculate the amount_invested for each equity symbol
        filtered_investment = investment_list.filter(equity=equity['equity__id'])  # Replace with your actual logic
        total_shares = sum(obj.shares for obj in filtered_investment)
        filtered_investment_list = filtered_investment.annotate(total_amount=ExpressionWrapper(F('shares') * F('purchase_price'), output_field=fields.DecimalField()))
    # Create an EquityDTO instance
        total_amount_invested = filtered_investment_list.aggregate(sum_total_amount=Sum('total_amount'))['sum_total_amount']
        equity_dto = EquityDTO(equity_symbol=equity['equity__symbol'], amount_invested=total_amount_invested,shares=total_shares)
        
    # Append the EquityDTO instance to the list
        equity_dtos.append(equity_dto)
    
    portfolio=PortfolioDTO(equity_data_list=equity_dtos)
    return populate_portfolio_metrics(portfolio=portfolio)

def calculate_future_value_sip(monthly_contribution, cagr, duration_months):
    
    annual_rate = cagr  
    monthly_rate = annual_rate / 12  # Convert annual rate to monthly rate

    future_value = monthly_contribution * (((1 + monthly_rate)**duration_months - 1) / monthly_rate)
    return round(future_value, 2)

def calculate_monthly_contribution(future_value, cagr, duration_months):
    annual_rate = cagr  
    monthly_rate = annual_rate / 12  # Convert annual rate to monthly rate
    denominator = (1 + monthly_rate) ** duration_months
    denominator=denominator-1
    denominator=denominator/monthly_rate
    denominator=denominator*(1+monthly_rate)
    # Calculate the monthly contribution
    monthly_contribution = (future_value) / denominator
    return round(monthly_contribution, 2)

def calculate_duration(future_value, monthly_contribution, cagr):
    annual_rate = cagr 
    monthly_rate = annual_rate / 12  # Convert annual rate to monthly rate

    # Calculate the duration
    duration_months = math.log(1 + (future_value * monthly_rate) / monthly_contribution) / math.log(1 + monthly_rate)
    return math.ceil(duration_months)  

def future_value(principal,time, rate=0.06):
    """
    Calculate the future value using the compound interest formula with yearly compounding.

    Args:
    - principal: the initial investment (principal amount)
    - rate: the annual interest rate (as a decimal)
    - time: the number of years

    Returns:
    The future value of the investment.
    """
    r = rate # Convert percentage to decimal
    f_v = principal * (1 + r)**time
    return f_v

def get_performance(portfolios):
    symbols= list(portfolios['current_portfolio'].keys())
    historical_data=get_historical_data(symbol_list=symbols)
    backward_filled_df = historical_data.fillna(method='bfill')
    normalized_df = backward_filled_df / backward_filled_df.iloc[0]
    multiplier_dict = portfolios['current_portfolio']


    df_current_portfolio = normalized_df * normalized_df.columns.map(multiplier_dict)
    df_current_portfolio['Total'] = df_current_portfolio.sum(axis=1)
    
    multiplier_dict = portfolios['optimised_portfolio']
    result=pd.DataFrame()
    result['current_portfolio']=df_current_portfolio.Total.copy()
   

    df_optimised_portfolio = normalized_df * normalized_df.columns.map(multiplier_dict)
    df_optimised_portfolio['Total'] = df_optimised_portfolio.sum(axis=1)
    result['optimised_portfolio']=df_optimised_portfolio.Total.copy()
    result.index = result.index.strftime('%Y-%m-%d')
    json_data_list = result.reset_index().to_dict(orient='records')
    return json_data_list

