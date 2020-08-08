import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../core/Layout";

import { signup } from "../auth";

const Signup = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  // function
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.errors) {
          console.log(data.errors);
          setValues({ ...values, error: data.errors, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const showError = () => {
    {
      error &&
        error.map((item, index) => {
          console.log(item.msg);
          return (
            <div
              key={index}
              className='alert alert-danger'
              style={{ display: error ? "" : "none" }}
            >
              {item.msg}
            </div>
          );
        });
    }
  };

  const showSuccess = () => {
    return (
      <div
        className='alert alert-info'
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please <Link to='/signin'>sign in</Link>
      </div>
    );
  };
  // form
  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type='text'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type='password'
          className='form-control'
        />
      </div>

      <button type='submit' className='btn btn-primary'>
        Sign Up
      </button>
    </form>
  );

  return (
    <Layout
      title='Sign Up'
      description='Sign Up to MERN Ecommerce App'
      className='container col-md-8 offset-md-2'
    >
      {showError()}
      {showSuccess()}
      {signupForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
