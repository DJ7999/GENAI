import "./CurrentPortfolio.css";
import DisplayAndEditEquities from "../DisplayAndEditStock/DisplayAndEditEquities";

const EquityManagement = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Equity Management</h3>
      </div>
      <DisplayAndEditEquities 
      />
    </div>
  );
};

export default EquityManagement;
