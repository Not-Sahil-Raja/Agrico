import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ItemCard from "../MarketPlaceCard/ItemCard";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const MarketPlaceRecomendation = () => {
  const { getToken } = useAuth();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    fetchRecomendedProducts();
  }, []);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [recommendedProducts]);

  const fetchRecomendedProducts = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/product/all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecommendedProducts((prevProducts) => {
          const duplicatedProducts = [];
          for (let i = 0; i < 10; i++) {
            duplicatedProducts.push(...res.data);
          }
          return duplicatedProducts;
        });
      })
      .catch((err) => console.log(err));
  };

  const nextSlide = () => {
    if (currentIndex < recommendedProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      controls.start({ x: -(currentIndex + 1) * 380 });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      controls.start({ x: -(currentIndex - 1) * 380 });
    }
  };

  return (
    <div className="h-fit flex flex-col relative pt-10 font-Archivo bg-stone-100">
      <div className="flex justify-between mb-4">
        <div className="text-xl font-semibold flex flex-col px-8 justify-center">
          <span className="text-3xl flex items-end">
            Explore our recommendations
          </span>
          <span className="opacity-70 font-normal text-base">
            Here are some products we think you'll love.
          </span>
        </div>
        <div className="gap-2 flex mr-24">
          <button
            className="bg-stone-200 hover:bg-stone-300/70 disabled:opacity-60 active:scale-95 transition-all duration-300 aspect-square flex items-center justify-center h-fit p-1 rounded"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ArrowLeft />
          </button>
          <button
            className="bg-stone-200 hover:bg-stone-300/70 disabled:opacity-60 active:scale-95 transition-all duration-300 aspect-square flex items-center justify-center h-fit p-1 rounded"
            onClick={nextSlide}
            disabled={currentIndex === recommendedProducts.length - 1}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="w-[99svw] overflow-hidden">
        <motion.div
          ref={carousel}
          className="flex gap-2 px-8 mb-4"
          animate={controls}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          transition={{ type: "spring", stiffness: 180, damping: 30 }}
        >
          {recommendedProducts.map((item, index) => (
            <motion.div key={index} className="min-w-[380px] p-2">
              <ItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketPlaceRecomendation;
