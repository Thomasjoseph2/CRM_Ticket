import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Customers from "./components/Customers";
import Products from "./components/Products";
import Employees from "./components/Employees";
import AppLayout from "./AppLayout";
import PrivateRoute from "./private-routes/PrivateRoute";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// axios.defaults.baseURL = "http://localhost:5000/api/v1/users";
axios.defaults.baseURL = "https://crm-ticket-fzfl.onrender.com/api/v1/users";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
