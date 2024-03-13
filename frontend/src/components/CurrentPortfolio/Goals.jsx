import "./CurrentPortfolio.css";
import DisplayGoal from "../DisplayAndEditStock/DisplayGoal";

const Goals = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Goals</h3>
      </div>
      
      <DisplayGoal />
    </div>
  );
};

export default Goals;
