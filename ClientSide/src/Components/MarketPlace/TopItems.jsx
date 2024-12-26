import React, { useState } from "react";
import TopPickCard from "./MarketPlaceCard/TopPickCard";
import { motion } from "framer-motion";

const TopItems = () => {
  const [topItemsList, settopItemsList] = useState([
    {
      imglinks:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      itemsName: "Tomato",
      price: "2000",
      suppName: "Ganesh Traders",
    },
    {
      imglinks:
        "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3",
      itemsName: "Wheat",
      price: "800",
      suppName: "Avi Traders",
    },
    {
      imglinks:
        " https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      itemsName: "Potato",
      price: "500",
      suppName: "Vegetable Market",
    },
    {
      imglinks:
        "https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      itemsName: "Carrot",
      price: "600",
      suppName: "Rajesh",
    },
    {
      imglinks:
        "https://images.unsplash.com/photo-1563635707628-9d39fd827e84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      itemsName: "Almond",
      price: "3000",
      suppName: "Dinesh Traders",
    },
  ]);
  return (
    <>
      <div className=" w-full h-fit font-Archivo mt-5 pt-5 flex flex-col justify-around overflow-hidden bg-stone-100">
        <div className="flex flex-col justify-center px-8 ">
          <h3 className="text-3xl flex items-end leading-none pl-1 font-semibold">
            Best Selling Products
          </h3>
          <h6 className=" opacity-80 font-normal text-base text-black/85 pl-1">
            Best quality, unbeatable prices. Direct from farmers to you.
          </h6>
        </div>
        <div className="h-fit py-[1%] px-[2%] grid grid-cols-5 gap-2">
          {topItemsList.map((item, index) => (
            <TopPickCard
              key={index}
              index={index}
              width={20}
              fsize="sm"
              imglinks={item.imglinks}
              itemsName={item.itemsName}
              price={item.price}
              suppName={item.suppName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopItems;
