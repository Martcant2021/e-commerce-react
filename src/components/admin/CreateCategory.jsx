import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createCategory } from '../services/ProductsApi';

const CreateCategory = () => {
  const queryClient = useQueryClient();
  const [categoryData, setCategoryData] = useState({
    name: '',
    image: 'https://placeimg.com/640/480/any',
  });

  const createCategoryMutation = useMutation(createCategory, {
    onSuccess: () => {
      setCategoryData({
        name: '',
        image: 'https://placeimg.com/640/480/any',
      });
      queryClient.invalidateQueries('categories');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategoryMutation.mutate(categoryData);
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={categoryData.name} onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;
