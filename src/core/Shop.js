import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  // state
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

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

  // handleFilter by array of categoryId and price
  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    // console.log(myFilters);
    // console.log(filters);
    // console.log(filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    setMyFilters(newFilters);
  };

  // handlePrice -> access array of price range in prices.js, value passed in is price._id
  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  };

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
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter By Price Range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className='col-8'>{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
