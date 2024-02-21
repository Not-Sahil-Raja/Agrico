import React from "react";
import { useState } from "react";

const ContactUs = () => {
  const [m1, setM1] = useState("");
  const [m2, setM2] = useState("");
  const [m3, setM3] = useState("");
  const [popstyle, setPopstyle] = useState(
    "absolute bottom-2 right-[5vh] origin-center [transform:translateX(-50%)] bg-black text-white text-xl w-fit px-4 h-fit py-2 rounded-xl opacity-0"
  );
  function clicked(e) {
    e.preventDefault();
    setPopstyle(
      "absolute bottom-2 right-[5vh] origin-center [transform:translateX(-50%)]  bg-black text-white text-xl w-fit px-4 h-fit py-2 rounded-xl animate-bounce"
    );
    setTimeout(() => {
      setPopstyle(
        "absolute bottom-2 right-[5vh] origin-center [transform:translateX(-50%)]  bg-black text-white text-xl w-fit px-4 h-fit py-2 rounded-xl opacity-0"
      );
    }, 1600);
    setM1("");
    setM2("");
    setM3("");
  }
  return (
    <div className=" bg-[#fffff2] w-full h-[100vh] pt-[10vh] select-none overflow-hidden">
      <div className="h-[80vh] w-[90%] m-auto relative flex items-center">
        <img
          className="absolute object-cover h-[80vh] w-[100%] brightness-50"
          src="https://images.unsplash.com/photo-1468253926858-331ac6e1e97f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          id="conimg"
        ></img>
        <div className="h-[80vh] w-[100vh] z-10 absolute">
          <div
            className="absolute top-6 left-8 text-3xl font-semibold text-white"
            id="contop"
          >
            AgriCo
          </div>
          <div
            className="absolute left-[20vh] top-[50%] [transform:translateY(-50%)] text-white font-bold text-6xl"
            id="contxt"
          >
            Have some suggestions?
            <br />
            We would love to listen
          </div>
          <div
            className="absolute bottom-6 left-8 text-xl font-semibold text-white"
            id="conmail"
          >
            agrico2024@gmail.com
          </div>
        </div>
        <form
          onSubmit={clicked}
          className="absolute right-24 bg-[#ebd7bda2] backdrop-blur-md h-[70vh] w-[55vh] rounded-md flex flex-col  justify-evenly items-center  "
          id="conform"
        >
          <div className=" w-full h-[50%] px-[2vw] flex flex-col gap-[4vh] font-Archivo">
            <div className="h-1/3 w-full  px-[1vw]">
              <span className=" font-semibold">Your name</span>
              <input
                className=" w-full  border-b-2 border-black bg-transparent text-black focus:outline-none focus:placeholder-transparent focus:bg-[#00000028] placeholder:text-black placeholder:font-semibold"
                value={m1}
                onChange={(e) => {
                  setM1(e.target.value);
                }}
                required:true
              />
            </div>
            <div className="h-1/3 w-full  px-[1vw]">
              <span className=" font-semibold">Your email</span>
              <input
                className=" w-full border-b-2 border-black bg-transparent text-black focus:outline-none focus:placeholder-transparent focus:bg-[#00000028] placeholder:text-black placeholder:font-semibold"
                value={m2}
                onChange={(e) => {
                  setM2(e.target.value);
                }}
                required:true
              />
            </div>
            <div className="h-1/3 w-full  px-[1vw]">
              <span className=" font-semibold">Tell us what you think</span>
              <input
                className="  w-full border-b-2 border-black bg-transparent text-black focus:outline-none focus:placeholder-transparent focus:bg-[#00000028] placeholder:text-black placeholder:font-semibold"
                value={m3}
                type="description"
                onChange={(e) => {
                  setM3(e.target.value);
                }}
                required:true
              />
            </div>
          </div>

          <div className=" h-[10%]  w-full flex justify-center items-center">
            <input
              type="submit"
              className="h-[5vh] cursor-pointer w-[50%] font-Archivo border-black border-2 rounded-3xl font-bold hover:bg-black hover:text-white transition-colors"
              id="consub"
              value="Send Feedback"
            />
          </div>
        </form>
        <div className={popstyle}>Feedback Sent</div>
      </div>
    </div>
  );
};

export default ContactUs;
