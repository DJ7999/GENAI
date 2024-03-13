import "./CurrentPortfolio.css";
import DisplayAndEditInvestment from "../DisplayAndEditStock/DisplayAndEditInvestment";

const InvestmentHistory = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Investment History</h3>
      </div>
      <DisplayAndEditInvestment 
      />
    </div>
  );
};

export default InvestmentHistory;
