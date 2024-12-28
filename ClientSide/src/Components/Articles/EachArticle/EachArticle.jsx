import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const EachArticle = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [articleData, setArticleData] = useState({});

  // Fetching the article data from the server
  const fetchArticle = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/lesson/getLesson/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setArticleData(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  // Destructuring the article data
  const {
    title = "",
    shortDescription = "",
    description = "",
    tags = [],
    image = [],
    createdAt = "",
    username = "",
  } = articleData;

  return (
    <div className=" pt-20">
      <div className=" flex flex-col pb-10 2xl:px-52 lg:px-40 sm:px-10 px-3 selection:bg-[#a6bb6d] selection:text-white">
        <NavLink
          to="/article"
          className="text-black/70 font-Archivo hover:underline underline-offset-1"
        >
          {"< Back to Articles"}
        </NavLink>
        <div className=" my-3 justify-center items-center flex gap-2">
          {tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-[#f6fae5] text-[#393f35] shadow rounded-xl"
                >
                  <span className="text-sm font-semibold">{tag}</span>
                </div>
              ))}
            </div>
          )}
          <div className="text-black/65 font-medium font-Archivo">
            {createdAt ? new Date(createdAt).toDateString() : ""}
          </div>
        </div>
        <div className=" mb-3">
          {title.length > 0 && (
            <h1 className="text-4xl py-2 md:px-20 px-2 text-center text-wrap overflow-hidden font-Archivo font-semibold text-black/85 ">
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2 mb-2 text-lg justify-center font-Archivo text-black/70  w-full">
          Written by {username ? username : "Author"}
        </div>
        <div
          className="text-lg text-black/65 font-medium font-Archivo text-center"
          style={{ whiteSpace: "pre-line" }}
        >
          {shortDescription}
        </div>

        <div className=" my-4">
          {image[0] && (
            <img
              src={image[0].name ? URL.createObjectURL(image[0]) : image[0]}
              alt={`${title.length > 0 ? title : "blog"} cover image`}
              className="w-full max-h-[50vh] object-cover rounded aspect-video"
            />
          )}
        </div>

        <div className=" mt-6">
          {/* the prose class is used to style the description text in the preview and going to style that later */}
          {description && (
            <article
              dangerouslySetInnerHTML={{ __html: description }}
              className="prose prose-p:m-0 prose-headings:m-0 prose-headings:mb-1 prose-li:text-lg prose-li:font-semibold marker:font-bold marker:text-black prose-li:text-black prose-a:text-blue-700 overflow-hidden break-words leading-tight font-NunitoSans text-wrap max-w-full"
            />
          )}
        </div>
        <div className=" flex gap-1">
          {image.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title.length > 0 ? title : "blog"} cover image`}
              className="w-1/2 h-48 object-cover rounded my-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EachArticle;
