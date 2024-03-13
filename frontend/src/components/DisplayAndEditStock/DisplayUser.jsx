import { useState,useEffect } from "react";

import { url } from "../../utils/url";
import { UserTable } from "../StockTable/UserTable";
import axios from "axios";
import { useReload } from "../../context/ReloadContext";
import { EditUser } from "../EditStock/EditUser";

function DisplayUser() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [users, setUsers]=useState([])
  const [searchedUsers, setSearchedUsers]=useState([])
  const [optimizedPortfolio, setOptimizedPortfolio]=useState()
  const { reloadFlag,setCurrentCagr,currentCagr,optimisedCagr ,setOptimisedCagr} = useReload();
  const [refreshCurrent, setrefreshCurrent] = useState(false)
  const [defaultEdit, setDefaultEdit] = useState({})
  

  const filterUsers = (text, userList) => {
    return userList.filter(user =>
      user.first_name.toLowerCase().includes(text.toLowerCase()) ||
      user.last_name.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
    );
  };


  const handleSearch = (text) => {
    setSearchedUsers(filterUsers(text,users))
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Make the first request
        const portfolioResponse = await axios.get(`${url}user/`, {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        // Step 2: Extract data from the first response
        const secondResponse = portfolioResponse.data; 
          // Step 5: Store in portfolio (assuming you want to store it in state)
          setUsers(secondResponse);
          setSearchedUsers(secondResponse)
          
          
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag,refreshCurrent]); // Empty dependency array ensures this effect runs only once when the component mounts
  

  const handleEditRow = async (targetIndex) => {
    setDefaultEdit(targetIndex)
    setModalOpen(true)
  };

  const UpdateRole = async (targetIndex) => {
    try {
      // Step 1: Make the first request
      const portfolioResponse = await axios.post(
          `${url}user/update_user_role/`,
          
              targetIndex
          ,
          {
              headers: {
                  Authorization: `Bearer Token ${token}`,
              },
          }
      );

      
  } catch (error) {
      console.error("Error fetching data:", error.message);
  }

  setrefreshCurrent(x=>!x)
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Employees</h2>
      </div>
      <UserTable rows={searchedUsers.filter(user =>user.is_superuser || user.is_staff)}
      editRow={handleEditRow}/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Customers</h2>
      </div>
      <UserTable rows={searchedUsers.filter(user =>!(user.is_superuser || user.is_staff))}
      editRow={handleEditRow}/>
      {modalOpen && (
        <EditUser
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onToggle={UpdateRole}
          defaultValue={defaultEdit}
        />
      )}
    </div>
    
  );
}

export default DisplayUser;
