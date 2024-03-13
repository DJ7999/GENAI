const axios = require('axios');
const url="http://127.0.0.1:8000/"
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MTAzMDAxNTUsImlhdCI6MTcxMDIxMzc1NSwiaXNfYWN0aXZlIjp0cnVlLCJpc19zdGFmZiI6ZmFsc2UsImlzX3N1cGVydXNlciI6ZmFsc2V9.xRhIvzAjRESMDFvwZ3OcjhQfDkjX-pd9SPGgbNCLFBQ'
const getPortfolio = async () => {
    try {
        // const portfolioResponse = await axios.get(`${url}portfolio/get_portfolio`, {
        //   headers: {
        //     Authorization: `Bearer Token ${token}`,
        //   },
        // });
        // console.log(JSON.stringify(portfolioResponse.data))
        let mockedresponse={"equities":[{"equity_symbol":"IDFCFIRSTB.NS","amount_invested":"8909.30","cagr":0.03450251915332858,"risk":0.4267670043684864,"optimal_weight":null,"new_price":80.5,"shares":106},{"equity_symbol":"ITBEES.NS","amount_invested":"1180.60","cagr":0.24296397841396034,"risk":0.2006186885561705,"optimal_weight":null,"new_price":39.220001220703125,"shares":36},{"equity_symbol":"GOLDBEES.NS","amount_invested":"7656.81","cagr":0.07296526880889465,"risk":0.13016874069961157,"optimal_weight":null,"new_price":56.0099983215332,"shares":152},{"equity_symbol":"SAIL.NS","amount_invested":"461.60","cagr":0.07191598741763361,"risk":0.4847000733619372,"optimal_weight":null,"new_price":134.3000030517578,"shares":4},{"equity_symbol":"NIFTYBEES.NS","amount_invested":"2377.23","cagr":0.14034455636735355,"risk":0.16368917418080034,"optimal_weight":null,"new_price":247.4499969482422,"shares":12},{"equity_symbol":"HDFCBANK.NS","amount_invested":"3023.10","cagr":0.14884202978846228,"risk":0.21648382547930245,"optimal_weight":null,"new_price":1427.800048828125,"shares":2},{"equity_symbol":"RELIANCE.NS","amount_invested":"11342.85","cagr":0.21425815159936556,"risk":0.26505632510704813,"optimal_weight":null,"new_price":2933.199951171875,"shares":5},{"equity_symbol":"ASIANPAINT.NS","amount_invested":"5920.64","cagr":0.19174835029073112,"risk":0.23604144475678082,"optimal_weight":null,"new_price":2876.85009765625,"shares":2},{"equity_symbol":"YESBANK.NS","amount_invested":"34.24","cagr":-0.1242488410398429,"risk":0.5852350507170245,"optimal_weight":null,"new_price":23.649999618530273,"shares":2},{"equity_symbol":"KOTAKBANK.NS","amount_invested":"5172.21","cagr":0.15872957848582825,"risk":0.2313346367562245,"optimal_weight":null,"new_price":1729.6500244140625,"shares":3}],"has_metrics":true,"is_optimised":false,"current_return":0.1378516715752245,"current_risk":0.11597925327104427,"optimised_return":null,"optimised_risk":null,"total_portfolio_value":"46078.58"}
        return mockedresponse
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getOptimisedPortfolio = async () => {
    try {
        // let currportfolio=await getPortfolio();
        
        // const optimisedPortfolio = await axios.post(`${url}portfolio/get_optimised_portfolio/`, 
        // currportfolio,
        //  {
        //   headers: {
        //     Authorization: `Bearer Token ${token}`,
        //     // Add any additional headers here
        //   },
        // });
        // console.log(optimisedPortfolio.data)
        let mockedresponse={"equities":[{"equity_symbol":"IDFCFIRSTB.NS","amount_invested":"8909.30","cagr":0.03450251915332858,"risk":0.4267670043684864,"optimal_weight":null,"new_price":80.5,"shares":106},{"equity_symbol":"ITBEES.NS","amount_invested":"1180.60","cagr":0.24296397841396034,"risk":0.2006186885561705,"optimal_weight":null,"new_price":39.220001220703125,"shares":36},{"equity_symbol":"GOLDBEES.NS","amount_invested":"7656.81","cagr":0.07296526880889465,"risk":0.13016874069961157,"optimal_weight":null,"new_price":56.0099983215332,"shares":152},{"equity_symbol":"SAIL.NS","amount_invested":"461.60","cagr":0.07191598741763361,"risk":0.4847000733619372,"optimal_weight":null,"new_price":134.3000030517578,"shares":4},{"equity_symbol":"NIFTYBEES.NS","amount_invested":"2377.23","cagr":0.14034455636735355,"risk":0.16368917418080034,"optimal_weight":null,"new_price":247.4499969482422,"shares":12},{"equity_symbol":"HDFCBANK.NS","amount_invested":"3023.10","cagr":0.14884202978846228,"risk":0.21648382547930245,"optimal_weight":null,"new_price":1427.800048828125,"shares":2},{"equity_symbol":"RELIANCE.NS","amount_invested":"11342.85","cagr":0.21425815159936556,"risk":0.26505632510704813,"optimal_weight":null,"new_price":2933.199951171875,"shares":5},{"equity_symbol":"ASIANPAINT.NS","amount_invested":"5920.64","cagr":0.19174835029073112,"risk":0.23604144475678082,"optimal_weight":null,"new_price":2876.85009765625,"shares":2},{"equity_symbol":"YESBANK.NS","amount_invested":"34.24","cagr":-0.1242488410398429,"risk":0.5852350507170245,"optimal_weight":null,"new_price":23.649999618530273,"shares":2},{"equity_symbol":"KOTAKBANK.NS","amount_invested":"5172.21","cagr":0.15872957848582825,"risk":0.2313346367562245,"optimal_weight":null,"new_price":1729.6500244140625,"shares":3}],"has_metrics":true,"is_optimised":false,"current_return":0.1378516715752245,"current_risk":0.11597925327104427,"optimised_return":null,"optimised_risk":null,"total_portfolio_value":"46078.58"}
        return mockedresponse
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getInvestmentHistory = async () => {
    try {
        let investment_history = await axios.get(`${url}portfolio/investment/`, {
            headers: {
              Authorization: `Bearer Token ${token}`,
            },
          });
          console.log(investment_history);
          return investment_history
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}
const getSupportedEquities = async () => {
    try {
        let equity_list = await axios.get(`${url}portfolio/equities`, {
            headers: {
              Authorization: `Bearer Token ${token}`,
            },
          });
          console.log(equity_list);
          return equity_list
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}
const delete_Investment = async (targetIndex) => {
    try {
      await axios.delete(`${url}portfolio/investment/`, {
        headers: {
          Authorization: `Bearer Token ${token}`,
          id: targetIndex.id,
        },
      });
      let history=await getInvestmentHistory();
      console.log(history);
      return history;
    } catch (error) {
        console.error("Error deleting investment:", error.message);
      }
    };
const addInvestment = async (investment) => {
  try {
    // {
    //     equity: 0,
    //     purchase_price: "",
    //     shares: "",
    //     investment_date:"",
    //   }
    const response = await axios.post(
      `${url}portfolio/investment/`,
      newRow,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }
    );
    handleReload();
  } catch (error) {
    console.error('Error making post request:', error.message);
  }
};
module.exports = { getPortfolio
     ,getOptimisedPortfolio,
     getInvestmentHistory,
     getSupportedEquities,
     delete_Investment}