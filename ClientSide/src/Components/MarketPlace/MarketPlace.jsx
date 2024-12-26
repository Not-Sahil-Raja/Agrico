import React from "react";
import { useState } from "react";
import AllItems from "./AllItems";
import { useSelector } from "react-redux";
import TopItems from "./TopItems";
import { motion } from "framer-motion";
import MarketPlaceHoroSection from "./MarketPlaceParts/MarketPlaceHoroSection";
import MarketPlaceRecomendation from "./MarketPlaceParts/MarketPlaceRecomendation";
import Footer from "../HomePage/FooterPage";

const MarketPlace = () => {
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_SERVER}/itemsList`)
  //     .then((res) => {
  //       setAddedItemList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [refresh]);
  const PopUp = useSelector((state) => state.itemPopUp.PopUp);

  return (
    <>
      <div className=" mt-14">
        <MarketPlaceHoroSection />
        <TopItems />
        <AllItems />
        <MarketPlaceRecomendation />
        <Footer />
      </div>
    </>
  );
};

export default MarketPlace;
