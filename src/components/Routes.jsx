import React from "react";
import {Routes,Route} from 'react-router-dom';
import Categories from './pages/Categories';
import ProductsByCategory from "./pages/ProductsByCategory";
import Products from "./pages/Products";



function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" Component={Products}/>
            <Route exact path="/categories" Component={Categories} />
            <Route exact path="/products" Component={ProductsByCategory} />


        </Routes>
        
    )

}

export default RoutesApp;