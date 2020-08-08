import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Layout from "../core/Layout";

import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  // state
  const [values, setValues] = useState({
    email: "user2@email.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, error, loading, redirectToReferer } = values;
  const { user } = isAuthenticated();

  // function
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.errors || data.err) {
          console.log(data.errors);
          console.log(data.err);
          setValues({
            ...values,
            error: data.errors || data.err,
            loading: false,
          });
        } else {
          // setValues({
          //   ...values,
          //   // redirect, so dont care about reset values
          //   redirectToReferer: true,
          // });

          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferer: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // const showError = () => {
  //   {
  //     error &&
  //       error.map((item, index) => {
  //         console.log(item.msg);
  //         return (
  //           <div
  //             key={index}
  //             className='alert alert-danger'
  //             style={{ display: error ? "" : "none" }}
  //           >
  //             {item.msg}
  //           </div>
  //         );
  //       });
  //   }
  // };

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }

    // if user is auth, go to admin, redirect to Home, not to Sign in again
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };
  // form
  const signupForm = () => (
    <form onSubmit={handleSubmit}>
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
      title='Sign In'
      description='Sign In to MERN Ecommerce App'
      className='container col-md-8 offset-md-2'
    >
      {/* {showError()} */}
      {showLoading()}
      {signupForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Signin;
