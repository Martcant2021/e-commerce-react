import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useLoginMutation } from "../services/AuthApi";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";
import './AuthStyles.css'


const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const loginMutation = useLoginMutation();
    

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const user = await loginMutation.mutateAsync({  email: email, password: password});
            
            navigate('/profile');
            console.log(user)
        }catch(error){
            console.error('error', error)
        }
    }



    return (
        <div>
            <Navbar />
            <div className="login-container">
                <div className="login-form">
                    <h1>Login</h1>
                    {loginMutation.isError && <Error message="Incorrect password or invalid email" />}
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    </form>
                    <h2>You are not registered?</h2>
                    <Link to={"/register"} className="register-link">Create User</Link>
                </div>
            </div>

        </div>
      );

}

export default Login;