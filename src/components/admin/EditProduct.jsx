import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { updateProduct, getProductById } from '../services/ProductsApi';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../ApiStatus/Loading';
import Error from '../ApiStatus/Error';
import Navbar from '../Layout/Navbar';
import DeleteProduct from './DeleteProduct';



const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate()
    const { data: product, isLoading, isError } = useQuery(['product', productId], () =>
        getProductById(productId)
    );

    const [productData, setProductData] = useState({
        title: '',
        price: 0,
    });

    useEffect(() => {
        if (product) {
        setProductData({
            title: product.title,
            price: product.price,
        });
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(productId, productData);
        navigate('/');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching product data</div>;
    }

    return (
        <div>
            <Navbar/>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })}/>
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })}/>
            </div>
            <button type="submit">Update</button>
            <DeleteProduct productId={product.id}/>
        </form>
        </div>
    );
};

export default EditProduct;

