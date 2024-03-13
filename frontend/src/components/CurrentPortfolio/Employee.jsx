import "./CurrentPortfolio.css";
import DisplayAum from "../DisplayAndEditStock/DisplayAum";

const Employee = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Assets Under Management</h3>
      </div>
      <DisplayAum/>
    </div>
  );
};

export default Employee;
