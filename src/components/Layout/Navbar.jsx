import React from "react";
import { NavLink } from "react-router-dom";
import './LayoutStyle.css';

const Navbar =()=>{
    const handleReload = () => {
        window.location.href="/"};



    return(
        <nav className="navbar">
            <NavLink to={"/"} className="navbar-brand"  onClick={handleReload}>Martin commerce</NavLink>
            <div className="search-bar">
                <button><ion-icon name="search-outline"></ion-icon></button>
                <input type="text" placeholder="search" />
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to={"/categories"} className="navbar-link">categories</NavLink>
                </li>
                <li>
                    <NavLink to={"/Login"} className="navbar-icon"><ion-icon name="person-outline"></ion-icon></NavLink>
                </li>
                <li>
                    <NavLink to={""} className="navbar-icon"><ion-icon name="cart-outline"></ion-icon></NavLink>
                </li>

            </ul>
        </nav>
    )

}

export default Navbar;