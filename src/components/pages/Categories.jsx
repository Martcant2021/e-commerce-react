import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from '../services/Api';
import Loading  from "../ApiStatus/Loading";
import Error  from "../ApiStatus/Error";
import  Success  from "../ApiStatus/Success";
import Navbar from "../Navbar/Navbar";


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success] = useState(null);

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
    <div className="categories">
      <Navbar />
      <h2>Categories</h2>
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      {!isLoading && !error && !success && (
        <div className="categories-grid">
          {categories.map((category) => (
              <Link to={`/products?category=${category.id}`}className="category-item">
              <img src={category.image} alt={category.name} className="category-image" />
              <h1 className="category-name">{category.name}</h1>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;