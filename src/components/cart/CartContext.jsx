import React, {createContext, useContext, useState} from "react";


const CartContext = createContext();

export const useCart = () =>{
    return useContext(CartContext)
}

export const CartProvider = ({children }) =>{
    const [cartItem, setCartItem] = useState([])

    const addToCart = (product) =>{
        const existingItem = cartItem.find(item => item.id === product.id);

        if (existingItem) {
          setCartItem(cartItem.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ));
        } else {
          setCartItem([...cartItem, { ...product, quantity: 1 }]);
        }
    }

    const RemoveProduct = (productId) =>{
        setCartItem(cartItem.filter(item => item.id !== productId))
    }

    const clearCart = () =>{
        setCartItem([])
    }

    const getTotalPrice = () =>{
        return cartItem.reduce((total, item)=> total + (item.price * item.quantity), 0)
    }

    const getTotalQuantity = () => {
        return cartItem.reduce((total, item) => total + item.quantity, 0);
      };





    return (
        <CartContext.Provider value={{ cartItem, addToCart, clearCart, getTotalPrice, RemoveProduct, getTotalQuantity }}>
          {children}
        </CartContext.Provider>
      )};

