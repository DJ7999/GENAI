import { useState,useEffect } from "react";
import { PortfolioTable } from "../StockTable/PortfolioTable";
import axios from "axios";
import { useReload } from "../../context/ReloadContext";
import ComparePieChart from "../Diagram/ComparePieChart";
import { url } from "../../utils/url";

function DisplayAum() {
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [portfolio, setPortfolio]=useState({})
  const { reloadFlag,setCurrentCagr,setOptimisedCagr} = useReload();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioResponse = await axios.get(`${url}portfolio/get_AUM/`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        const secondResponse = portfolioResponse
    
          setPortfolio(secondResponse.data);
          setRows(secondResponse.data.equities);
          setCurrentCagr(secondResponse.data.current_return)
          setOptimisedCagr(secondResponse.data.optimised_return)
        

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag]); // Empty dependency array ensures this effect runs only once when the component mounts
  
  return (
    <div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Total Investment</h2>
        <span className="lg-value">$ {portfolio.total_portfolio_value}</span>
      </div>
      <PortfolioTable rows={rows}/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Investment Distribution</h2>
        
      </div>
      <ComparePieChart  
      portfolio={portfolio}
       />
    </div>
  );
}

export default DisplayAum;
