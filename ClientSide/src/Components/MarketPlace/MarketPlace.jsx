import React from "react";
import AllItems from "./AllItems";
import TopItems from "./TopItems";
import MarketPlaceHoroSection from "./MarketPlaceParts/MarketPlaceHoroSection";
import MarketPlaceRecomendation from "./MarketPlaceParts/MarketPlaceRecomendation";
import Footer from "../HomePage/FooterPage";

const MarketPlace = () => {
  return (
    <>
      <div className=" mt-20 selection:bg-[#3da13d] selection:text-white overflow-x-hidden">
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
