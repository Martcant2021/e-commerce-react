import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useLoginMutation } from "../services/AuthApi";
import Error from "../ApiStatus/Error";


const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const loginMutation = useLoginMutation();
    

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            await loginMutation.mutateAsync({ email: email, password: password})
            navigate('/')
        }catch(error){
            setError(true)
            console.error('error', error)
        }
    }

    return(
        <div>
            <h1>Login</h1>
            {error && <Error />}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>


            <h2>Yo are not registered?</h2>
            <Link to={"/CreateUser"} >create User</Link>
        </div>
    )
}

export default Login;