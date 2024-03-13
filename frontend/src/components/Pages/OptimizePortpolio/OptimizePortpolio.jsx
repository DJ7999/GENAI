
import "./OptimizePortpolio.css";
import ComparePieChart from "../../Diagram/ComparePieChart";
import Piechart from "../../Diagram/PieChart";
import { useState } from "react";
const OptimizePortpolio = () => {
  const [rows, setRows] = useState([
    {
      stock: "Tata",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "Tata",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "TCS",
      avg_price: 30,
      qty: 10,
      current_price: 25,
    },
  ]);
  const [updaterows, setUpdaterows] = useState([
    {
      stock: "Tata!",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "Tata!",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "TCS!",
      avg_price: 30,
      qty: 10,
      current_price: 25,
    },
  ]);
  return (
    <div className="main-content-holder">
      
      
      <div className="content-grid-one ">
        <ComparePieChart header={"Data"} />
      </div>
    </div>
  );
};

export default OptimizePortpolio;
