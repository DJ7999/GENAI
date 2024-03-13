import Piechart from "./PieChart";
import "../Diagram/PieChart.css";
function ComparePieChart({ header ,portfolio,optimized_portfolio}) {
  return (
    <div>
      <h1 className="table-header">{header}</h1>
      <div className="compare-pie-container">
        {portfolio.equities?<Piechart title={"Portpolio"} portfolio={portfolio}/>:<></>}
        {optimized_portfolio?<Piechart title={"Optimize Portpolio"} optimized_portfolio={optimized_portfolio}/>:<></>}
      </div>
    </div>
  );
}
export default ComparePieChart;
