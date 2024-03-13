import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const EquityTable = ({ rows, deleteRow, editRow }) => {
  let rows_sorted=rows
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Stock Name</th>
            <th>symbol</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows_sorted.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="expand">{row.title}</td>
                <td>{row.symbol}</td>
                
                
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
