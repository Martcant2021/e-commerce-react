import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createProduct, getCategories } from '../services/ProductsApi';
import Loading from '../ApiStatus/Loading';
import Error from '../ApiStatus/Error';
import './AdminStyles.css'


const CreateProduct = () => {
    const queryClient = useQueryClient()
    const [productData, setProductData] = useState({
        title: '',
        price: 0,
        description: '',
        categoryId: 1,
        images: ["https://picsum.photos/640/640?r=5641",
        "https://picsum.photos/640/640?r=6879",
        "https://picsum.photos/640/640?r=6629"],
    });

    const [productCreated, setProductCreated] = useState(false)
    const {data: categories, isLoading, isError} = useQuery('categories', getCategories)


    const productMutation = useMutation(createProduct,{
        onSuccess: () =>{
            setProductData({
                title: '',
                price: 0,
                description: '',
                categoryId: 1,
                images: ["https://picsum.photos/640/640?r=5641",
                "https://picsum.photos/640/640?r=6879",
                "https://picsum.photos/640/640?r=6629"],
            })
            queryClient.invalidateQueries('products');
            setProductCreated(true);
        },
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        productMutation.mutate(productData)
    }

    if (isLoading) {
        return <Loading/>;
      }

    if (isError) {
    return <Error message="Error created product" />;
    }


    return (
        <div className='my-profile-container'>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input type="text" id='title' value={productData.title} onChange={(e)=>setProductData({...productData, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="price">price:</label>
                    <input type="number" id='price' value={productData.price} onChange={(e)=>setProductData({...productData, price: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="description">description:</label>
                    <input type="text" id='description' value={productData.description} onChange={(e)=>setProductData({...productData, description: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="category">category:</label>
                    <select  id='category' value={productData.categoryId} onChange={(e)=>setProductData({...productData, categoryId: e.target.value})}>
                    
                    {categories.map((category)=>(
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                    </select>
                </div>
                <button type='submit'>create product</button>
            </form>
            {productCreated && <p>Producto creado</p>} 
        </div>

    )
};

export default CreateProduct;

