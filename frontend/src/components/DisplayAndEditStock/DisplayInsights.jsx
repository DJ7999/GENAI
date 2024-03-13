import { useState,useEffect } from "react";
import { useReload, } from "../../context/ReloadContext";
import calculateMonthlySIP from "../../helpers/sip";
const  DisplayInsights=()=> {
    const { reloadFlag, myFire, myGoals, myPortfolio } = useReload();
    const [totalSip, setTotalSip] = useState(0);
  
    const totalSIP = () => {
      let fireSIP = totalFire();
      let goalSIP = totalActiveGoalSIP();
  
      return (parseFloat(goalSIP) ? parseFloat(goalSIP) : 0) + (parseFloat(fireSIP) ? parseFloat(fireSIP) : 0);
    };
  
    const totalFire = () => {
      return calculateMonthlySIP(myFire.FIRE_amount, myPortfolio.current_return, myFire.duration);
    };
  
    const totalActiveGoalSIP = () => {
      return myGoals
        .filter((x) => x.is_active)
        .reduce((accumulator, currentValue) => {
          const contribution = parseFloat(currentValue.monthly_contribution);
          return isNaN(contribution) ? accumulator : accumulator + contribution;
        }, 0);
    };
  
    useEffect(() => {
      setTotalSip(totalSIP());
    }, [reloadFlag, myFire, myGoals, myPortfolio]); // Dependency array updated to include relevant dependencies
  

  
  return (
    <div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">My Total Investment</h2>
        <span className="lg-value">{myPortfolio.total_portfolio_value} $</span>
      </div>
      <br/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">My Current CAGR</h2>
        <span className="lg-value">{myPortfolio.current_return?(myPortfolio.current_return*100).toFixed(2):undefined}%</span> 
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">My Portfolio Risk</h2>
        <span className="lg-value">{myPortfolio.current_risk?(myPortfolio.current_risk*100).toFixed(2):undefined}%</span> 
      </div>
      <br/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">CAGR For Optimized Portfolio</h2>
        <span className="lg-value">{myPortfolio.optimised_return?(myPortfolio.optimised_return*100).toFixed(2):undefined}%</span> 
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Risk For Optimized Portfolio</h2>
        <span className="lg-value">{myPortfolio.optimised_risk?(myPortfolio.optimised_risk*100).toFixed(2):undefined}%</span> 
      </div>
      <br/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Total SIP</h2>
        <span className="lg-value">{totalSip.toFixed(2)}$</span> 
      </div>
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Goals monthly contribution</h3>
        <h3 className="grid-c-title-text">{totalActiveGoalSIP().toFixed(2)}$</h3>
      </div>
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Retirement monthly contribution</h3>
        <h3 className="grid-c-title-text">{totalFire()}$</h3>
      </div>
      </div>
)
  }

export default DisplayInsights;
