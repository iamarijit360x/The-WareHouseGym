import Navbar from "./components/Navbar"
import DashBoard from "./pages/Dashbaord";
import Home from "./pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SignInPage from "./pages/Signin";
import SignUp from "./pages/Signup";
import UnAuth from "./pages/UnAuth";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useState } from "react";
import { useSelector } from "react-redux";
function App() {
 
const authState=useSelector(state=>state.auth.authState)

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={authState ? <Navigate to="/dashboard" /> : <SignInPage />} />
          <Route path='/signup' element={authState ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path='/dashboard' element={authState?<DashBoard/>:<UnAuth/>}/>
          
      </Routes>
    </BrowserRouter>
  )
}

export default App
