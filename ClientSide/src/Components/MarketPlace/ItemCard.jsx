import React from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Apps/cartSlice.js";

const ItemCard = ({ item }) => {
  const Dispatch = useDispatch();
  item = { ...item, cartadd: false };
  const addCartItem = () => {
    Dispatch(addToCart(item));
    console.log("Added to Cart", item._id);
  };
  return (
    <div className="  h-[30vh] text-sm  bg-[#fffffff6] rounded-lg flex flex-col justify-between items-center px-[2%] font-Montserrat font-semibold relative">
      <img
        src="https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={item.itemName + ".img"}
        className=" w-full h-full object-cover rounded-lg absolute z-10 brightness-90"
      />

      <div className=" font-semibold w-[50%] px-[2%] py-[3%] text-center bg-[#1d1d1d48] rounded-lg shadow-inner text-ellipsis top-[5%]  whitespace-nowrap overflow-hidden shadow-text absolute z-20 backdrop-blur-sm text-[#f3f3f3] border  ">
        {item.itemName}
      </div>
      <div className=" flex flex-col items-end border whitespace-nowrap bottom-[5%] right-[5%] text-[#f3f3f3] absolute z-20 font-semibold shadow-text  px-[1vw] py-[.5%] rounded   drop-shadow-md backdrop-blur-md">
        <span>{item.price} ₹</span>
        <span>{item.quantity} Kg</span>
      </div>

      <div
        className=" flex  justify-center items-center bg-[#0000009f] border aspect-square whitespace-nowrap bottom-[5%] left-[5%] text-[#f3f3f3] absolute z-20 font-semibold shadow-text px-[.2vw]  rounded hover:bg-black transition-all drop-shadow-md backdrop-blur-md cursor-pointer"
        onClick={addCartItem}
      >
        <ShoppingBag
          size={20}
          color="#fffafa"
          className=" hover:scale-90 transition-all"
        />
      </div>
    </div>
  );
};

export default ItemCard;
