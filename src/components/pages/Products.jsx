import React from "react";
import { getProducts } from "../services/ProductsApi";
import { useQuery } from 'react-query';
import "./PageStyles.css"
import Loading from "../ApiStatus/Loading";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";


const Products = () => {
  const {data: products, isLoading, error, isSuccess} = useQuery('products', getProducts);




  return (
    <div>
      <Navbar/>

      <h2>Products</h2>
      {isLoading && <Loading />}
      {error && <Error />}

      {!isLoading && !error && isSuccess &&(
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img src={product.images} alt={product.title} className="product-image" />
              <p className="product-title">{product.title}</p>
              <p className="product-price">$ {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;