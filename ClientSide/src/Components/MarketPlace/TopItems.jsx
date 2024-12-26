import React, { useEffect, useState } from "react";
import TopPickCard from "./MarketPlaceCard/TopPickCard";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence } from "framer-motion";
import ShowCurrentState from "./ShowCurrentState";

const TopItems = () => {
  const { getToken } = useAuth();
  const [topItemsList, setTopItemsList] = useState([]);
  const [currentFetchingState, setCurrentFetchState] = useState("");

  // * Fetch all  the best selling products
  const fetchTopItems = async () => {
    const token = await getToken();
    setCurrentFetchState("loading");
    axios
      .get(`${import.meta.env.VITE_SERVER}/product/best-selling-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTopItemsList(res.data);
        if (res.data.length <= 0) setCurrentFetchState("empty");
        else setCurrentFetchState("");
      })
      .catch((err) => {
        setCurrentFetchState("error");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTopItems();
  }, []);

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
        {/* Render the best selling products */}
        <div className="h-fit py-[1%] px-[2%] grid grid-cols-5 gap-2">
          <AnimatePresence>
            {topItemsList.length > 0 ? (
              topItemsList.map((product, index) => (
                <TopPickCard key={index} index={index} product={product} />
              ))
            ) : (
              <ShowCurrentState currentState={currentFetchingState} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default TopItems;
