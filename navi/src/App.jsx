import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home1';
import Product from './Components/Product/Product';
import Login from './Components/Login/Login'; 
import Admin from './Components/Admin/Admin';
import Chief from './Components/Chief/Chief';
import Qr from './Components/Admin/Qrgenerate';
import User from './Components/Userpage/Userpage';
import Cart from './Components/Userpage/Cart';
import Order from './Components/Chief/Order';

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/product" element={<Product />} /> 
          <Route path="/admin" element={<Admin />} />
          <Route path='/chief' element={<Chief />} />
          <Route path='/qr' element={<Qr />} />
          <Route path='/client/:id/:table?' element={<User />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
