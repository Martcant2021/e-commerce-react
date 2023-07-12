import React, { useEffect, useState } from "react";
import { getProducts } from "../services/Api";
import "./PageStyles.css"
import Loading from "../ApiStatus/Loading";
import Error from "../ApiStatus/Error";
import Success from "../ApiStatus/Success";
import Navbar from "../Navbar/Navbar";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError('Error fetching products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar/>
      <h2>Products</h2>

      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      {!isLoading && !error && !success && (
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