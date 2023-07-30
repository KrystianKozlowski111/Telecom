import React from 'react';

const YearSelector = ({ selectedYear, years, onYearChange }) => (
  <label>
    Wybierz rok:
    <select value={selectedYear} onChange={onYearChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </label>
);

export default YearSelector;
