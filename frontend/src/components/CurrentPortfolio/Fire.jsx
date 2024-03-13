import "./CurrentPortfolio.css";
import DisplayFire from "../DisplayAndEditStock/DisplayFire";

const Fire = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">My Retirement Plan</h3>
      </div>
      <DisplayFire/>
    </div>
  );
};

export default Fire;
