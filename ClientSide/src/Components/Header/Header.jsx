import React from "react";
import { UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userlogout } from "../../Apps/userInfoslice.js";
import { ShoppingCart } from "lucide-react";
// import Agrico_logo from "../../Images/Agrico_logo.png";

const Header = () => {
  const Dispatch = useDispatch();
  const logout = () => {
    Dispatch(userlogout());
    console.log("loggged Out");
  };

  const userDet = useSelector((state) => state.userInfo.userInfo);
  // console.log(userDet);
  return (
    <div className="  mt-[.75vh]  px-[3vw] py-[.5vh] absolute w-full flex font-Archivo text-lg text-[#2b1c1c] font-[570] justify-around items-center drop-shadow-md gap-[5vw] z-50">
      <div className="  w-[10vw] bg-[#fdcb749c] h-[5.8vh] mr-auto rounded-2xl px-[1vw] flex  justify-evenly items-center shadow-inner backdrop-blur-xl ">
        <Link className=" py-[.5vh]  px-[.35vw] text-center flex-1 ">
          {/* <img src={Agrico_logo} alt="" /> */}
          <span className=" text-2xl  font-semibold font-Syne">AgriCo</span>
        </Link>
        {/* <div className=" text-lg mr-auto flex-[3] text-center whitespace-nowrap">
          AgriCo
        </div> */}
      </div>

      <div className=" py-[.75vh] bg-[#f8bf5cd7] flex justify-around w-[35vw] backdrop-blur-3xl rounded-lg ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` px-[1.5vw] py-[.35vh] rounded-[0.5vw] transition-all${
              isActive
                ? "  bg-[#c7923685] shadow-inner"
                : " text-[#353535] border-transparent hover:backdrop-blur-sm"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catlg"
          className={({ isActive }) =>
            `  px-[1.5vw] py-[.35vh] rounded-[0.5vw]  ${
              isActive
                ? "bg-[#c7923685] shadow-inner"
                : "text-[#353535] border-transparent hover:backdrop-blur-sm"
            }`
          }
        >
          Catalogue
        </NavLink>
        <NavLink
          to="/marketPlace"
          className={({ isActive }) =>
            `  px-[1.5vw] py-[.35vh] rounded-[0.5vw]  ${
              isActive
                ? "bg-[#c7923685] shadow-inner"
                : "text-[#353535] border-transparent hover:backdrop-blur-sm"
            }`
          }
        >
          MarketPlace
        </NavLink>
      </div>
      <div className=" flex gap-[1vw] items-center">
        <NavLink
          className={() =>
            `w-[22%] h-[4vh] flex justify-center items-center rounded bg-[#dbdbdbdc] overflow-hidden cursor-pointer border border-oliveGreen hover:bg-oliveGreen transition-all hover:text-[white]`
          }
          to="/cart"
        >
          <ShoppingCart className=" aspect-square   w-full h-[4vh] p-[.8vh] " />
        </NavLink>

        <span className="  overflow-hidden text-white hover:brightness-90 w-[6vw] h-[5vh] relative flex items-center justify-center rounded-sm cursor-pointer transition-all">
          <button
            className={`top-1/2 left-1/2 bg-[#b35e5e] absolute transition-transform w-full h-full flex items-center justify-center  ${
              userDet.username
                ? " [transform:translate(-50%,-50%)]"
                : "[transform:translate(-200%,-50%)]"
            }`}
            onClick={logout}
          >
            {userDet.show}
          </button>
          <NavLink
            to="/login"
            className={() =>
              ` top-1/2 left-1/2 bg-oliveGreen absolute transition-transform  w-full h-full flex items-center justify-center  ${
                userDet.username
                  ? "[transform:translate(100%,-50%)]"
                  : "[transform:translate(-50%,-50%)]"
              }`
            }
          >
            Login
          </NavLink>
        </span>

        <UserRound className=" aspect-square bg-[#e6e6e6fb] drop-shadow shadow-inner text-[#353535] hover:backdrop-blur-sm rounded-[50%] transition-all cursor-pointer p-1 scale-110 hover:scale-125" />
      </div>
    </div>
  );
};

export default Header;
