import React, { useContext, useState } from "react";
import { getProducts } from "../services/ProductsApi";
import { useInfiniteQuery, useQuery } from 'react-query';
import "./PageStyles.css";
import Loading from "../ApiStatus/Loading";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";
import { getLoggedInUser } from "../services/AuthApi";
import { Link } from "react-router-dom";




const Products = () => {
    const { data: user } = useQuery('user', getLoggedInUser);

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

				{user?.isAdmin && (
                            <Link to={`/edit/${product.id}/`}>Edit</Link>
                        )}
				</div>
			))}
			</div>
			
			{isSuccess && hasNextPage && (

			<button onClick={() => fetchNextPage()} disabled={!hasNextPage}>More products</button>
		)}
		</div>
	);
};

export default Products;
