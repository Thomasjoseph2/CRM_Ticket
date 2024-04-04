import { Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"
import axios from "axios"
import  { Toaster } from 'react-hot-toast';

axios.defaults.baseURL="http://localhost:5000/api/v1/users";
axios.defaults.withCredentials=true;

function App() {

  return (
    <div>
    <Navbar/>
    <Toaster position="top-right" toastOptions={{duration:3000}}/>
    <Routes>
      <Route index path="/" element={<HomePage/>}/>
      <Route  path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
