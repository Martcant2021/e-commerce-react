import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser} from "../services/AuthApi";
import Error from "../ApiStatus/Error";
import Success from "../ApiStatus/Success";
import { useForm, FormProvider } from 'react-hook-form'


const Register =()=>{
    const methods = useForm()
    const navigate = useNavigate()
    const [isSuccess, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const mutation = useMutation(registerUser, {
        onSuccess: () =>{
            setSuccess(true)
            setError('')
            navigate("/")

        },
        onError: (error)=>{
            setError(error)
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
            <h2>Register</h2>
            {isSuccess && <Success message="registered complete"/> }
            {error && <Error message="error"/> }
            
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleRegister)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="name" name="" id="name" {...methods.register('name', {required: true})} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="" id="email" {...methods.register('email', {required: true})} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="" id="password" {...methods.register('password', {required: true})} />
                    </div>
                        <input type="hidden" {...methods.register('avatar')} />
                    <button type="submit">Register</button>
                </form>
            </FormProvider>
        </div>
    )

}
 export default Register