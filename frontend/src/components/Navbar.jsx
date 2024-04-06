import { useState } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const { getUserInfo, logout } = useUserContext();
  const userInfo = getUserInfo();
  const handleLogout = () => {
    try {
      axios
        .post("/logout")
        .then((res) => {
          if (res.data.message) {
            logout();
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err, "catch block");
          toast.error("something went wrong");
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="text-white flex items-center justify-center  mx-auto max-w-[1240px] p-4 top-0 z-10 sticky">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        <Link to="/">CRM</Link>
      </h1>
      {userInfo ? (
        <ul className=" hidden md:flex">
          <Link to="/customers">
            <li className="p-4">Coustomers</li>
          </Link>
          <Link to="/employees">
            <li className="p-4">Employees</li>
          </Link>
          <Link to="/products">
            <li className="p-4">Products</li>
          </Link>
          <Link onClick={handleLogout}>
            <li className="p-4">Logout</li>
          </Link>
        </ul>
      ) : (
        <ul className=" hidden md:flex">
          <Link to="/login">
            <li className="p-4">Login</li>
          </Link>
          <Link to="/signup">
            <li className="p-4">Signup</li>
          </Link>
        </ul>
      )}

      <div className="md:hidden">
        {toggle ? (
          <AiOutlineMenu
            onClick={() => {
              setToggle(false);
            }}
            size={24}
          />
        ) : (
          <AiOutlineClose
            size={20}
            onClick={() => {
              setToggle(true);
            }}
          />
        )}
      </div>

      <div
        className={
          !toggle
            ? "fixed left-0 top-0 p-4 w-[90%] bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className=" p-4 w-full text-3xl font-bold text-[#00df9a]">CRM</h1>
        {userInfo ? (
          <ul className="uppercase ">
            <Link to="/customers">
              <li className="p-4">Coustomers</li>
            </Link>
            <Link to="/employees">
              <li className="p-4">Employees</li>
            </Link>
            <Link to="/products">
              <li className="p-4">Products</li>
            </Link>
            <Link onClick={handleLogout}>
              <li className="p-4">Logout</li>
            </Link>
          </ul>
        ) : (
          <ul className="uppercase ">
            <Link to="/login">
              <li className="p-4">Login</li>
            </Link>
            <Link to="/signup">
              <li className="p-4">Signup</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
