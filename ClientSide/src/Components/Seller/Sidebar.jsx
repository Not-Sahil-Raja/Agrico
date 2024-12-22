import React, { useEffect } from "react";
import {
  ShoppingCart,
  Package,
  BarChart2,
  Layers,
  ArrowLeft,
  UserCog2,
  PackagePlus,
} from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";

const Sidebar = ({ setActivePage, activePage }) => {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const menuItems = [
    { name: "Add Item", icon: PackagePlus, page: "additem" },
    { name: "Overview", icon: Layers, page: "overview" },
    { name: "Sales", icon: BarChart2, page: "sales" },
    { name: "Orders", icon: ShoppingCart, page: "orders" },
    { name: "Inventory", icon: Package, page: "inventory" },
    { name: "Account", icon: UserCog2, page: "account" },
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

  useEffect(() => {
    menuToggle
      ? AnimationControl.start("open")
      : AnimationControl.start("close");
  }, [menuToggle]);

  return (
    <motion.div
      className={` h-full shadow-md p-2 pt-4 flex flex-col gap-3 font-Archivo overflow-hidden`}
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
              ${index === 5 && "mt-auto"}
            `}
          onClick={() => setActivePage(item.page)}
        >
          <item.icon className="w-9 min-w-9 aspect-square" />
          <span className=" overflow-clip tracking-wide whitespace-nowrap min-w-0">
            {item.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default Sidebar;
