import { useState,useEffect } from "react";
import { PortfolioTable } from "../StockTable/PortfolioTable";
import axios from "axios";
import { useReload } from "../../context/ReloadContext";
import ComparePieChart from "../Diagram/ComparePieChart";
import PortfolioLine from "../Diagram/PortfolioLine";
import { url } from "../../utils/url";
function DisplayPortfolio() {
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [portfolio, setPortfolio]=useState({})
  const { reloadFlag,setCurrentCagr,setOptimisedCagr,setMyPortfolio} = useReload();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Make the first request
        const portfolioResponse = await axios.get(`${url}portfolio/get_portfolio/`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        // Step 2: Extract data from the first response
        const dataToSend = portfolioResponse.data; 
       
        // Step 3: Make the second request with data from the first response
        const secondResponse = await axios.post(`${url}portfolio/get_optimised_portfolio/`, 
          dataToSend,
         {
          headers: {
            Authorization: `Bearer Token ${token}`,
            // Add any additional headers here
          },
        });
          // Step 5: Store in portfolio (assuming you want to store it in state)
          setPortfolio(secondResponse.data);
          setMyPortfolio(secondResponse.data)
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
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Unrealized Portfolio Value</h2>
        <span className="lg-value">$ {rows.reduce((sum, obj) => sum + (obj.shares*obj.new_price), 0).toFixed(2)}</span>
      </div>
      <PortfolioTable rows={rows}/>
      <ComparePieChart  
      portfolio={portfolio}
       optimized_portfolio={portfolio.is_optimised?portfolio:undefined}
       />
       {portfolio.total_portfolio_value?<PortfolioLine portfolio={portfolio}/>:<></>}
    </div>
  );
}

export default DisplayPortfolio;
