import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../context/userContext";
const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="text-white flex items-center justify-center  mx-auto max-w-[1240px] p-4 top-0 z-10 sticky">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">CRM</h1>
      <ul className=" hidden md:flex">
        <li className="p-4">Targets</li>
        <li className="p-4">Contact</li>
        <li className="p-4">Coustomers</li>
        <li className="p-4">Employees</li>
        <li className="p-4">Complaints</li>
      </ul>

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
            ? "fixed left-0 top-0 p-4 w-3/4 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className=" p-4 w-full text-3xl font-bold text-[#00df9a]">React</h1>
        <ul className="uppercase ">
        <li className="p-4">Coustomers</li>
        <li className="p-4">Employees</li>
        <li className="p-4">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
