import React from "react";

const MarketPlaceHoroSection = () => {
  return (
    <div className="flex md:flex-row flex-col w-full h-[90svh] font-Archivo">
      <div className=" h-full flex flex-col grow ">
        <div className="  flex-[1.3] flex">
          <div className="lg:m-5 md:m-3 m-2 flex flex-col md:p-5 p-2 bg-stone-100 rounded-md justify-center w-full">
            <h2 className="md:text-5xl text-3xl md:max-w-[40%] leading-none font-semibold">
              Buy directly from farmers at our marketplace
            </h2>
            <h4 className="md:max-w-[40%] pl-1 mt-1 text-black/75">
              Experience fresh produce and support local farmers by purchasing
              directly from our marketplace.
            </h4>
          </div>
        </div>
        <div className=" flex flex-1">
          <div className=" mx-5 mb-2 p-3 flex items-center gap-5 w-full  ">
            <div className="h-full grow flex-1 rounded-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1523349122880-44486ffa7b14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className=" w-full h-full absolute object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-black" />
              <div className=" absolute left-0 bottom-3 flex flex-col  w-full px-3 text-white">
                <h4 className=" text-xl 2xl:text-5xl leading-none">
                  Fresh Produce
                </h4>
                <p className="text-sm 2xl:text-lg mt-1 max-w-[80%] line-clamp-2 overflow-hidden text-ellipsis text-white/85">
                  Get the freshest produce directly from local farmers.
                </p>
              </div>
            </div>
            <div className="h-full grow flex-1 rounded-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1532509774891-141d37f25ae9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className=" w-full h-full absolute object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-black" />
              <div className=" absolute left-0 bottom-3 flex flex-col  w-full px-3 text-white">
                <h4 className=" text-xl 2xl:text-5xl leading-none">
                  Support Farmers
                </h4>
                <p className="text-sm 2xl:text-lg mt-1 max-w-[80%] line-clamp-2 overflow-hidden text-ellipsis text-white/85">
                  Help local farmers by buying their products directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:w-1/3 w-full md:h-full h-4/6 flex">
        <div className=" m-4 w-full rounded-md overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1615671524701-9c3dde8fdaa0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className=" w-full h-full absolute object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-black" />
          <div className=" absolute left-0 bottom-3 flex flex-col  w-full px-3 text-white">
            <h4 className=" text-xl 2xl:text-5xl leading-none">
              Local Marketplace
            </h4>
            <p className="text-sm 2xl:text-lg 2xl:leading-tight mt-1 max-w-[80%] line-clamp-3 overflow-hidden text-ellipsis text-white/85">
              Connect directly with local farmers, support sustainable
              agriculture, and enjoy the freshest produce delivered straight to
              your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceHoroSection;
