import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Item(props) {
  const navigate = useNavigate();
  return (
    <div
      id="itm"
      className={
        " flex items-end justify-center h-full rounded-xl cursor-pointer  overflow-hidden flex-row relative drop-shadow-md font-Archivo"
      }
      onClick={() => {
        navigate("/demo", {
          state: { name: props.cat, no: props.no, back: props.back },
        });
      }}
    >
      <img
        src={props.back}
        alt={props.cat}
        className="absolute z-0 transition-all scale-105 hover:scale-100 hover:brightness-50 duration-200"
      />
      <div className=" z-20 text-center bg-[#0000007e] w-full py-[.5vh] rounded ">
        {props.cat}
      </div>
    </div>
  );
}

export default Item;

// bg-gradient-to-t from-black via-lightOrange to-extralightYellow
