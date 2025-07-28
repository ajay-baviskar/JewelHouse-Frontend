import React, { useEffect, useState } from 'react';
import { fetchDropdowns } from '../services/diamond';
import '../styles/diamond.css';

const DiamondFilter = ({ filters, setFilters }) => {
  const [dropdowns, setDropdowns] = useState({
    diamondShapes: [],
    diamondColors: [],
    diamondPurity: []
  });

  useEffect(() => {
    fetchDropdowns().then(res => {
      setDropdowns(res.data.data);
    });
  }, []);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filter-container">
      <select name="Shape" value={filters.Shape || ''} onChange={handleChange}>
        <option value="">Select Shape</option>
        {dropdowns.diamondShapes.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <select name="Color" value={filters.Color || ''} onChange={handleChange}>
        <option value="">Select Color</option>
        {dropdowns.diamondColors.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      <select name="Purity" value={filters.Purity || ''} onChange={handleChange}>
        <option value="">Select Purity</option>
        {dropdowns.diamondPurity.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>

      <input
        type="text"
        name="Size"
        placeholder="Size"
        value={filters.Size || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default DiamondFilter;
