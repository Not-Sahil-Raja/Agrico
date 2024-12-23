import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userlogout } from "../../Apps/userInfoslice.js";
import { ShoppingCart, PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AgricoLogo from "./AgricoLogo.jsx";
import UserManagement from "./UserManagement.jsx";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="  bg-[#ffffffd3] backdrop-blur-md px-[3vw] lg:py-2 2xl:py-1 fixed top-0 z-50 w-screen text-lg font-Archivo text-[#2b1c1c] flex  items-center gap-[5vw] drop-shadow-md ">
      <div className=" w-fit  h-[5.8vh]  rounded-2xl px-[1vw] flex justify-center items-center  ">
        <AgricoLogo />
      </div>

      <div className=" py-1 text-base flex justify-around w-fit lg:gap-1 xl:gap-3 2xl:gap-4 mr-auto xl:ml-[10vw]">
        <CustomNavLink to="/" isActiveClass="underline ">
          Home
        </CustomNavLink>
        <CustomNavLink to="/article" isActiveClass="underline ">
          Article
        </CustomNavLink>
        <CustomNavLink to="/marketPlace" isActiveClass="underline ">
          MarketPlace
        </CustomNavLink>
      </div>

      <div className=" flex gap-[1vw] items-center justify-evenly  px-[.5vw] ">
        <UserManagement />
        {isSignedIn && (
          <NavLink
            to="/createblog"
            className={({ isActive }) =>
              ` px-3 py-[.35vh] rounded flex items-center justify-center border transition-colors ${
                isActive
                  ? "from-[#9dd394] to-[#5aa34d] text-white bg-gradient-to-t shadow-inner border-white "
                  : "hover:backdrop-blur-sm text-[#0D2035]  border-black/40"
              }`
            }
          >
            <span className=" flex gap-1 items-center justify-center">
              <PlusIcon size={17} /> Create{" "}
            </span>
          </NavLink>
        )}

        {isSignedIn && (
          <motion.div
            className=" py-[.35vh] font-WorkSans bg-black rounded border border-black/50"
            whileHover={{ backgroundColor: "rgb(0 0 0 / 0.85)" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <NavLink
              className="w-full flex gap-2 justify-center items-center text-white px-3 rounded"
              to="/cart"
            >
              <ShoppingCart size={17} />
              <div className=" opacity-90  "> Cart</div>
            </NavLink>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;

const CustomNavLink = ({ to, isActiveClass, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-[.2rem] rounded-xl transition-all ${
        isActive
          ? isActiveClass
          : "text-[#353535] border-transparent text-opacity-85 "
      }`
    }
  >
    {children}
  </NavLink>
);
