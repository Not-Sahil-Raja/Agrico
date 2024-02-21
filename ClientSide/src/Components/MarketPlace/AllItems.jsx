import React, { useEffect, useState } from "react";
import TopPickCard from "./TopPickCard";
import axios from "axios";
import ItemCard from "./ItemCard";

const AllItems = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/itemsList")
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className=" h-[50%] flex flex-col ">
        <span className="ml-[.5vw] text-lg font-Archivo font-semibold">
          Best Items At Low Price
        </span>
        <div className=" text-lg font-Archivo flex gap-[1vw] h-[100vh] relative overflow-x-scroll scrollbar-hide py-[1%] px-[.5%]">
          <TopPickCard
            width={30}
            fsize={"lg"}
            imglinks={
              "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
            }
            itemsName={"Tomato"}
            price={"2000"}
            suppName={"Ganesh Traders"}
          />
          <TopPickCard
            width={20}
            fsize={"sm"}
            imglinks={
              "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3"
            }
            itemsName={"Wheat"}
            price={"800"}
            suppName={"Avi Traders"}
          />
          <TopPickCard
            width={20}
            fsize={"sm"}
            imglinks={
              " https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            itemsName={"Potato"}
            price={"500"}
            suppName={"Vegetable Market"}
          />
          <TopPickCard
            width={20}
            fsize={"sm"}
            imglinks={
              "https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            itemsName={"Carrot"}
            price={"600"}
            suppName={"Rajesh"}
          />
          <TopPickCard
            width={20}
            fsize={"sm"}
            imglinks={
              "https://images.unsplash.com/photo-1563635707628-9d39fd827e84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
            }
            itemsName={"Almond"}
            price={"3000"}
            suppName={"Dinesh Traders"}
          />
        </div>
      </div>
      <span className="ml-[.5vw] text-lg font-Archivo font-semibold  text-[#242424] ">
        All Items List
      </span>
      <div className=" h-fit w-full  grid grid-cols-5 gap-5 px-[1%] py-[2vh] row-auto ">
        {itemList.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default AllItems;
