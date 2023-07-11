import React, { useEffect, useState } from "react";
import { getProducts } from "../services/Api";
import Loading from "../ApiStatus/Loading";
import Error from "../ApiStatus/Error";
import Success from "../ApiStatus/Success";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      <h2>Products</h2>

      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      {!isLoading && !error && !success && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.title}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;