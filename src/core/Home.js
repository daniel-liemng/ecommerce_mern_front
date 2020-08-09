import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {
  // state
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);
  const [error, setError] = useState(false);

  // func
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  // useEffect
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home Page'
      description='MERN Ecommerce App'
      className='container-fluid'
    >
      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
        {productsBySell.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>

      <h2 className='mb-4'>New Arrival</h2>
      <div className='row'>
        {productsByArrival.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
