import React from "react";
import { Globe, Sun } from "lucide-react";

function AboutUs() {
  return (
    <>
      <section className="w-screen bg-[#fffff2] py-[3vh] px-[2vw] grid h-screen place-items-center">
        <div className=" w-full h-full  flex flex-col">
          <div className=" h-1/3  text-5xl font-Archivo flex flex-col justify-end pb-[5vh] pl-[2vw] relative">
            <span id="abttxt1">Planting seeds today </span>
            <p id="abttxt2" className=" pt-[.8vh]">
              for a{" "}
              <span
                id="abttxthigh"
                className=" bg-[#74c274] px-[.5vw] py-[.2vh] drop-shadow rounded-2xl"
              >
                greener
              </span>{" "}
              tomorrow
            </p>
            <span
              className="absolute top-[40%] right-[10%]  px-[1vw]"
              id="abtright"
            >
              About Us
            </span>
          </div>
          <div className=" h-2/3  flex px-[1vw] py-[3vh] gap-[3vw]">
            <div
              className=" flex-1 h-full bg-[#599259] rounded-2xl relative shadow-inner "
              id="card1"
            >
              <div className=" w-[10vw] h-[17vh] z-[0] bg-[#ffffff73] absolute rounded-full bottom-[-1vh] left-[-7vw] ">
                {""}
              </div>
              <div className=" absolute h-full w-full  px-[2vw] py-[5vh]">
                <div className=" w-full h-full rounded-2xl flex">
                  <div className=" font-Archivo ml-auto w-full whitespace-break-spaces text-[2.5vh]">
                    Our story is one of passion, perseverance, and a commitment
                    to sustainability. Our goal is to create a platform that
                    connects people who are passionate about sustainability with
                    the resources they need to make a difference. We believe
                    that by working together.
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" flex-1 h-full bg-[#407940] rounded-2xl relative shadow-inner "
              id="card2"
            >
              <img
                src=" https://images.unsplash.com/photo-1527847263472-aa5338d178b8?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className=" w-full h-full object-cover rounded-2xl absolute"
              />
            </div>
            <div
              className=" flex-1 h-full bg-[#83be83] rounded-2xl relative  shadow-inner "
              id="card3"
            >
              <div className="h-full w-full  px-[2vw] py-[5vh]">
                <div className=" w-full h-full rounded-2xl flex">
                  <div className=" font-Archivo mt-auto w-full whitespace-break-spaces text-[2.5vh]">
                    <div className=" mb-[2.5vh] flex w-1/3 justify-around ">
                      <Globe className=" " />
                      <Sun className=" " />
                    </div>
                    Our team brings together diverse expertise and experiences
                    to create a platform that is easy to use and accessible to
                    all. We are committed to providing the best services to our
                    customers and are constantly working to improve our
                    platform.
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" flex-1 h-full bg-[#152b15] rounded-2xl relative shadow-inner "
              id="card4"
            >
              <img
                src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className=" w-full h-full object-cover rounded-2xl absolute"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
