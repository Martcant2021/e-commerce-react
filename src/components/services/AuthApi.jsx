import axios from "axios";
import { useMutation } from "react-query";

const API_URL = ' https://api.escuelajs.co/api/v1/users';



export const loginUser = async (credentials) =>{
    try{
        const response = await axios.get(API_URL);
        const users = response.data;

        const user = users.find((user) => user.email === credentials.email && user.password === credentials.password)

        if (user) {
            console.log("Success login:", user);
            return user;
          } else {
            console.error("Invalid credentials");
            throw new Error("Invalid credentials");
          }
    } catch (error){
        console.error("Login error:", error);
        throw error
    }
};
const useLoginMutation=()=>{
    return useMutation(loginUser)
}
export {useLoginMutation}

export const getUserById = async (userId) =>{
    try{
        const response = await axios.get(`${API_URL}/${userId}`);
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
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};



export const updateUser = async (userId, userData) =>{
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error){
        console.error('Error updating user', error);
        throw error
    }
}

export const deleteUser = async (userId) =>{
    try{
        await axios.delete(`${API_URL}/${userId}`)
    }catch (error){
        console.error('Error deleting user', error)
        throw error;
    }
}

