import React from "react";
import { NavLink } from "react-router-dom";

const Navbar =()=>{
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/"}  >home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categories"} >categories</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/products"}  >products</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Navbar;