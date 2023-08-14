import React from "react";
import { useCart } from "./CartContext";

const Cart = () =>{
    const { cartItem, RemoveProduct,getTotalPrice,getTotalQuantity } = useCart();


    return(
        <div>
            <h2>your cart</h2>
            {cartItem.map(item =>(
                <div>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={()=>RemoveProduct(item.id)}>Remove</button>

                </div>
            ))}
            <p>Total price ${getTotalPrice}</p>
            <p>Total quantity: {getTotalQuantity}</p>
        </div>

    );
}

export default Cart;