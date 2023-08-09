
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategoryById, updateCategory, getCategories } from '../services/ProductsApi';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../ApiStatus/Loading';
import DeleteCategory from './DeleteCategory';
import Navbar from '../Layout/Navbar';
import ca from 'date-fns/esm/locale/ca/index.js';

const EditCategory = () => {
    const {categoryId} = useParams()
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { data: category, isLoading, isError } = useQuery(['category', categoryId], () =>
    getCategoryById(categoryId)
);

    const [categoryData, setCategoryData] = useState({name: ''});

    const categoryMutation = useMutation(()=>updateCategory(categoryId, categoryData), {
        onSuccess: () => {
            queryClient.invalidateQueries('category', categoryId);
            navigate('/categories')
        },
    });

    useEffect(() => {
        if (category) {
            setCategoryData({
            name: category.name,
        });
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        categoryMutation.mutate(categoryId, categoryData)}


    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message="Error fetching categories" />;
    }

    return (
        <div>
            <Navbar/>
            <h2>Edit category</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">name:</label>
                <input type="text" id="name" value={categoryData.name} onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}/>
            </div>
            <button type="submit">Update</button>
            <DeleteCategory categoryId={category.id}/>
        </form>
        </div>
    );
};

export default EditCategory;


