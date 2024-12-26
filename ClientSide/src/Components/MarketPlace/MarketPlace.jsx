import React from "react";
import AllItems from "./AllItems";
import TopItems from "./TopItems";
import MarketPlaceHoroSection from "./MarketPlaceParts/MarketPlaceHoroSection";
import MarketPlaceRecomendation from "./MarketPlaceParts/MarketPlaceRecomendation";
import Footer from "../HomePage/FooterPage";

const MarketPlace = () => {
  return (
    <>
      <div className=" mt-16">
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
