import React from "react";
import "./infoTable.css";

const InfoTable = ({ title, columns, columnsNames = columns, rows }) => {
  return (
    <div className="infoTable">
      <span className="inputLabel">{title}</span>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              {columnsNames.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {columns.map((column, idx) => (
                  <td key={idx}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoTable;
