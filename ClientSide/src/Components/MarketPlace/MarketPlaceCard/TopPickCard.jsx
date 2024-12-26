import React, { useState } from "react";
import { motion } from "framer-motion";

const TopPickCard = ({ imglinks, itemsName, price, suppName, index }) => {
  const [hvr, setHvr] = useState(false);
  return (
    <div className=" flex flex-col rounded-md overflow-hidden bg-white shadow">
      <div className="aspect-square  relative w-full">
        <p className=" absolute left-2 top-3 z-[1] bg-white shadow px-2 py-1 rounded-xl text-xs">
          {"#" + (index + 1)} Best Seller
        </p>
        <img
          src={imglinks}
          alt=""
          className=" aspect-square object-cover absolute"
        />
      </div>
      <div className=" mt-2 flex-col leading-none px-2 py-2">
        <h4 className=" py-1 text-xl font-semibold leading-none">
          {itemsName}
        </h4>
        <h6 className=" text-md text-black/85 mb-2">{suppName}</h6>
        <div className=" flex w-full justify-between items-center mb-2">
          <p className=" overflow-hidden overflow-ellipsis line-clamp-1">
            {"its a basic item description"}
          </p>
          <p className=" px-3 text-lg font-semibold">₹{price}</p>
        </div>
        <button className="mt-2 flex items-center justify-center rounded w-full px-2 py-2 bg-black text-white shadow-lg transform transition-transform duration-300  hover:shadow-xl">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default TopPickCard;
