import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";

import { AddGoal } from "../AddStock/AddGoal";

import axios from "axios";
import { url } from "../../utils/url";
import { useReload } from "../../context/ReloadContext";
import { GoalTable } from "../StockTable/GoalTable";
import { EditGoal } from "../EditStock/EditGoal";
function DisplayGoal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  
  const [goals, setGoals]=useState([])
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [defaultEdit, setDefaultEdit] = useState({});
  const { handleReload } = useReload();
  const { reloadFlag,setMyyGoals } = useReload();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let goals = await axios.get(`${url}wealthwish/goals`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });


        goals=goals.data
        
        setGoals(goals)
        setMyyGoals(goals)
        
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag,refreshSignal]); 

  const handleDeleteRow = async (targetIndex) => {
    try {
      
      await axios.delete(`${url}wealthwish/goals/`, {
        headers: {
          Authorization: `Bearer Token ${token}`,
          name: targetIndex.name,
        },
      });
      
      setRefreshSignal(x=>!x)
      setRows(rows.filter((row) => row.id !== targetIndex.id));
    } catch (error) {
      console.error("Error deleting investment:", error.message);
    }
  };

  const handleEditRow = async (targetIndex) => {
    setDefaultEdit(targetIndex)
    setModalOpen(true)
  };
 const ActivateGoal=async (newRow) => {
    try {
        let payload={
            "name":newRow.name,
            "is_active":newRow.is_active,
          }
       
    const response = await axios.put(
      `${url}wealthwish/activate_goals/`,
      payload,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }
    );
    setRefreshSignal(x=>!x)
  } catch (error) {
    console.error('Error making post request:', error.message);
  }
 }
  const handleSubmit = async (newRow) => {
  try {
    const response = await axios.post(
      `${url}wealthwish/goals/`,
      newRow,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', 
        },
      }
    );
    setRefreshSignal(x=>!x)
  } catch (error) {
    console.error('Error making post request:', error.message);
  }
};
  
  return (
    <div>
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Add New goal</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setEditModalOpen(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <GoalTable
        rows={goals}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
      />
      {modalOpen && (
        <EditGoal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onToggle={ActivateGoal}
          defaultValue={defaultEdit}
        />
      )}
      {editModalOpen && (
        <AddGoal
          goalList={goals}
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

export default DisplayGoal;
