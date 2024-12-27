import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusIcon, ShoppingBagIcon } from "lucide-react";
import AgricoLogo from "./AgricoLogo.jsx";
import UserManagement from "./UserManagement.jsx";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="  bg-[#ffffffd3] backdrop-blur-md px-[3vw] lg:py-2 2xl:py-1 fixed top-0 z-50 w-screen text-lg font-Archivo text-[#2b1c1c] flex  items-center gap-[5vw] drop-shadow-md ">
      <div className=" w-fit  h-[5.8vh]  rounded-2xl px-[1vw] flex justify-center items-center  ">
        <AgricoLogo />
      </div>

      <div className=" py-1 text-base flex justify-around w-fit lg:gap-1 xl:gap-3 2xl:gap-4 mr-auto xl:ml-[10vw]">
        <CustomNavLink to="/" isActiveClass="underline ">
          Home
        </CustomNavLink>
        {isSignedIn && (
          <>
            <CustomNavLink to="/article" isActiveClass="underline ">
              Article
            </CustomNavLink>
            <CustomNavLink to="/marketPlace" isActiveClass="underline ">
              MarketPlace
            </CustomNavLink>
            <CustomNavLink to="/sellerDashboard" isActiveClass="underline ">
              Seller Dashboard
            </CustomNavLink>
          </>
        )}
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
        {!isSignedIn && (
          <p className=" mr-10 bg-yellow-200/70 px-2 py-1 rounded">
            Please sign in to get started !
          </p>
        )}
        {isSignedIn && (
          <NavLink
            className={({ isActive }) =>
              `flex gap-2 justify-center relative items-center p-2 bg-stone-200 border border-stone-300 rounded transition-all duration-300 ${
                isActive && "bg-stone-600 text-white"
              } `
            }
            to="/cart"
          >
            <ShoppingBagIcon size={17} />
            {cartItems.length > 0 && (
              <div className=" absolute  bg-red-500 top-[-22%] right-[-22%] text-white text-xs h-5 w-5 flex items-center justify-center rounded-full aspect-square">
                {cartItems && cartItems.length}
              </div>
            )}
          </NavLink>
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
