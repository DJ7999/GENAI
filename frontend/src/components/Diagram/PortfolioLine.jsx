import LineChart from "./LineCharts";
import "../Diagram/PieChart.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { url } from "../../utils/url";

function PortfolioLine({ header ,portfolio}) {
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      let request_body={
        "current_portfolio":    {},
        "optimised_portfolio":  {}
        }
      let total_investment=portfolio.total_portfolio_value
      let normal={};
      let optimised={};
      portfolio.equities.map(x=>{
        normal[x.equity_symbol]=x.amount_invested/total_investment
        optimised[x.equity_symbol]=x.optimal_weight
      })
      request_body.current_portfolio=normal
      request_body.optimised_portfolio=optimised
      const Response = await axios.post(`${url}portfolio/get_performance/`, 
          request_body,
         {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        
        setUserData({
          labels: Response.data.map((data) => data.Date),
          datasets: [
            {
              label: "Current Portfolio",
              data: Response.data.map((data) => data['current_portfolio']*100000),
              backgroundColor: [
                "rgba(75,192,192,1)",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
            {
              label: "Optimised Portfolio",
              data: Response.data.map((data) => data['optimised_portfolio']*100000),
              backgroundColor: [
                "#ecf0f1",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        })
    }

    fetchData();
  }, [portfolio]);
  
  const [userData, setUserData] = useState();
  return (
    <div>
      <h1 className="table-header">Portfolio Performance</h1>
      <div className="compare-pie-container">
      {userData?<LineChart chartData={userData} />:<></>} 
      </div>
    </div>
  );
}
export default PortfolioLine;