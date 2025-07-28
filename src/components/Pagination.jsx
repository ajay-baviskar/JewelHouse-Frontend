// src/components/Pagination.jsx
import React from 'react';
import '../styles/diamond.css';

const Pagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  const maxVisiblePages = 10;

  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const visiblePages = [];
  for (let p = startPage; p <= endPage; p++) {
    visiblePages.push(p);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="nav-button"
      >
        Previous
      </button>

      {visiblePages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`page-button ${p === page ? 'active' : ''}`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="nav-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
