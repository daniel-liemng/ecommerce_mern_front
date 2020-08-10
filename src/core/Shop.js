import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";

const Shop = () => {
  // state
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  // Load categories
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title='Shop Now'
      description='Shop and find books of your choice'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>
          <h4>Filter By Categories</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div className='col-8'>Right</div>
      </div>
    </Layout>
  );
};

export default Shop;
