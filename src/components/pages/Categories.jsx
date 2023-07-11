import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from '../services/Api';
import Loading  from "../ApiStatus/Loading";
import Error  from "../ApiStatus/Error";
import  Success  from "../ApiStatus/Success";
import Navbar from "../Navbar/Navbar";


const categoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories', error);
        setError('Error fetching categories. Please try again later.');
      }

      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div>
        <Navbar />
      <h2>Categories</h2>
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      {!isLoading && !error && !success && (
        <ul>
          {categories.map((category) => (
            <div key={category.id}>
              <Link to={`/productfor?category=${category.id}`}>
                <h1>{category.name}</h1>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default categoriesPage;