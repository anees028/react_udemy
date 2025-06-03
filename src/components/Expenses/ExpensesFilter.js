import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  // Get current year
  const currentYear = new Date().getFullYear();
  // Generate array of years from 2024 to current year + 5
  const years = Array.from(
    { length: (currentYear + 5) - 2024 + 1 },
    (_, index) => 2024 + index
  );

  const handleYearChange = (event) => {
    props.onSelectYear(event.target.value);
  }

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select onChange={handleYearChange} value={props.selected}>
          {years.map(year => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;