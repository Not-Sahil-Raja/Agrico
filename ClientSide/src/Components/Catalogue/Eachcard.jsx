import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

const Eachcard = () => {
  const location = useLocation();
  const [info, setInfo] = useState({});
  const [arr, setArr] = useState([]);
  // console.log(location.state.no);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/courses/${location.state.no}`)
      .then((res) => {
        setInfo(res.data);
      });
  }, []);
  // console.log(location.state.name);
  return (
    <div className=" bg-[#fffff2] w-full h-[100vh] select-none overflow-hidden">
      <div className=" w-full h-[90%] mt-[10vh] px-[1vw] py-[2vh] flex flex-evenly">
        <div className=" flex-1">
          {/* left side */}
          <div className=" h-full  mx-[1vw] flex flex-col px-[1vw] py-[2vh] gap-[2vh] overflow-y-scroll scrollbar-hide">
            <div className=" w-full h-[11%] flex border-[.1rem] bg-[#00000007] shadow-inner border-[#2929294f] px-[.5vw] rounded-xl justify-evenly items-center overflow-hidden">
              <div className="  w-[25%] h-full flex items-center justify-center">
                <CheckCircle2
                  size={36}
                  className=" drop-shadow-md rounded-full "
                  color="#fda744"
                />
              </div>
              <div className=" w-[65%] h-full  flex flex-col py-[1vh] justify-evenly font-Archivo px-[.5vw]">
                <span className=" text-sm flex items-end">Get Started</span>
                <span className=" text-lg font-semibold ">Introduction</span>
              </div>
              <div className=" w-[10%] h-full  flex justify-center items-center">
                <ChevronDown />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-[2.5] px-[1vw] py-[2vh]">
          {/* middle area */}
          <div className=" w-full h-full px-[2vw] py-[2vh] flex flex-col gap-[5vh]">
            <div className=" w-full h-[60%] bg-red-200 rounded-xl">
              <iframe
                src={info.link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className=" w-full h-full rounded-xl"
              />
            </div>
            <div className=" w-full h-[30%] border-[#2929294f] border flex flex-col justify-top items-center rounded-lg overflow-scroll px-8 font-Epilogue scrollbar-hide">
              <span className=" text-3xl font-Archivo font-semibold mt-[3vh]">
                Important Points
              </span>
              <br />
              <li>{info.point1}</li>
              <br />
              <li>{info.point2}</li>
              <br />
              <li>{info.point3}</li>
              <br />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className=" flex-1  h-full py-[4.5vh] px-[1vw] flex flex-col">
          <div className=" h-[30%] text-sm  font-Archivo  w-full border-[#2929294f] border rounded-lg mb-[3vh] flex flex-col px-[1vw] py-[2vh]">
            <div className=" flex-1 flex">
              <span className=" font-semibold">Lecture Type</span>
              <span className=" ml-auto pr-[.5vw]">Pre recorded</span>
            </div>
            <div className=" flex-1 flex">
              <span className=" font-semibold">Skills Levels</span>
              <span className=" ml-auto pr-[.5vw]">Beginner</span>
            </div>
            <div className=" flex-1 flex">
              <span className=" font-semibold">Duration</span>
              <span className=" ml-auto pr-[.5vw]">16 Hours</span>
            </div>
            <div className=" flex-1 flex">
              <span className=" font-semibold">Critique Session</span>
              <span className=" ml-auto pr-[.5vw]">Once a Week</span>
            </div>
          </div>
          <div className=" h-[70%] border-[#2929294f] border rounded-lg  py-[1vh] w-full">
            <div className=" px-[1.5vw] font-semibold border-b border-b-[#2929294f] h-[10%] pb-[.5vh] w-full">
              Overview
            </div>
            <div className=" px-[1.5vw] font-semibold text-2xl font-Archivo bg-[#ffffffab] shadow-inner py-[1vh] h-[20%] flex justify-center items-center">
              {location.state.name}
            </div>
            <div>
              <div className=" px-[1.5vw] py-[1.5vh] font-Archivo text-[#292929] h-[34.5vh] text-md text-ellipsis overflow-hidden">
                {info.data}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eachcard;

//  props{}
