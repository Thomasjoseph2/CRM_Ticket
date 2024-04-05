import React from "react";
import { ReactTyped } from "react-typed";
import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";
const Hero = () => {
  const { getUserInfo } = useUserContext();
  const userInfo = getUserInfo();
  return (
    <div className="text-white ">
      <div className=" mt-[96px] text-center  flex flex-col justify-center items-center mx-auto overflow-y-hidden p-24">
        <p className="text-[#00df9a] font-bold p-2 text-lg">
          It takes months to find a customer,seconds to lose one...
        </p>
        <h1 className=" text-3xl font-bold md:py-6">
          WELCOME TO LATSIFY CRM APPLICATION{" "}
        </h1>
        <div className="flex ">
          <ReactTyped
            className=" pl-2  text-2xl font-bold"
            strings={["CUSTOMER...", "RELATIONSHIP...", "MANAGEMENT."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <div className="mt-4 w-72">
          {userInfo ? (
            <h1>
              Welcome{" "}
              <span className="font-bold text-[#00df9a]">{userInfo.name}</span>{" "}
            </h1>
          ) : (
            <Link to="/login">
              <button className="text-xl font-bold mt-3 bg-blue-800 w-full p-1 rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
