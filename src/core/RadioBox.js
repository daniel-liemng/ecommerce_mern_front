import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  // state
  const [value, setValue] = useState(0);

  // func
  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((p, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
