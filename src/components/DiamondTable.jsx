// src/components/DiamondTable.jsx
import React from 'react';
import '../styles/diamond.css';

const DiamondTable = ({ diamonds }) => {
  return (
    <div className="table-wrapper">
      <table className="diamond-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Shape</th>
            <th>Purity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {diamonds.length ? diamonds.map((diamond) => (
            <tr key={diamond._id}>
              <td>{diamond.Size}</td>
              <td>{diamond.Color}</td>
              <td>{diamond.Shape}</td>
              <td>{diamond.Purity}</td>
              <td>₹ {diamond.Price}</td>
            </tr>
          )) : (
            <tr><td colSpan="5">No Diamonds Found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiamondTable;
