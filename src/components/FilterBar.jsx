import React from "react";
import "./DiamondTable.css";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filter-bar">
      <select name="Size" value={filters.Size} onChange={handleChange}>
        <option value="">All Sizes</option>
        <option value="0.90-0.99">0.90-0.99</option>
        <option value="1.00-1.09">1.00-1.09</option>
      </select>

      <select name="Color" value={filters.Color} onChange={handleChange}>
        <option value="">All Colors</option>
        <option value="D-E">D-E</option>
        <option value="E-F">E-F</option>
      </select>

      <select name="Shape" value={filters.Shape} onChange={handleChange}>
        <option value="">All Shapes</option>
        <option value="Round">Round</option>
        <option value="Baguette">Baguette</option>
        <option value="Oval">Oval</option>
      </select>
    </div>
  );
};

export default FilterBar;
