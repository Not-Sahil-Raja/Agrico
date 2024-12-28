import React from "react";
import { Wheat, MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <motion.div className=" h-screen w-screen  pt-[1%]">
      <motion.div
        className="h-[12%] w-full  font-WorkSans flex flex-col justify-end items-center"
        initial={{ opacity: 0, y: 50, scale: 1.3 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          bounce: 0.5,
        }}
      >
        <span className=" font-medium md:text-xl text-lg text-[#285a1e]">
          Why Choose Us
        </span>
        <span className=" sm:text-3xl text-xl text-center font-semibold">
          Comprehesive Agricultural Offerings
        </span>
      </motion.div>
      <motion.div
        className="h-[88%] lg:px-[10vw] md:px-5 px-2 py-[3%] flex sm:flex-row flex-col"
        initial={{ opacity: 0, y: 150, scale: 0.9 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.65,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10,
          staggerChildren: 0.35,
        }}
      >
        <div className=" sm:h-full h-fit sm:flex-1  flex flex-col gap-[3%] p-[1%]">
          <motion.div
            className="sm:flex-1 h-32 rounded-md overflow-hidden drop-shadow-sm"
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <img
              className=" w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1535090467336-9501f96eef89?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </motion.div>
          <motion.div
            className=" bg-[#9fc59f6e] sm:px-[5%] px-2 py-2 sm:flex-1 flex sm:justify-end justify-start items-end rounded-md overflow-hidden relative font-WorkSans"
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <Wheat
              className=" text-[#ffffff4d] absolute bottom-[2%] left-[2%]  "
              size={100}
            />
            <div className=" w-full sm:h-[50%] z-20  mb-3">
              <div className="w-full flex items-center justify-start whitespace-nowrap">
                <span className=" lg:text-2xl text-base font-semibold ">
                  Explore Our Products
                </span>
              </div>
              <div className=" w-full font-medium flex opacity-80 flex-col sm:leading-normal leading-tight px-[1%]">
                <span className=" text-sm">
                  We believe in the power of natural farming and the benefits
                  that come with it.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className=" h-full flex-1   flex flex-col gap-[3%] p-[1%]">
          <motion.div
            className=" flex flex-col sm:flex-1 grow rounded-md overflow-hidden"
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <div className=" h-fit mb-[3%] md:leading-tight leading-none font-WorkSans font-medium text-warp ">
              Discover a wide range of high quality farming products.We believe
              in the power of natural farming and the benefits that come with
              it.
            </div>
            <div className="flex-1 flex gap-[5%]">
              <div className=" h-full flex-1 bg-[#c5a640] text-white font-WorkSans rounded-md flex justify-center items-center p-[5%]">
                <div className=" text-center text-sm text-warp font-[470]">
                  <span className=" font-semibold">25 Years</span> of Experience
                  in Agriculture Farming.
                </div>
              </div>
              <div className=" h-full flex-1 bg-[#409748] rounded-md flex justify-center items-center p-[5%]">
                <div className=" text-center text-sm text-warp font-[470] text-white">
                  <span className=" font-semibold">100%</span> Healthy Products
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="sm:flex-1 sm:visible hidden sm:flex flex-col text-lg font-medium rounded-md overflow-hidden font-WorkSans select-none"
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <div className=" flex-1 w-full bg-[#1111111a] relative">
              <span className=" absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] flex gap-1 xl:whitespace-nowrap items-center xl:text-xl md:text-base md:break-words md:text-center">
                Seed & Seedings
                <MoveUpRight size={20} />
              </span>
            </div>
            <div className=" flex-1 w-full bg-[#11111131] relative">
              <span className=" absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] flex gap-1 xl:whitespace-nowrap items-center xl:text-xl md:text-base md:break-words md:text-center">
                Fertilizers & Soil Enhancers
                <MoveUpRight size={20} />
              </span>
            </div>
            <div className=" flex-1 w-full bg-[#11111144] relative">
              <span className=" absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] flex gap-1 xl:whitespace-nowrap items-center xl:text-xl md:text-base md:break-words md:text-center">
                Crops Selling
                <MoveUpRight size={20} />
              </span>
            </div>
          </motion.div>
        </div>
        <div className=" h-full sm:flex-1 flex flex-col gap-[3%] p-[1%]">
          <motion.div
            className=" bg-violet-300 sm:flex-1 h-32 rounded-md overflow-hidden drop-shadow-sm"
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1682092607850-4ee61bcf73c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className=" w-full h-full object-cover "
            />
          </motion.div>
          <motion.div
            className="  flex-1 flex flex-col rounded-md overflow-hidden font-WorkSans "
            initial={{ y: 10, opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "tween",
              easings: "easeInOut",
            }}
          >
            <div className=" flex-1  px-[5%] py-[3%] xl:text-[2.3vh] md:leading-tight leading-none text-base text-wrap border-b border-b-[#0000003f]">
              Emphasize that Agrico's educational content is specifically
              designed for farmers, addressing their unique challenges and
              interests
            </div>
            <div className=" flex-1  px-[5%] py-[3%] xl:text-[2.3vh] md:leading-tight leading-none text-base text-wrap">
              Our resources provide practical solutions to help farmers improve
              productivity and sustainability.
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhyChooseUs;
