import React from "react";
import { NavLink } from "react-router-dom";

const ArticleCard = ({ ArticleData, index }) => {
  return (
    <NavLink
      key={index}
      className="md:px-2 py-4 flex justify-center font-Archivo"
      to={`/article/${ArticleData._id}`}
    >
      <div className=" flex flex-col gap-2 justify-start sm:w-96 w-ful">
        <img
          src={ArticleData.image[0]}
          alt={ArticleData.title ? ArticleData.title : "Article Image"}
          className=" w-full aspect-square object-cover "
        />
        <div className=" text-black/65 font-semibold">
          {ArticleData.createdAt
            ? new Date(ArticleData.createdAt).toDateString()
            : "Date"}
        </div>
        <div className=" text-xl font-bold line-clamp-1">
          {ArticleData.title ? ArticleData.title : "Title"}
        </div>
        <div className=" line-clamp-2 text-black/85">
          {ArticleData.shortDescription
            ? ArticleData.shortDescription
            : "Description"}
        </div>
      </div>
    </NavLink>
  );
};

export default ArticleCard;
