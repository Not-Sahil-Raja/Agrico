import { MoveRight, Wheat } from "lucide-react";
import React from "react";
import vid from "/farming-02.gif";
import { motion } from "framer-motion";

const OurProductDetails = () => {
  const cardData = [
    {
      percentage: "95%",
      title: "Client Satisfaction",
      description:
        "They seek educational resources to improve their skills, increase yields, and ultimately achieve greater success.",
      bgColor: "bg-[#ececec]",
      textColor: "text-[#000000ad]",
    },
    {
      percentage: "100+",
      title: "Farmers Educated",
      description:
        "They seek educational resources to improve their skills, increase yields, and ultimately achieve greater success.",
      bgColor: "bg-[#56a53e]",
      textColor: "text-white",
    },
    {
      percentage: "400+",
      title: "Products Sold",
      description:
        "Products are designed to help farmers grow their knowledge and their farms.",
      bgColor: "bg-[#ececec]",
      textColor: "text-[#000000ad]",
    },
    {
      percentage: "100%",
      title: "Fresh Food",
      description:
        "We offer practical, farmer-focused educational experiences designed to increase yields and profitability.",
      bgColor: "bg-[#ececec]",
      textColor: "text-[#000000ad]",
    },
  ];
  return (
    <motion.div className=" h-screen w-screen pt-[3%] select-none">
      <div className=" w-full h-full flex flex-col">
        <motion.div
          className="sm:h-[20%] h-fit flex sm:flex-row flex-col"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          viewport={{ once: true }}
        >
          <div className=" flex-1 font-WorkSans flex flex-col items-start justify-center md:text-xl lg:text-3xl font-semibold">
            <span className="pl-[10%] flex gap-[1%] whitespace-nowrap items-center">
              Cultivating a Future of{" "}
              <Wheat className=" opacity-50" size={30} />
            </span>
            <span className="pl-[10%]  ">Sustainable Agriculture</span>
          </div>
          <div className=" flex-[1.5]  flex flex-col">
            <div className=" w-full sm:h-[75%] h-fit py-[2%] pr-[10%] text-ellipsis overflow-hidden pl-[5%] font-WorkSans text-[#000000a6] font-medium xl:text-[2.3vh] xl:leading-tight lg:text-lg sm:text-base text-sm leading-none">
              Agrico empowers farmers to grow their knowledge and their farms.
              We offer practical, farmer-focused educational experiences
              designed to increase yields and profitability. Our diverse
              learning styles include videos, courses, downloadable guides, and
              live sessions with experts.
            </div>
            <div className="h-[25%] pr-[10%] pl-[5%] gap-[1%] font-semibold font-WorkSans cursor-pointer text-[#297529] flex py-1 text-sm">
              Learn More <MoveRight />
            </div>
          </div>
        </motion.div>
        <div className=" sm:h-[45%] grow px-[5%] py-[1%]">
          <motion.div
            className=" h-full w-full overflow-hidden rounded-2xl drop-shadow relative"
            initial={{ scale: 0.4, opacity: 50 }}
            whileInView={{ scale: 1, opacity: 100 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            viewport={{ once: true }}
          >
            <img
              src={vid}
              alt=""
              className=" w-full h-full object-cover absolute z-0"
            />
            <div className=" w-full h-full absolute z-10 bg-gradient-to-b  from-[#d8d4d438] to-[#242722e8] opacity-50 "></div>
          </motion.div>
        </div>
        <div className="sm:h-[35%] h-fit sm:mt-auto mt-2">
          <motion.div
            className=" w-full h-full flex sm:flex-row flex-col justify-center items-center gap-[1%] py-[1%] px-[5%] font-WorkSans"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.5, staggerChildren: 0.5 }}
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                className={`sm:h-full h-fit flex flex-col flex-1 ${card.bgColor} rounded-2xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="h-[35%] font-bold sm:text-[5vh] text-xl px-[5%] pt-[2%]">
                  {card.percentage}
                </div>
                <div className="h-[15%] font-medium px-[5%] sm:text-base text-sm sm:mb-0 mb-1">
                  {card.title}
                </div>
                <div
                  className={`h-[50%] font-medium px-[5%] sm:mb-0 mb-1 xl:text-[2vh] lg:text-base text-sm leading-none ${card.textColor}`}
                >
                  {card.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurProductDetails;
