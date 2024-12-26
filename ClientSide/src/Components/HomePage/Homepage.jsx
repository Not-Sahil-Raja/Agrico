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
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
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
      <div className=" w-[100vw]  h-[100vh]  bg-white overflow-x-hidden">
        <div className=" h-fit w-[100vw] overflow-x-hidden bg-white  " ref={p1}>
          <motion.div
            className=" h-[100vh] overflow-x-hidden  scrollbar-hide relative"
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
              loop
              muted
              className="absolute z-0 h-full w-full object-cover"
            />
            <div className=" flex w-full h-full z-20 relative items-center justify-center flex-col gap-10">
              <div
                className="w-[70vw]  2xl:w-[75vw] xl:h-[35vh] 2xl:h-[45vh] flex flex-col items-center justify-center text-center text-6xl font-bold font-Worksans text-white"
                id="txt"
              >
                <motion.div
                  className=" h-[75%] flex flex-col  items-center justify-end w-full 2xl:text-8xl 2xl:text-center "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "tween", delay: 0.5 }}
                >
                  <p className=" whitespace-nowrap flex gap-1  items-center ">
                    <span className="">Cultivating </span>
                    <motion.div
                      className=" bg-white h-[8vh] w-[8vh] rounded-full overflow-hidden  relative"
                      initial={{ width: "8vh" }}
                      animate={{ width: "15vh", borderRadius: "2rem" }}
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
                        src="https://images.unsplash.com/photo-1522579479806-486feddb6d25?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className=" h-[15vh] w-[15vh] object-cover top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2"
                        alt=""
                      />
                    </motion.div>{" "}
                    <span>Sustainable Future</span>
                  </p>
                  <span className=" whitespace-nowrap">
                    Through Modern Agriculture
                  </span>
                </motion.div>
                <motion.span
                  className=" h-[25%] 2xl:text-xl text-xl font-medium 2xl:px-[10vw] opacity-95 pt-[1%] origin-top"
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
                </motion.span>
              </div>

              <motion.button
                className="relative inline-flex items-center justify-center p-4 px-[4vw] py-[2vh] font-WorkSans overflow-hidden font-medium bg-[#000000b2] text-white transition duration-300 ease-out border-2 border-black shadow-md group text-3xl whitespace-nowrap rounded-lg"
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
                <span className="absolute flex items-center justify-center w-full rounded-lg h-full  backdrop-blur-md text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Explore Now <ArrowUpRightIcon size={30} />
                </span>
                <span className="relative invisible">Button Text</span>
              </motion.button>
            </div>
          </motion.div>
          <div
            className="h-[100vh] w-[100vw] bg-white relative overflow-hidden scrollbar-hide"
            ref={p2}
          >
            <div>
              {/* <AboutUs /> */}
              <WhyChooseUs />
            </div>
          </div>
          <motion.div
            className="h-[100vh] w-[100vw] bg-white relative overflow-hidden scrollbar-hide"
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
            {/* <ContactUs /> */}
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
            <div className=" w-full h-full  pt-[5%] pb-[1%] px-[5%] flex flex-col">
              <Reviews />
            </div>
          </motion.div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Homepage;
