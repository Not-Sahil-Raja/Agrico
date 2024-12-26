import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import React from "react";

const ShowCurrentState = ({ currentState }) => {
  switch (currentState) {
    case "loading":
      return (
        <div className=" h-96 flex justify-center items-center bg-stone-300/50 rounded-md animate-pulse mx-4">
          <div className="  w-16 h-12 flex justify-center items-center">
            <motion.div
              className=" "
              initial={{ rotate: 0, opacity: 1 }}
              animate={{ rotate: 360, opacity: 0.5 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              <Loader2 size={30} />
            </motion.div>
          </div>
        </div>
      );
    case "empty":
      return (
        <div className=" h-96 flex justify-center items-center">
          <h1>No result found</h1>
        </div>
      );
    case "error":
      return (
        <div className=" h-96 flex justify-center items-center break-words ">
          <h1 className=" max-w-[30rem] break-words text-red-500">
            Failed to load products please refresh the page
          </h1>
        </div>
      );
    default:
      return (
        <div className=" h-96 flex justify-center items-center bg-stone-300/50 rounded-md animate-pulse mx-4"></div>
      );
  }
};
export default ShowCurrentState;
