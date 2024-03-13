import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const GoalTable = ({ rows, deleteRow, editRow }) => {
  const rows_sorted = rows
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Goal Name</th>
            <th>Goal Amount</th>
            <th>SIP</th>
            <th>Duration</th>
            <th>Active</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows_sorted.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="expand">{row.name}</td>
                <td>{row.goal_amount}</td>
                <td>{row.monthly_contribution}</td>
                <td>{row.duration_in_months}</td>
                <td>{row.is_active?"Yes":"No"}</td>
                <td>{row.is_active?row.active_date:'-'}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row)}
                    />
                    <BsFillPencilFill
                    onClick={() => editRow(row)}
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
