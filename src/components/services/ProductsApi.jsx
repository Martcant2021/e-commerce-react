import axios from 'axios' ;



const API_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async (offset, limit, title, minPrice, maxPrice) => {
    const params = new URLSearchParams();
    if (offset!==null) {params.append('offset',offset)}
    if (limit!==null) {params.append('limit',limit)}
    if (title) params.append('title',title)
    if (minPrice) params.append('min_price',minPrice)
    if (maxPrice) params.append('max_price',maxPrice)

    try {
        const response = await axios.get(`${API_URL}/products?${params}`)
        return response.data
    } catch (error){
        console.error('Error fetching data',error)
        throw error
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product data', error);
        throw error;
    }
  };

  
export const getProductsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${API_URL}/categories/${categoryId}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
    }
  };

  // Category 

export const getCategories = async () => {
    try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
    } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category data', error);
        throw error;
    }
};


/*---- ADMIN USERS ---- */

export const createProduct = async (productData) =>{
    try{
        const response = await axios.post(`${API_URL}/products`, productData)
        return response.data
    } catch (error){
        console.error('Error creating data', error)
        throw error
    }
}

export const updateProduct = async (productId, productData) =>{
    try{
        const response = await axios.put(`${API_URL}/products/${productId}`, productData)
        return response.data
    }catch (error){
        console.error('Error creating data', error)
        throw error
    }
}

export const deleteProduct = async (productId) =>{
    try{
        const response = await axios.delete(`${API_URL}/products/${productId}`)
        return response.data
    }catch (error){
        console.error('Error deleting data', error)
        throw error
    }
}

// category admin

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating category', error);
        throw error;
    }
  };


export const updateCategory = async (categoryId, categoryData) => {
    try {
        console.log('Updating category:', categoryId, categoryData);
        const response = await axios.put(`${API_URL}/categories/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) =>{
    try{
        const response = await axios.delete(`${API_URL}/categories/${categoryId}`)
        return response.data
    }catch (error){
        console.error('Error deleting data', error)
        throw error
    }
}
/*-----*/