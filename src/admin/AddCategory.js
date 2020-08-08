import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

const AddCategory = () => {
  // state
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  // func
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make Api request
  };

  // form
  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
        />
      </div>
      <button type='submit' className='btn btn-outline-primary'>
        Create Category
      </button>
    </form>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Hello ${user.name}, ready to add a new category`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
