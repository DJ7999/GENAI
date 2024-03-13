import "./CurrentPortfolio.css";
import DisplayInsights from "../DisplayAndEditStock/DisplayInsights";

const Insights = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Insights</h3>
      </div>
      
      <DisplayInsights/>
    </div>
  );
};

export default Insights;
