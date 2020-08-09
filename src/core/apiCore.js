import { API } from "../config";

// Get products by arrial and sell
export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=4`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
