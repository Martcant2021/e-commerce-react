import axios from "axios";
import { useMutation } from "react-query";

const API_URL = ' https://api.escuelajs.co/api/v1';



export const loginUser = async (credentials) =>{
    try{
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        const {access_token} = response.data

        // const users = response.data;

        // const user = users.find((user) => user.email === credentials.email && user.password === credentials.password)
        localStorage.setItem('access_token', access_token)
        console.log(access_token)
        return true
    } catch (error){
        console.error("Login error:", error);
        throw error
    }
};
const useLoginMutation=()=>{
    return useMutation(loginUser)
}
export {useLoginMutation}
    

export const getLoggedInUser = async () =>{

    const accessToken = localStorage.getItem('access_token')
    try{
        const response = await axios.get(`${API_URL}/auth/profile`, {
            headers:{
                Authorization:  `Bearer ${accessToken}`,
            }
        });
        return response.data
    }catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};




export const registerUser = async (userData) => {
  try {
    // NO FUNCIONA is-available de la API, siempe da como respuesta false
    // const emailValidate = userData.email;
    // const isAvailableResponse = await axios.post(`${API_URL}/is-available`, {
    //   email: emailValidate
    // });
    // console.log(isAvailableResponse.data)
    // const isAvailable = isAvailableResponse.data;

    // if (!isAvailable) {
    //   throw new Error('Existing user');
    // }else{
        
        
    // }
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};



export const updateUser = async (userId, userData) =>{
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error){
        console.error('Error updating user', error);
        throw error
    }
}

export const deleteUser = async (userId) =>{
    try{
        await axios.delete(`${API_URL}/users/${userId}`)
    }catch (error){
        console.error('Error deleting user', error)
        throw error;
    }
}

