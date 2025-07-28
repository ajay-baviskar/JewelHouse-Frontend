// src/components/DiamondTable.jsx
import React from "react";

const DiamondTable = ({ diamonds, onEdit }) => {
  return (
    <table className="diamond-table">
      <thead>
        <tr>
          <th>Size</th>
          <th>Color</th>
          <th>Shape</th>
          <th>Purity</th>
          <th>Discount</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {diamonds.map((diamond) => (
          <tr key={diamond._id}>
            <td>{diamond.Size}</td>
            <td>{diamond.Color}</td>
            <td>{diamond.Shape}</td>
            <td>{diamond.Purity}</td>
            <td>{diamond.Discount}</td>
            <td>{diamond.Price}</td>
            <td>
              <button className="btn-update" onClick={() => onEdit(diamond)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiamondTable;
