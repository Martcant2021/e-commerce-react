import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { getCategories } from '../services/ProductsApi';
import Loading  from "../ApiStatus/Loading";
import Error  from "../ApiStatus/Error";
import  Success  from "../ApiStatus/Success";
import Navbar from "../Layout/Navbar";


const Categories = () => {

  const {data: categories, isLoading, error, isSuccess} = useQuery('categories', getCategories)

  return (
    <div className="categories">

      <Navbar />
      <h2>Categories</h2>

      {isLoading && <Loading />}
      {error && <Error />}

      {!isLoading && !error && isSuccess && (
        <div className="categories-grid">
          {categories.map((category) => (
              <Link to={`/products?category=${category.id}`} className="category-item" key={category.id}>
              <img src={category.image} alt={category.name} className="category-image" />
              <h1 className="category-name">{category.name}</h1>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;