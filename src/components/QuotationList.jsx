import React from 'react';
// import './Quotation.css';
import '../styles/Quotation.css';


const QuotationList = ({ quotations }) => {
  return (
    <div className="quotation-container">
      {quotations.map((quotation) => (
        <div className="quotation-card" key={quotation._id}>
          <img src={quotation.image_url} alt="Quotation" className="quotation-image" />
          <div className="quotation-info">
            <h3>{quotation.clientDetails.name}</h3>
            <p><strong>City:</strong> {quotation.clientDetails.city}</p>
            <p><strong>Date:</strong> {new Date(quotation.date).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ₹{quotation.quotationSummary.total}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuotationList;
