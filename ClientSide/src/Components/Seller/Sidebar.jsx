import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  BarChart2,
  Layers,
  ArrowLeft,
  UserCog2,
  PackagePlus,
  LogOutIcon,
  LucideCircleEllipsis,
} from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { sellerLogout } from "../../Apps/sellerDetailsslice";

const Sidebar = ({ setActivePage, activePage }) => {
  const dispatch = useDispatch();
  const [menuToggle, setMenuToggle] = useState(false);
  const [sellerInfo, setSellerInfo] = useState({
    sellerLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
  });
  // { name: "Account", icon: UserCog2, page: "account" },
  const menuItems = [
    { name: "Add Item", icon: PackagePlus, page: "addProduct" },
    { name: "Overview", icon: Layers, page: "overview" },
    { name: "Sales", icon: BarChart2, page: "sales" },
    { name: "Orders", icon: ShoppingCart, page: "orders" },
    { name: "Inventory", icon: Package, page: "inventory" },
  ];

  const ContainersVariant = {
    open: {
      width: "18rem",
      transition: { type: "spring", damping: 15, duration: 0.35 },
    },
    close: {
      width: "4.2rem",
      transition: { type: "spring", damping: 15, duration: 0.35 },
    },
  };
  const AnimationControl = useAnimationControls();

  const sellerDetail = useSelector((state) => state.sellerDetail);

  useEffect(() => {
    setSellerInfo(sellerDetail.sellerDetails);
  }, [sellerDetail]);

  useEffect(() => {
    menuToggle
      ? AnimationControl.start("open")
      : AnimationControl.start("close");
  }, [menuToggle]);

  return (
    <motion.div
      className={`md:h-full h-[calc(100vh-4rem)] md:relative absolute z-10 md:bg-transparent bg-white shadow-md p-2 pt-4 flex flex-col gap-3 font-Archivo overflow-hidden`}
      variants={ContainersVariant}
      animate={AnimationControl}
      initial="open"
    >
      <div className=" flex justify-between items-center overflow-hidden">
        <motion.span
          className="text-xl font-semibold min-w-0 whitespace-nowrap "
          animate={{
            opacity: menuToggle ? 1 : 0,
            transition: {
              duration: 0.25,
              easings: [0.42, 0, 0.58, 1],
            },
          }}
        >
          Seller Dashboard
        </motion.span>

        <button
          className=" bg-neutral-200 h-full aspect-square rounded-full flex items-center justify-center z-10"
          onClick={() => setMenuToggle(!menuToggle)}
        >
          <motion.div
            animate={{ rotate: menuToggle ? 0 : 180 }}
            transition={{ type: "spring", damping: 15, duration: 0.35 }}
          >
            <ArrowLeft className=" w-12  min-w-12" />
          </motion.div>
        </button>
      </div>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-zinc-100
          ${
            activePage === item.page
              ? "bg-[#e6f0e0] text-green-700 hover:bg-[#eef5e9]"
              : " text-black"
          }
            `}
          onClick={() => setActivePage(item.page)}
        >
          <item.icon className="w-9 min-w-9 aspect-square" />
          <span className=" overflow-clip tracking-wide whitespace-nowrap min-w-0">
            {item.name}
          </span>
        </div>
      ))}

      <div
        className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-zinc-100 mt-auto border border-zinc-300
          ${
            activePage === "account"
              ? "bg-[#e6f0e0] text-green-700 hover:bg-[#e4f5da]"
              : " text-black"
          }`}
        onClick={() => setActivePage("account")}
      >
        {sellerInfo && sellerInfo.profilePic ? (
          <img
            src={sellerInfo.profilePic}
            className="w-9 min-w-9 aspect-square rounded-md object-cover"
          />
        ) : (
          <UserCog2 className="w-9 min-w-9 aspect-square" />
        )}
        <div className=" min-w-0 flex flex-col">
          <span className=" overflow-clip tracking-wide leading-tight whitespace-nowrap min-w-0 font-semibold">
            {sellerInfo.firstName + sellerInfo.lastName}
          </span>

          <span className=" overflow-clip tracking-wide leading-tight whitespace-nowrap min-w-0 text-xs text-current/75">
            {sellerInfo.email}
          </span>
        </div>
        <LucideCircleEllipsis
          className={`  ml-auto w-9 min-w-9 aspect-square ${
            activePage === "account" ? "text-green-600" : "text-black/65"
          }`}
        />
      </div>

      <div
        className=" w-full py-2 text-stone-50 border border-stone-900 bg-stone-700 hover:bg-stone-600 flex items-center gap-3 p-2 rounded cursor-pointer"
        onClick={() => dispatch(sellerLogout())}
      >
        <LogOutIcon className=" w-9 min-w-9 aspect-square" />
        <span className=" overflow-clip tracking-wide whitespace-nowrap min-w-0">
          Logout
        </span>
      </div>
    </motion.div>
  );
};

export default Sidebar;
