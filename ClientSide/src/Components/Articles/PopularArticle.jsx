import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const PopularArticle = () => {
  const [popularArticle, setPopularArticle] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPopularArticle = async () => {
      const token = await getToken();
      axios
        .get(`${import.meta.env.VITE_SERVER}/lesson/PopularArticles`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPopularArticle(res.data);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPopularArticle();
  }, []);

  return popularArticle.length > 0 ? (
    <div className=" flex h-[90%] gap-2 2xl:gap-5 justify-stretch">
      <NavLink
        className=" flex font-Archivo flex-col min-w-[40vw]"
        to={`/article/${popularArticle[0]._id}`}
      >
        <img
          src={popularArticle[0].image[0] ? popularArticle[0].image[0] : ""}
          className=" aspect-square h-4/5 object-cover "
        />
        <div className=" text-black/65 font-medium my-2">
          {popularArticle[0].createdAt
            ? new Date(popularArticle[0].createdAt).toDateString()
            : "Date"}
        </div>
        <div className=" text-2xl font-bold mb-3">
          {popularArticle[0].title ? popularArticle[0].title : "Title"}
        </div>
        <div className=" text-black/85 line-clamp-3">
          {popularArticle[0].shortDescription
            ? popularArticle[0].shortDescription
            : "Description"}
        </div>
      </NavLink>
      <div className=" grow  flex flex-col gap-2 justify-stretch font-Archivo">
        {popularArticle.slice(1).map((article, index) => (
          <NavLink
            key={index}
            className="flex grow gap-2 "
            to={`/article/${article._id}`}
          >
            <img
              src={article.image[0]}
              className=" w-40 h-40 2xl:w-60 2xl:h-60 object-cover"
            />
            <div className="flex flex-col h-full pl-1 pr-4 py-2 ">
              <div className="text-black/65 font-medium">
                {article.createdAt
                  ? new Date(article.createdAt).toDateString()
                  : "Date"}
              </div>
              <div className="text-2xl font-bold line-clamp-1 mb-1">
                {article.title ? article.title : "Title"}
              </div>
              <div className="text-black/85 line-clamp-3">
                {article.shortDescription
                  ? article.shortDescription
                  : "Description"}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  ) : (
    <div className=" h-[20vh] w-full flex items-center justify-center  shadow-inner  rounded font-Archivo">
      <span className=" animate-pulse font-medium">Wait a moment...</span>
    </div>
  );
};

export default PopularArticle;
