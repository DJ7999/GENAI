import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "../Diagram/PieChart.css";
function Piechart({ title ,portfolio,optimized_portfolio}) {
  const [stdudentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    const sSubject = [];
    const sMarks = [];
    const get_portfolio_data = async () => {
      const equityList = portfolio.equities?portfolio.equities:[];
      for (let i = 0; i < equityList.length; i++) {
        sSubject.push(equityList[i].equity_symbol);
        sMarks.push(parseFloat(equityList[i].amount_invested));
      }
      setStudentsubject(sSubject);
      setStudentMarks(sMarks);
    };

    const get_optimized_portfolio_data = async () => {
      const equityList = optimized_portfolio.equities?optimized_portfolio.equities:[];
      for (let i = 0; i < equityList.length; i++) {
        sSubject.push(equityList[i].equity_symbol);
        sMarks.push(parseFloat(equityList[i].optimal_weight));
      }
      setStudentsubject(sSubject);
      
      setStudentMarks(sMarks);
    };

    portfolio?get_portfolio_data():get_optimized_portfolio_data();
  }, [portfolio,optimized_portfolio]);
  

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <Chart
          type="pie"
          width={400}
          height={550}
          series={studentMarks}
          options={{
            title: { text: title },
            noData: { text: "Empty Data" },
            labels: stdudentSubject,
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
