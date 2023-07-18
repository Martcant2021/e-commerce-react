import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/Api";
import Navbar from "../Navbar/Navbar";



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
            <Navbar />
            <h2>Products by category</h2>
            {/* NO FUNCIONA mostrar el nombre de la categoria seleccionada en pantalla. Ej: furniture products */}
            {/* <h2 >{products.name}</h2> */}
            <div className="product-grid">
            {products.map((product)=>(
                    <div key={product.id} className="product">
                        <img src={product.images} alt={product.title} className="product-image"/>
                        <p className="product-title">{product.title}</p>
                        <p className="product-price">$ {product.price}</p>
                    </div>
                ))}
            </div>
        </div>

    )


}

export default ProductsByCategory;