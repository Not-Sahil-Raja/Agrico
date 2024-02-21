import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../../Apps/cartSlice";
import { XSquare } from "lucide-react";
import { removeFromCart } from "../../Apps/cartSlice";

const CartCard = ({ item }) => {
  //feature not working-->
  const dispatch = useDispatch();
  // const [priceAdd, setPriceAdd] = useState(false);
  // if (priceAdd) {
  //   item = { ...item, cartadd: true };
  //   dispatch(updateCart(item));
  // }

  return (
    <>
      <div className=" bg-[#00000010] flex justify-between items-center px-[2vw] py-[1vh] my-[1vh] rounded-md shadow-md bg-opacity-80 backdrop-blur-sm">
        <div className="w-[65%] overflow-hidden text-ellipsis">
          <div className=" font-Archivo font-semibold ">{item.itemName}</div>
          <div className=" text-sm ">{item.quantity}Kg</div>
        </div>
        <div className=" w-[35%] px-[1%] whitespace-nowrap flex justify-evenly items-center">
          <span className=" px-[1vw] text-sm font-Archivo font-semibold">
            Price: {item.price}₹
          </span>
          <span>
            <XSquare
              onClick={() => dispatch(removeFromCart(item._id))}
              className=" cursor-pointer hover:scale-110 transition-all"
            />
          </span>
          {/* not working */}
          {/* <input
            className=" bg-slate-300 ml-auto"
            type="checkbox"
            value={item.price}
            onChange={() => setPriceAdd(!priceAdd)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default CartCard;
