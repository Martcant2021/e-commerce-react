import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './LayoutStyle.css';

const Navbar =()=>{
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate()

    const handleProfileClick = () => {
        if (accessToken) {
          navigate('/profile'); 
        } else {
          navigate('/login'); 
        }
      };


    const isNotAuthPage = location.pathname !== "/login" && location.pathname !== "/register"


    return(
        <nav className="navbar">
            {isNotAuthPage ? (
            <>
            <a href="/" className="navbar-brand">Martin commerce</a>
            <div className="search-bar">
                <button><ion-icon name="search-outline"></ion-icon></button>
                <input type="text" placeholder="search" />
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to={"/categories"} className="navbar-link">categories</NavLink>
                </li>
                <li>
                    <button onClick={handleProfileClick} className="navbar-icon" ><ion-icon name="person-outline"></ion-icon></button>
                </li>
                <li>
                    <NavLink to={""} className="navbar-icon"><ion-icon name="cart-outline"></ion-icon></NavLink>
                </li>

            </ul>
                </>
        ): (
            <a href="/" className="navbar-brand" >Martin commerce</a>
        )}
        </nav>
    )

}

export default Navbar;