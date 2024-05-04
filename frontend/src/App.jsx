import Navbar from "./components/Navbar"
import DashBoard from "./pages/Dashbaord";
import Home from "./pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SignInPage from "./pages/Signin";
import SignUp1 from "./pages/Signup1";
import SignUp2 from "./pages/Signup2";
import UnAuth from "./pages/UnAuth";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer/Footer";
import Pricing2 from "./pages/Pricing2";
import Pricing from "./components/Pricing/Pricing";
function App() {

 

const authState=useSelector(state=>state.auth.authState)

  return (
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        
          <Route  path='/' element={<Home/>}/>
          <Route path='/signin' element={authState ? <Navigate to="/dashboard" /> : <SignInPage />} />
          <Route path='/signup1' element={authState ? <Navigate to="/dashboard" /> : <SignUp1 />} />
          <Route path='/signup2' element={authState ? <Navigate to="/dashboard" /> : <SignUp2 />} />
          <Route path='/dashboard' element={authState?<DashBoard/>:<UnAuth/>}/>
          <Route path='/pricing1' element={<Pricing/>}/>
          <Route path='/pricing2' element={authState?<Pricing2/>:<UnAuth/>}/>
          <Route path='/checkout' element={authState?<Checkout/>:<UnAuth/>}/>
          
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
