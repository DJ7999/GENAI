import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { EquityTable } from "../StockTable/EquityTable";
import { AddEquity } from "../AddStock/AddEquity";
import axios from "axios";
import { url } from "../../utils/url";
import { useReload } from "../../context/ReloadContext";

function DisplayAndEditEquities() {
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
        
        let equity_list = await axios.get(`${url}portfolio/equities`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        
        equity_list=equity_list.data
        setStockList(equity_list)
        
        setRows(equity_list)
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag]); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleDeleteRow = async (targetIndex) => {
    try {
        const response = await axios.delete(`${url}portfolio/equities/`, {
          params: {
            symbol: targetIndex.symbol,
          },
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        handleReload()
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
  };

  const handleSubmit = async (newRow) => {
  try {
    const response = await axios.post(
      `${url}portfolio/equities/`,
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
        <h3 className="grid-c-title-text">Add New Equity</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setEditModalOpen(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <EquityTable
        rows={rows}
        deleteRow={handleDeleteRow}
      />
      {editModalOpen && (
        <AddEquity
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

export default DisplayAndEditEquities;
