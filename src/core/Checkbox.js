import React, { useState, useEffect } from "react";

const Checkbox = ({ categories }) => {
  // state
  const [checked, setChecked] = useState([]);

  const handleToggle = (cId) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(cId);
    const newCheckedCategoryId = [...checked];

    // if currently checked was not already in checked state -> push
    // else pull, take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(cId);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };

  return categories.map((c, index) => (
    <li className='list-unstyled' key={index}>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

export default Checkbox;
