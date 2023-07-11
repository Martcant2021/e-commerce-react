import React from "react";
import {Routes,Route} from 'react-router-dom';
import Categories from './pages/Categories';
import ProductsByCategory from "./pages/ProductsByCategory";
import Products from "./pages/Products";
import Home from "./pages/Home";



function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" Component={Home}/>
            <Route exact path="/categories" Component={Categories} />
            <Route exact path="/productfor" Component={ProductsByCategory} />
            <Route exact path="/products" Component={Products} />


        </Routes>
        
    )

}

export default RoutesApp;