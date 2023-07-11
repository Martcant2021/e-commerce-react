import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/Api";


const ProductsByCategory = ()=>{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('category');
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        const fethProductsByCategory = async () =>{
            try{
                const productsData = await getProductsByCategory(categoryId)
                setProducts(productsData)
            }catch (error){
                console.error('error fetching category', error)
            }
        };

        fethProductsByCategory()
    }, [categoryId]);

    return(
        <div>
            <h2>products by categories</h2>
            <ul>
                {products.map((product)=>(
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>

    )


}

export default ProductsByCategory;