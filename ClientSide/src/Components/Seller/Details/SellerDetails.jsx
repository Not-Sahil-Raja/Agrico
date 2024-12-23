import React from "react";
import { useState } from "react";
import { SellerLogin } from "./SellerLogin";
import { SellerRegistration } from "./SellerRegistration";
import { SideImageHolder } from "./SideImageHolder";
import { AnimatePresence } from "framer-motion";

const SellerDetails = ({}) => {
  const [authMode, setAuthMode] = useState("login");

  return (
    <div className=" flex justify-center px-[10%] bg-stone-100 py-4  w-full font-Archivo">
      <div className=" flex justify-center p-4 bg-white rounded-lg gap-4 w-full shadow">
        <div className=" h-full grow flex flex-col ">
          <div className=" flex flex-col px-6">
            <p className=" text-2xl mb-1 font-semibold">Welcome to Agrico !</p>
            <p className=" mb-2 text-black/70">
              you need to login or register to continue
            </p>
            <div className=" flex gap-2 bg-stone-200 px-2 py-1 w-full  rounded-lg">
              <button
                className={`" px-3 py-2 rounded-lg grow transition-all "${
                  authMode === "register"
                    ? " bg-white text-stone-900"
                    : " text-stone-400 bg-transparent"
                }`}
                onClick={() => setAuthMode("register")}
              >
                Sign Up
              </button>
              <button
                className={`" px-3 py-2 rounded-lg grow transition-all "${
                  authMode === "login"
                    ? " bg-white text-stone-900"
                    : " text-stone-400 bg-transparent"
                }`}
                onClick={() => setAuthMode("login")}
              >
                Log In
              </button>
            </div>
          </div>
          <AnimatePresence>
            {authMode === "login" ? <SellerLogin /> : <SellerRegistration />}
          </AnimatePresence>
        </div>
        <div className=" bg-red-300 h-full aspect-square rounded-2xl overflow-hidden">
          <SideImageHolder />
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
