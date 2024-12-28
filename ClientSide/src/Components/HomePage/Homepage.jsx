import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "./WhyChooseUs";
import OurProductDetails from "./OurProductDetails";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Reviews from "./Reviews";
import Footer from "./FooterPage";
import { useUser } from "@clerk/clerk-react";
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const bgvideo = "./pexels_videos_1324936 (1440p).mp4";

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);
  return (
    <>
      <div className=" w-screen h-screen  bg-white overflow-x-hidden">
        <div className=" h-fit w-[100vw] overflow-x-hidden bg-white  " ref={p1}>
          {/* Hero Section of the landing page  */}
          <motion.div
            className="h-screen overflow-x-hidden  scrollbar-hide relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              type: "tween",
              stiffness: 100,
            }}
          >
            <div className="w-full h-full absolute z-10 bg-gradient-to-b  from-[#05050538] to-[#30352ce8] opacity-65 "></div>
            <video
              src={bgvideo}
              playsInline
              ref={videoEl}
              autoPlay
              loading="lazy"
              loop
              muted
              className="absolute z-0 h-full w-full object-cover"
            />
            <div className=" flex w-full h-full z-20 relative items-center justify-center flex-col gap-10">
              <div
                className="w-[70vw]  2xl:w-[75vw] xl:h-[35vh] 2xl:h-[45vh] flex flex-col items-center justify-center text-center font-Archivo text-white"
                id="txt"
              >
                <motion.div
                  className=" h-[75%] flex flex-col items-center justify-end w-full 2xl:text-8xl 2xl:text-center md:text-4xl sm:text-[1.3rem] text-lg font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "tween", delay: 0.5 }}
                >
                  <div className=" whitespace-nowrap flex gap-1  items-center ">
                    <h1 className="">Cultivating </h1>
                    {/* Image Between the text  */}
                    <motion.div
                      className=" bg-white lg:h-[8vh] lg:w-[8vh] w-10 h-10 rounded-full overflow-hidden  relative"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1, borderRadius: "2rem" }}
                      transition={{
                        duration: 0.5,
                        type: "tween",
                        delay: 2,
                        easings: [0.83, 0, 0.17, 1],
                        stiffness: 100,
                        damping: 10,
                      }}
                    >
                      <img
                        className=" h-[15vh] w-[15vh] object-cover top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2"
                        src="https://images.unsplash.com/photo-1522579479806-486feddb6d25?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="image"
                      />
                    </motion.div>{" "}
                    <span>Sustainable Future</span>
                  </div>
                  <span className=" whitespace-nowrap ">
                    Through Modern Agriculture
                  </span>
                </motion.div>

                <motion.h3
                  className=" h-fit 2xl:text-xl lg:text-xl text-base lg:leading-normal leading-tight text-white/70 font-Archivo 2xl:px-[10vw] opacity-95 lg:pt-2 pt-3 origin-top"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "tween",
                    delay: 0.8,
                    stiffness: 100,
                    damping: 10,
                  }}
                >
                  Knowledge is like a garden. If it is not cultivated with
                  curiosity and nurtured with exploration, it cannot be
                  harvested as wisdom and applied to life's challenges.
                </motion.h3>
              </div>
              {/* Explore Now Button  */}
              {isSignedIn && (
                <motion.button
                  className="relative inline-flex items-center justify-center p-4 px-8 py-4 overflow-hidden font-medium bg-black text-white transition duration-300 ease-out border-2 border-black shadow-md group text-3xl font-Archivo rounded-lg"
                  id="btun"
                  onClick={() => {
                    navigate("/article");
                  }}
                  initial={{ y: "35%", scale: 0 }}
                  animate={{ y: "0%", scale: 1 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    delay: 0.85,
                    stiffness: 100,
                    damping: 10,
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform font-Archivo group-hover:translate-x-full ease lg:text-xl text-lg">
                    Explore Now <ArrowUpRightIcon size={30} />
                  </span>
                  <span className="relative invisible">Button Text</span>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Rendering  the why choose us page  */}
          <div
            className="h-screen w-screen bg-white relative overflow-hidden scrollbar-hide"
            ref={p2}
          >
            <div>
              <WhyChooseUs />
            </div>
          </div>

          {/* Our Product Details  */}
          <motion.div
            className="h-screen w-screen sm:mb-0 mb-3 bg-white relative overflow-hidden scrollbar-hide"
            initial={{ opacity: 0, y: "20%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.25,
              type: "spring",
              ease: "easeInOut",
              stiffness: 70,
              delay: 0.2,
            }}
            ref={p3}
          >
            <OurProductDetails />
          </motion.div>

          <motion.div
            className="h-screen w-screen bg-white relative overflow-hidden scrollbar-hide"
            ref={p3}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.25,
              type: "spring",
              ease: "easeInOut",
              stiffness: 70,
              delay: 0.2,
            }}
          >
            <Reviews />
          </motion.div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Homepage;
