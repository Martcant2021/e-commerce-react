import React from "react";
import { NavLink } from "react-router-dom";
import './NavStyle.css';

const Navbar =()=>{
    return(
        <nav className="navbar">
            <h1 className="navbar-brand">Martin commerce</h1>
            <ul className="navbar-links">
                <li>
                    <NavLink to={"/"}  className="navbar-link">home</NavLink>
                </li>
                <li>
                    <NavLink to={"/categories"} className="navbar-link">categories</NavLink>
                </li>
            </ul>
        </nav>
    )

}

export default Navbar;