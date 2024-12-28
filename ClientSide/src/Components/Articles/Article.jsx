import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import ArticleCard from "./ArticleCard";
import PopularArticle from "./PopularArticle";
import Footer from "../HomePage/FooterPage";

function Article() {
  const { getToken } = useAuth();
  const deb = useRef(null);

  const [latestArticle, setLatestArticle] = useState([]);

  // * Fetch all the artciles from backend
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      axios
        .get(`${import.meta.env.VITE_SERVER}/lesson/getLessons`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLatestArticle(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [getToken]);

  return (
    <>
      <div
        className="w-screen h-screen flex items-center justify-center overflow-x-hidden bg-cover bg-[#fffff2]"
        ref={deb}
      >
        <div className=" w-full h-full pt-[9vh]  ">
          <div className=" w-full flex flex-col">
            {/* Popular Article Section */}
            <div className=" flex flex-col md:h-[100svh] h-fit lg:px-20 md:px-10 px-3">
              <div className="   flex flex-col text-[#242323] whitespace-nowrap font-Archivo py-1">
                <span className="font-medium text-3xl text-[#242424] leading-none">
                  Popular Article
                </span>
                <span className=" text-lg text-[#505050]">
                  Try out our most popular courses !
                </span>
              </div>
              <div className=" overflow-hidden  py-2">
                <PopularArticle />
              </div>
            </div>

            {/* Latest Article Section */}
            <div className=" w-full h-fit md:my-7 my-4 lg:px-20 md:px-10 px-3">
              <div className=" flex flex-col text-[#242323] whitespace-nowrap  py-1 mb-6">
                <span className=" font-medium text-3xl text-[#242424] leading-none">
                  Latest Articles
                </span>
                <span className=" text-lg text-[#505050]">
                  Explore our latest articles
                </span>
              </div>
              {latestArticle.length > 0 ? (
                <div className=" grid 2xl:grid-cols-4 lg:grid-cols-3  sm:grid-cols-2 md:gap-3 2xl:gap-5 place-items-stretch">
                  {latestArticle.map((item, index) => (
                    <ArticleCard ArticleData={item} key={index} />
                  ))}
                </div>
              ) : (
                <div className=" h-[20vh] w-full flex items-center justify-center  shadow-inner  rounded">
                  <span className=" animate-pulse font-medium">
                    Wait a moment...
                  </span>
                </div>
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
