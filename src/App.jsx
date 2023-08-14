import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from './components/cart/CartContext';


const queryClient = new QueryClient();


function App() {

  return (
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CartProvider>
        <Routes/>
        </CartProvider>
      </BrowserRouter>
      </QueryClientProvider>
  );
};

export default App;

