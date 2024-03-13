import "./CurrentPortfolio.css";
import DisplayPortfolio from "../DisplayAndEditStock/DisplayPortfolio";

const Portfolio = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">My Portfolio</h3>
      </div>
      <DisplayPortfolio/>
    </div>
  );
};

export default Portfolio;
