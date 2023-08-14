import React, {useState} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './LayoutStyle.css';
import { useCart } from "../cart/CartContext";
import '../cart/CartStyles.css'


const Navbar =()=>{

    const { cartItem, getTotalPrice, getTotalQuantity } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

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
        <div >
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
                    <NavLink to={""} className="navbar-icon"><ion-icon name="cart-outline" onClick={() => setIsCartOpen(!isCartOpen)}></ion-icon ></NavLink>
                    {getTotalQuantity(cartItem) > 0 && <span className="cart-item-count">{getTotalQuantity(cartItem)}</span>}
                </li>

            </ul>

        </>
            ): (
            <a href="/" className="navbar-brand" >Martin commerce</a>
            )}
            </nav>
        <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-sidebar-header">
                <h3>Your Cart</h3>
                <ion-icon name="close-outline" onClick={() => setIsCartOpen(false)} ></ion-icon>
            </div>
            <div className="cart-sidebar-items">
                {cartItem.map((item) => (
                <div key={item.id} className="cart-item">
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
                ))}
            </div>
            <div className="cart-sidebar-total">
                <p>Total:</p>
                <p>${getTotalPrice(cartItem)}</p>
            </div>
            
        </div>

        </div>
    )

}

export default Navbar;