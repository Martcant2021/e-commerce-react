import React, { useState } from "react";
import { getProducts } from "../services/ProductsApi";
import { useInfiniteQuery, useQuery } from 'react-query';
import "./PageStyles.css";
import Loading from "../ApiStatus/Loading";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";

const Products = () => {
  const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery('products',({pageParam={offset:0,limit:40}})=> getProducts(pageParam.offset, pageParam.limit),
  {

    getNextPageParam: (lastPage) =>{
      if (lastPage.length ===0)return false;
        return {
          offset : lastPage.length ,
          limit:40  
        }
    }
  });


  if(isLoading)  return <Loading />
  if(isError)  return <Error />

    const allPages = data.pages.flat()

  return (
    <div>
      <Navbar />

      <h2>Products</h2>

        <div className="product-grid">
          {allPages.map((product) => (
            <div key={product.id} className="product">
              <img src={product.images} alt={product.title} className="product-image" />
              <p className="product-title">{product.title}</p>
              <p className="product-price">$ {product.price}</p>
            </div>
          ))}
        </div>
        
        {isSuccess && hasNextPage && (

        <button onClick={() => fetchNextPage()} disabled={hasNextPage == data}>More products</button>  
      )}
    </div>
  );
};

export default Products;
