import Item from "./Item";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";

function Catlg() {
  const deb = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.from("#txt", {
        xPercent: "-200",
        opacity: 0,
        duration: 0.8,
      })
        .from("#spn", {
          opacity: 0,
          duration: 0.4,
        })
        .from("#topcat", {
          xPercent: "200",
          opacity: 0,
          duration: 0.4,
        })
        .from("#topcatspn", {
          yPercent: "100",
          opacity: 0,
          duration: 0.4,
          zIndex: -2,
        })
        .from("#catagory", {
          xPercent: "-200",
          duration: 0.8,
        })
        .from("#itm", {
          opacity: 0,
          duration: 0.8,
        });
    }, deb);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="w-[100vw] h-[100vh] flex items-center justify-center overflow-hidden bg-cover bg-[#fffff2]"
        ref={deb}
      >
        <div className=" w-full h-full pt-[9vh]  ">
          <div className=" w-full flex flex-col   ">
            <div className=" h-[25vh]  flex">
              <div className=" w-[70%] px-[5vw] pb-[2vh] pt-[5vh]">
                <h1
                  id="txt"
                  className=" text-5xl font-Archivo font-bold text-[#242323]"
                >
                  Select a Category to start
                </h1>
                <h1
                  id="spn"
                  className=" text-5xl font-Archivo font-bold text-[#99ac6a]"
                >
                  Learning
                </h1>
              </div>
              <div className=" w-[50%] px-[2vw] py-[3vh]">
                <div
                  id="topcat"
                  className=" w-full h-full rounded-lg bg-[#6f9e6f93] shadow-inner relative"
                >
                  <span
                    className=" absolute top-[-20%] left-[-2%]  px-[1vw] py-[.5vh] rounded text-2xl font-semibold font-Archivo"
                    id="topcatspn"
                  >
                    Top Category
                  </span>
                </div>
              </div>
            </div>

            <div className=" w-full ">
              <div
                id="catagory"
                className=" grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full h-[67vh] bg-gradient-to-r from-lightYellow via-lightOrange to-extralightYellow shadow-inner rounded-2xl text-white flex-row gap-5 p-10 flex-wrap justify-center items-center overflow-y-auto overflow-x-hidden scrollbar-hide"
              >
                <Item
                  id="itm1"
                  no="1"
                  cat="Crop Management"
                  back="https://images.unsplash.com/9/fields.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhcm18ZW58MHx8MHx8fDA%3D"
                />
                <Item
                  id="itm2"
                  no="2"
                  cat="Technology and Innovation"
                  back="https://images.unsplash.com/photo-1594771804886-a933bb2d609b?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm3"
                  no="3"
                  cat="Climate Resilience and Adaptation"
                  back="https://images.unsplash.com/photo-1588152850700-c82ecb8ba9b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm4"
                  no="4"
                  cat="Sustainable Agriculture"
                  back="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm5"
                  no="5"
                  cat="Agribusiness and Marketing"
                  back="https://images.unsplash.com/photo-1470685983317-0084951ce1ca?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm6"
                  no="6"
                  cat="Rural Development and Community Engagement"
                  back="https://plus.unsplash.com/premium_photo-1664123873245-bd178d77ca19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm7"
                  no="7"
                  cat="Specialized Topics and Emerging Issues"
                  back="https://images.unsplash.com/photo-1440428099904-c6d459a7e7b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Item
                  id="itm8"
                  no="8"
                  cat="Farm Safety and Regulations"
                  back="https://images.unsplash.com/photo-1442774503508-2e17027df511?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Catlg;
