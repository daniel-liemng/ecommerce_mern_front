import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // Load categories and set FormData
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    // setValues({ ...values, formData: new FormData() });
    init();
  }, []);

  // func
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    // API
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  // form
  const newPostForm = () => (
    <form onSubmit={handleSubmit} className='mb-3'>
      <h4>Post Photo</h4>

      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange("photo")}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          value={name}
          onChange={handleChange("name")}
          type='text'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          type='text'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          value={price}
          onChange={handleChange("price")}
          type='number'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange("category")} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange("shipping")} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          value={quantity}
          onChange={handleChange("quantity")}
          type='number'
          className='form-control'
        />
      </div>

      <button type='submit' className='btn btn-outline-primary'>
        Create Product
      </button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct} is created!`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title='Add a new product'
      description={`Hello ${user.name}, ready to add a new product`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
