import React from "react";

const TopPickCard = ({
  width,
  fsize,
  imglinks,
  itemsName,
  price,
  suppName,
}) => {
  return (
    <>
      <div
        className={` bg-amber-600 rounded w-[${width}%] relative text-${fsize}`}
      >
        <img
          src={imglinks}
          alt="img"
          className=" w-full h-full object-cover rounded-lg brightness-75 absolute z-10"
        />
        <div className=" absolute z-20 text-[white] shadow-text bottom-0 left-[5%]">
          {itemsName}
        </div>
        <div className=" absolute z-20 text-[white] shadow-text bottom-0 right-[5%]">
          {price}₹
        </div>
        <div className=" absolute z-20 text-[white] shadow-text top-0 right-[5%] ">
          {suppName}
        </div>
      </div>
    </>
  );
};

export default TopPickCard;
