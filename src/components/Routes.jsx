import React from "react";
import {Routes,Route} from 'react-router-dom';
import Categories from './pages/Categories';
import ProductsByCategory from "./pages/ProductsByCategory";
import Products from "./pages/Products";
import NotFound from  "./ApiStatus/NotFound";
import Login from "./AuthPage/Login";
import Register from "./AuthPage/Register";
import MyProfile from "./pages/MyProfile";
import AdminTools from "./admin/AdminTools";
import EditProduct from "./admin/EditProduct";
import EditCategory from "./admin/EditCategory";

function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" Component={Products}/>
            <Route exact path="/categories" Component={Categories} />
            <Route exact path="/products" Component={ProductsByCategory} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/profile" Component={MyProfile} />
            <Route exact path="/notfound" Component={NotFound} />

            {/* admin routes */}
            <Route exact path="/admintools" Component={AdminTools} />
            <Route exact path="/edit/:productId" Component={EditProduct} />
            <Route exact path="/editCategory/:categoryId" Component={EditCategory} />
        </Routes>
        
    )

}

export default RoutesApp;