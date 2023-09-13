import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser} from "../services/AuthApi";
import Error from "../ApiStatus/Error";
import Success from "../ApiStatus/Success";
import { useForm, FormProvider } from 'react-hook-form'
import Navbar from "../Layout/Navbar";
import './AuthStyles.css'


const Register =()=>{
    const methods = useForm()
    const navigate = useNavigate()


    const mutation = useMutation(registerUser, {
        onSuccess: () =>{
            navigate("/login");

        },
        onError: (error)=>{
            console.error(error)
            return <Error message="Error fetching user data" />;
        }
    })


    const handleRegister = async (userData) =>{
        try{
            if (userData){
                userData.avatar = 'https://thispersondoesnotexist.com/'
                await mutation.mutateAsync(userData)
                console.log(userData)
            }
        }catch (error){
            console.error(error)
            setError("error")
        }
    }


    return(
        <div>
            <Navbar/>
            <div className="login-container">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleRegister)} className="login-form">
                        <h1>Register</h1>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" name="" id="name" {...methods.register('name', {required: true})} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" id="email" {...methods.register('email', {required: true})} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="" id="password" {...methods.register('password', {required: true})} />
                        </div>
                            <input type="hidden" {...methods.register('avatar')} />
                        <button type="submit" className="login-button">Register</button>
                    </form>
                </FormProvider>

            </div>
        </div>
    )

}
 export default Register