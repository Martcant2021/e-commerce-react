import React from "react";
import { Link } from "react-router-dom";



const NotFound =()=>{
    return(
        <div>
            <h1> ERROR 404 </h1>
            <p>Page not found</p>
            <Link to={"/"}>Back To Home</Link>
        </div>

    )
}

export default NotFound;