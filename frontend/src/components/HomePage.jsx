import React from "react";
import { ReactTyped } from "react-typed";
const Hero = () => {
  return (
    <div className="text-white ">
      <div className=" mt-[96px] text-center  flex flex-col justify-center items-center mx-auto overflow-y-hidden p-24">
        <p className="text-[#00df9a] fonst-bold p-2">It takes months to find a customer,seconds to lose one... </p>
        <h1 className=" text-3xl font-bold md:py-6">WELCOME TO LATSIFY CRM APPLICATION </h1>
        <div className="flex ">
            <ReactTyped className=" pl-2  text-2xl font-bold" strings={['CUSTOMER...','RELATIONSHIP...','MANAGEMENT.']} typeSpeed={120} backSpeed={140} loop/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
