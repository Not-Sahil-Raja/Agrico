import React, { useEffect, useState } from "react";
import TopPickCard from "./TopPickCard";
import axios from "axios";
import ItemCard from "./ItemCard";
import { motion } from "framer-motion";
import ShowDet from "./ShowDet";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const AllItems = () => {
  const { getToken } = useAuth();
  const [itemList, setItemList] = useState([]);

  const fetchProducts = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/product/all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProducts();

  return (
    <>
      <div className=" h-fit flex flex-col relative  ">
        {itemList.length > 0 ? (
          <>
            <div className=" text-xl font-Manrope font-semibold h-[20vh] flex flex-col px-[2%] justify-center">
              <span className="h-2/3 text-3xl flex items-end">
                Buy AnyThing You Want
              </span>
              <div className=" h-1/3 flex items-center ">
                <span className=" opacity-70 text-base">
                  Get the Best Quality Products at Best Prices
                </span>
              </div>
            </div>
            <motion.div
              className=" h-fit w-full  grid grid-cols-5 2xl:grid-cols-6 gap-5 px-[2%] py-[2vh] row-auto "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {itemList.map((item, index) => (
                <ItemCard key={index} item={item} />
              ))}
            </motion.div>
          </>
        ) : (
          <>
            <div className=" h-[50vh] flex justify-center items-center   ">
              <div className="  w-16 h-12 flex justify-center items-center">
                <motion.div
                  className=" "
                  initial={{ rotate: 0, opacity: 1 }}
                  animate={{ rotate: 360, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                >
                  <Loader size={30} />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllItems;
