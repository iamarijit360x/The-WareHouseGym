import Navbar from "./components/Navbar"
import DashBoard from "./pages/Dashbaord";
import Home from "./pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SignInPage from "./pages/Signin";
import SignUp1 from "./pages/Signup1";
import SignUp2 from "./pages/Signup2";
import UnAuth from "./pages/UnAuth";
import { BrowserRouter, Routes, Route,Navigate,useLocation} from 'react-router-dom';
import { useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer/Footer";
import Pricing2 from "./pages/Pricing2";
import Pricing from "./components/Pricing/Pricing";
import ScrollToTop from "./components/ScrollToTop"
import AdminDashboard from "./pages/AdminDashboard"
import AdminNavbar from "./components/AdminNavbar";
function App() {

 

const authState=useSelector(state=>state.auth.authState)
const isAdmin=useSelector(state=>state.auth.isAdmin)
  if(isAdmin)
    return(
      <BrowserRouter>
      <AdminNavbar/>
      <ScrollToTop/>
        <Routes>
        <Route path='/dashboard' element={authState ? <Navigate to="/admin/dashboard" /> : <SignInPage />} />
        <Route path='/' element={authState ? <Navigate to="/admin/dashboard" /> : <SignInPage />} />
        <Route path='/admin/dashboard' element={authState?<AdminDashboard/>: <Navigate to="/signin" />} />
        <Route path='/signin' element={authState ? <Navigate to="/dashboard" /> : <SignInPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>)
  else
  return (
    <BrowserRouter>
    <Navbar/>
    <ScrollToTop/>
      <Routes>
        
        
          <Route  path='/' element={<Home/>}/>
          <Route path='/signin' element={authState ? <Navigate to="/dashboard" /> : <SignInPage />} />
          <Route path='/signup1' element={authState ? <Navigate to="/dashboard" /> : <SignUp1 />} />
          <Route path='/signup2' element={authState ? <Navigate to="/dashboard" /> :<SignUp2 />} />
          <Route path='/dashboard' element={authState?<DashBoard/>:<Navigate to="/signin" />}/>
          <Route path='/pricing1' element={<Pricing/>}/>
          <Route path='/pricing2' element={authState?<Pricing2/>:<Navigate to="/signin" />}/>
          <Route path='/checkout' element={authState?<Checkout/>:<Navigate to="/signin" />}/>
          
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
