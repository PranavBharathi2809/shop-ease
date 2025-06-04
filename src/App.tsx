import React from 'react'
import SignIn from './features/SignIn'
import SignUp from './features/Signup'
import Product from './features/Product'
import Cart from './features/Cart/CartPage'
import MainPage from './features/Pages/MainPage'
import Header from './features/components/Header'
import {CartProvider} from './features/Cart/cartContext'
import { Routes, Route } from 'react-router-dom'
// import { OrderHistoryProvider } from './OrderHistoryContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// import './App.css'
import PaymentPage from './features/Payment/PaymentPage'
import OrderHistoryPage from './features/order/OrderHistoryPage'
import AboutPage from './features/About'
import WomenProduct from './features/Pages/WomenProductList'
import MenProduct from './features/Pages/MenProductList'
import ChildrenProduct from './features/Pages/ChildrenProductList'
import BeautyProduct from './features/Pages/BeautyProductList'


const App = () => {
  return (
    <div>
      <CartProvider>
         <PayPalScriptProvider  options={{"clientId": "AfFwFlUt44l7WmBDbftMjTkFYIPc5Cxwzx25Nx8Os1cIjhW4SlYPRgr9xN-1ehIAtpfxS8SI6DVpgRtS", "currency": "USD" }}>
       {/* <Header /> */}
        <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage/>}/>
      <Route path = '/signin' element = {<SignIn/>}></Route>
      <Route path ='/signup' element = {<SignUp/>}></Route>
      <Route path = '/women' element={<WomenProduct/>}></Route>
      <Route path = '/men' element={<MenProduct/>}></Route>
      <Route path = '/children' element={<ChildrenProduct/>}></Route>
      <Route path = '/beauty' element={<BeautyProduct/>}></Route>
      <Route path = '/cart'  element = {<Cart/>}></Route>
      <Route path="/order" element={<OrderHistoryPage />} />
      <Route path="/payment" element={<PaymentPage />} />
     </Routes>


       </PayPalScriptProvider> 
      </CartProvider>
      
      
     
   

    </div>
  )
}

export default App