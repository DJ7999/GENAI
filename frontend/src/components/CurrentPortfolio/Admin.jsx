import "./CurrentPortfolio.css";

import DisplayUser from "../DisplayAndEditStock/DisplayUser";


const Admin = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Admin Dashboard</h3>
      </div>
      <DisplayUser/>
    </div>
  );
};

export default Admin;