import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const InvestmentTable = ({ rows, deleteRow, editRow }) => {
  const rows_sorted = rows.sort((a, b) => b.investment_date.localeCompare(a.investment_date));
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Stock Name</th>
            <th>Date</th>
            <th>Avg. Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows_sorted.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="expand">{row.equity.title?row.equity.title:""}</td>
                <td>{row.investment_date}</td>
                <td>{row.purchase_price}</td>
                <td>{row.shares}</td>
                
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
