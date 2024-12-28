import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Plus, Tag, X } from "lucide-react";
import BlogPreview from "./BlogPreview";
import axios from "axios";
import { BlogSubmissionToast } from "./BlogSubmissionToast";
import { AnimatePresence } from "framer-motion";
import { BlogSubmissionFailedToast } from "./BlogSubmissionFailedToast";

import { useAuth } from "@clerk/clerk-react";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [image, setImage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const { getToken } = useAuth();

  // * Adding the article or blog to DB
  const blogCreateHandler = async () => {
    const token = await getToken();

    setIsLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("username", "username");
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("category", "lesson");

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    axios
      .post(`${import.meta.env.VITE_SERVER}/lesson/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResponse(true);
        setTitle("");
        setShortDescription("");
        setDescription("");
        setTags([]);
        setCurrentTag("");
        setImage([]);
      })
      .catch((err) => {
        setResponse(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setResponse(null);
        }, 5000);
      });
  };

  return (
    <div className="w-full h-fit md:min-h-svh bg-gradient-to-r from-zinc-100 via-gray-300 to-zinc-300 pt-[9vh] pb-[3vh] gap-2 flex md:flex-row flex-col relative">
      <div>
        <AnimatePresence>
          {response === true && <BlogSubmissionToast />}
          {response === false && <BlogSubmissionFailedToast />}
        </AnimatePresence>
      </div>

      <div
        className={` flex-[1.5] md:max-w-[50vw] ${
          isLoading && "pointer-events-none"
        }`}
      >
        <div className=" bg-white md:ml-10 md:mr-3 mx-3 rounded-md h-fit 2xl:ml-[10vw] font-Archivo">
          <h1 className=" font-Archivo text-xl text-center pt-2 mb-2 pb-2 border-b">
            Create Blog
          </h1>
          <div className="md:px-5 px-1 py-3 flex flex-col gap-3">
            <div className=" border px-3 py-2 rounded-xl">
              <label className=" uppercase font-semibold text-black/85">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-1 px-3 mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className=" border px-3 py-2 rounded-xl">
              <label className=" uppercase font-semibold text-black/85">
                Short Description
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-1 px-3 mt-1"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                minLength={50}
                maxLength={150}
                required
              />
              <p className=" pl-4 text-sm font-semibold text-[#686880] select-none py-1">
                ** Short description should be between 50 to 150 characters. ({" "}
                {shortDescription.length}/150 )
              </p>
            </div>
            <div className=" border px-3 py-2 rounded-xl ">
              <label className=" uppercase font-semibold text-black/85 ">
                Description
              </label>
              <ReactQuill
                theme="snow"
                description={description}
                onChange={setDescription}
                className=" min-h-1/2"
                modules={modules}
                formats={formats}
                value={description}
              />
            </div>
            <div className="border px-3 py-2 rounded-xl">
              <label className="uppercase font-semibold text-black/85 ">
                tags
              </label>
              <div className=" flex justify-center items-center border border-gray-300 rounded-md px-4 py-1 gap-2 mt-2">
                <Tag size={18} className=" text-[#56aa56]" fill="#3f723f" />
                <input
                  type="text"
                  placeholder="Add Your Tags"
                  className="w-full placeholder:opacity-100 placeholder:font-semibold placeholder:text-[#496149] outline-none"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                />
                <button
                  className="bg-[#4e7e42] text-white px-2 py-1 rounded-md flex gap-2 items-center justify-center font-semibold border disabled:bg-[#e9e9e9] disabled:text-stone-900 disabled:border-stone-300 transition-all"
                  onClick={() => {
                    setTags([...tags, currentTag]);
                    setCurrentTag("");
                  }}
                  disabled={
                    currentTag.length === 0 ||
                    tags.includes(currentTag) ||
                    tags.length >= 4
                  }
                >
                  Add <Plus size={18} />
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#61704e] text-white border border-[#a4bb87] px-3 py-1 rounded-md flex gap-1 items-center justify-center"
                  >
                    {tag}
                    <button
                      onClick={() => {
                        setTags(tags.filter((t) => t !== tag));
                      }}
                      className=" bg-white/10 border border-white/50  rounded-full"
                    >
                      <X size={18} className="leading-none" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-col gap-1 border px-3 py-2 rounded-xl">
              <label className="uppercase font-semibold text-black/85">
                ADD Images
              </label>
              <div className=" flex gap-2 flex-wrap">
                <label
                  htmlFor="file"
                  className={`w-32 h-32 bg-black/5 border border-dotted border-black/10 rounded-md flex items-center justify-center ${
                    image.length >= 3 ? "cursor-not-allowed" : "cursor-pointer"
                  } `}
                >
                  <input
                    type="file"
                    id="file"
                    className=" hidden w-full h-full disabled:cursor-not-allowed peer"
                    onChange={(e) => {
                      const files = e.target.files;
                      setImage([...image, ...files]);
                    }}
                    disabled={image.length >= 3}
                  />
                  <Plus
                    size={20}
                    className="text-black/80 peer-disabled:text-black/20 font-bold"
                  />
                </label>
                {image.map((img, index) => (
                  <div key={index} className="flex gap-2 items-center relative">
                    <img
                      src={img && img.name ? URL.createObjectURL(img) : img}
                      alt="image"
                      className="w-32 aspect-square object-cover rounded-md"
                    />
                    <button
                      className="bg-red-500 border border-red-700 text-white p-1 rounded-full aspect-square absolute top-[2%] right-[2%]"
                      onClick={() => {
                        setImage(image.filter((i) => i !== img));
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" px-7 py-2 flex justify-end ">
            <button
              className="w-fit bg-[#BFE459] disabled:opacity-65 border border-stone-500 text-stone-900 shadow-md py-2 px-4 rounded-md font-medium mb-4"
              onClick={blogCreateHandler}
              disabled={
                isLoading ||
                title.length === 0 ||
                shortDescription.length === 0 ||
                description.length === 0 ||
                tags.length === 0 ||
                image.length === 0
              }
            >
              {
                // eslint-disable-next-line no-nested-ternary
                isLoading
                  ? "Creating..."
                  : response
                  ? "Blog Created"
                  : "Create Blog"
              }
            </button>
          </div>
        </div>
      </div>
      <div className="md:max-w-[45vw] overflow-hidden flex-1 bg-white rounded md:mr-10 mx-2 px-5 py-5">
        <h1 className=" font-Archivo text-xl text-center mb-2 pb-2 border-b">
          Preview Article
        </h1>
        <BlogPreview
          title={title}
          shortDescription={shortDescription}
          description={description}
          tags={tags}
          image={image}
        />
      </div>
    </div>
  );
};

export default CreateBlogPage;
