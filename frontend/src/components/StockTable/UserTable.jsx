import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const UserTable = ({ rows, deleteRow, editRow }) => {
  const rows_sorted = rows
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows_sorted.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="expand">{row.first_name} {row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.is_superuser?"Yes":"No"}</td>
                <td className="fit">
                  <span className="actions">
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
