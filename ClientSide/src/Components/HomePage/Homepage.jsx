import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const navigate = useNavigate();
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      const t2 = gsap.timeline();
      const t3 = gsap.timeline();
      const t4 = gsap.timeline();

      t1.from("#txt", {
        xPercent: "-200",
        duration: 0.6,
      });
      t2.from("#btun", {
        xPercent: "800",
        duration: 0.5,
        scale: 0,
      });

      t3.from(["#abttxt1", "#abttxt2", "#abttxthigh"], {
        xPercent: "-200",
        opacity: 0,
        duration: 0.8,
      })
        .from("#abtright", {
          xPercent: "200",
          opacity: 0,
          duration: 0.5,
        })
        .from("#card1", {
          opacity: 0,
          duration: 0.5,
        })
        .from("#card2", {
          opacity: 0,
          duration: 0.5,
        })
        .from("#card3", {
          opacity: 0,
          duration: 0.5,
        })
        .from("#card4", {
          opacity: 0,
          duration: 0.5,
        });

      ScrollTrigger.create({
        trigger: p2.current,
        start: "top 70%",
        end: "bottom 20%",
        animation: t3,
        // markers: true,
        toggleActions: "play pause resume reverse",
      });

      t4.from("#conimg", {
        opacity: 0,
        duration: 0.3,
        delay: 0.5,
      })
        .from("#contop", {
          yPercent: "-200",
          opacity: 0,
          duration: 0.5,
        })
        .from("#contxt", {
          xPercent: "-200",
          opacity: 0,
          duration: 0.4,
        })
        .from("#conform", {
          xPercent: "200",
          opacity: 0,
          duration: 0.4,
        })
        .from("#consub", {
          opacity: 0,
          duration: 0.6,
        })
        .from("#conmail", {
          yPercent: "200",
          opacity: 0,
          duration: 0.8,
        });
      ScrollTrigger.create({
        trigger: p3.current,
        start: "top 70%",
        end: "bottom 20%",
        animation: t4,
        // markers: true,
        toggleActions: "play pause resume reverse",
      });
    }, p1);
    return () => ctx.revert();
  }, []);

  return (
    <div className="scrollbar-hide overflow-hidden scroll">
      <div className=" h-[300vh] w-[100vw] bg-black scrollbar-hide" ref={p1}>
        <div className=" h-[100vh] overflow-hidden scrollbar-hide relative">
          <div className="w-full h-full absolute z-10 bg-gradient-to-b from-[#4e9c0e] to-[#224b01] opacity-65"></div>
          <img
            src="https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute z-0 h-[100vh] w-[100vw] contrast-200"
          />
          <div className=" flex w-full h-full z-20 relative items-center justify-center flex-col gap-10">
            <div
              className="w-[70vw] text-center text-6xl font-bold font-Epilogue text-white"
              id="txt"
            >
              "KNOWLEDGE IS LIKE A GARDEN, IF IT IS NOT CULTIVATED, IT CANNOT BE
              HARVESTED."
            </div>

            <button
              className="relative inline-flex items-center justify-center p-4 px-[4vw] py-[2vh] overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black shadow-md group text-3xl whitespace-nowrap"
              id="btun"
            >
              <span
                className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    html-stroke-linecap="round"
                    html-stroke-linejoin="round"
                    html-stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                EXPLORE NOW
              </span>
              <span className="relative invisible">Button Text</span>
            </button>
          </div>
        </div>
        <div
          className="h-[100vh] w-[100vw] bg-white relative overflow-hidden scrollbar-hide"
          ref={p2}
        >
          <div>
            <AboutUs />
          </div>
        </div>
        <div
          className="h-[100vh] w-[100vw] bg-white relative overflow-hidden scrollbar-hide"
          ref={p3}
        >
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
