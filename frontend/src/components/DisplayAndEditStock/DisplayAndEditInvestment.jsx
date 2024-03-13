import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { InvestmentTable } from "../StockTable/InvestmentTable";
import {AddInvestment} from "../AddStock/AddInvestment";
import axios from "axios";
import { useReload } from "../../context/ReloadContext";
import { url } from "../../utils/url";

function DisplayAndEditInvestment() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [stockList, setStockList]=useState([])
  const { handleReload } = useReload();
  const { reloadFlag } = useReload();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let investment_history = await axios.get(`${url}portfolio/investment/`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        let equity_list = await axios.get(`${url}portfolio/equities`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        investment_history=investment_history.data
        equity_list=equity_list.data
        setStockList(equity_list)
        investment_history=investment_history.map(investment=>{
          investment.equity=equity_list.filter(equity=>equity.id===investment.equity)[0]
          return investment
        })
        setRows(investment_history)
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag]); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleDeleteRow = async (targetIndex) => {
    try {
      await axios.delete(`${url}portfolio/investment/`, {
        headers: {
          Authorization: `Bearer Token ${token}`,
          id: targetIndex.id,
        },
      });
      
      handleReload()
      setRows(rows.filter((row) => row.id !== targetIndex.id));
    } catch (error) {
      console.error("Error deleting investment:", error.message);
    }
  };

  const handleSubmit = async (newRow) => {
  try {
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
  
  return (
    <div>
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Add New Investment</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setEditModalOpen(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <InvestmentTable
        rows={rows}
        deleteRow={handleDeleteRow}
      />
      
      {editModalOpen && (
        <AddInvestment
          stockList={stockList}
          closeModal={() => {
            setEditModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
       )} 
    </div>
  );
}

export default DisplayAndEditInvestment;
