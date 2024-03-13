import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const PortfolioTable = ({ rows }) => {
   
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Stock Name</th>
            <th>Invested Amount</th>
            <th>CAGR</th>
            <th>Risk</th>
            <th>Qty</th>
            <th>Avg. Buy Price</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="expand">{row.equity_symbol}</td>
                <td>$ {row.amount_invested}</td>
                <td>{(row.cagr*100).toFixed(2)}%</td>
                <td>{(row.risk*100).toFixed(2)}%</td>
                <td> {row.shares}</td>
                <td>$ {(row.amount_invested/row.shares).toFixed(2)}</td>
                <td>$ {(row.new_price).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
