import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from 'react-query';
import { getProductsByCategory } from "../services/ProductsApi";
import Navbar from "../Layout/Navbar";
import Loading  from "../ApiStatus/Loading";
import Error  from "../ApiStatus/Error";
import  Success  from "../ApiStatus/Success";




const ProductsByCategory = ()=>{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const { isLoading, error, isSuccess } = useQuery('ProductsByCategory', async()=>{
  const productsData = await getProductsByCategory(categoryId)
  setProducts(productsData)
  })


  return(
    <div>
      <Navbar />

      {products.slice(0, 1).map((product)=>(
      <h2 key={product.id}>{product.category.name}</h2>
      ))}

      {isLoading && <Loading />}
      {error && <Error/>}

      {!isLoading && !error && isSuccess &&(

      <div className="product-grid">
      {products.map((product)=>(
              <div key={product.id} className="product">
                  <img src={product.images} alt={product.title} className="product-image"/>
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">$ {product.price}</p>
              </div>
          ))}
      </div>
      )}
  </div>

  )


}

export default ProductsByCategory;

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);




  // const fethProductsByCategory = async () =>{
  //     try{
  //         const productsData = await getProductsByCategory(categoryId)
  //         setProducts(productsData)
  //         setSuccess(true)
  //     }catch (error){
  //         console.error('error fetching category', error)
  //         setError('Error fetching products. Please try again later.');
  //     }
  //     setIsLoading(false)
  // };
  // fethProductsByCategory()