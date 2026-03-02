import React from "react";

const GoldTable = ({ goldRates, onEdit, onDelete }) => {
  return (
    <div className="table-wrapper">
      <table className="gold-table">
        <thead>
          <tr>
            <th>9K Rate</th>
            <th>24K Rate</th>
            <th>22K Rate</th>
            <th>18K Rate</th>
            <th>14K Rate</th>
             <th>999 Platinum Rate</th>
             <th>925 Silver Rate</th>

            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goldRates.length > 0 ? (
            goldRates.map((gold) => (
              <tr key={gold._id}>
                <td>{gold.rate9k}</td>
                <td>{gold.rate24k}</td>
                <td>{gold.rate22k}</td>
                <td>{gold.rate18k}</td>
                <td>{gold.rate14k}</td>
                <td>{gold.rate999Platinum}</td>
                <td>{gold.rate925Silver}</td>

                <td>{new Date(gold.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-update"
                    onClick={() => onEdit(gold)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="btn-cancel"
                    onClick={() => onDelete(gold._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No gold rates found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GoldTable;
