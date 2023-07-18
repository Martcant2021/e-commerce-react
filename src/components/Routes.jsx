import React from "react";
import {Routes,Route} from 'react-router-dom';
import Categories from './pages/Categories';
import ProductsByCategory from "./pages/ProductsByCategory";
import Products from "./pages/Products";
import NotFound from  "./ApiStatus/NotFound";
import Login from "./AuthPage/Login";



function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" Component={Products}/>
            <Route exact path="/categories" Component={Categories} />
            <Route exact path="/products" Component={ProductsByCategory} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/CreateUser" Component={NotFound} />

        </Routes>
        
    )

}

export default RoutesApp;