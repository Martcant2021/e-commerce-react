import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { getCategories } from '../services/ProductsApi';
import Loading  from "../ApiStatus/Loading";
import Error  from "../ApiStatus/Error";
import  Success  from "../ApiStatus/Success";
import Navbar from "../Layout/Navbar";
import { getLoggedInUser } from "../services/AuthApi";


const Categories = () => {
  const { data: user } = useQuery('user', getLoggedInUser);

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
            <div className="category-item" key={category.id}>
                <Link to={`/products?category=${category.id}`} className="category-link" >
                <img src={category.image} alt={category.name} className="category-image" />
                <h1 className="category-name">{category.name}</h1>
                </Link>
                {user?.isAdmin && (
                    <Link to={`/editCategory/${category.id}/`}>Edit</Link>
                        )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;