import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../Apps/cartSlice";
import { Minus, Plus, XSquare } from "lucide-react";
import { motion } from "framer-motion";

const CartCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      className=" flex gap-3 p-3 items-center bg-white rounded-md shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        src={product.itemImage}
        alt="product"
        className=" w-24 h-24 aspect-square object-cover rounded-md"
      />
      <div className=" flex flex-col  self-stretch  grow">
        <h3 className=" text-xl font-semibold">{product.name}</h3>
        <h4 className=" text-black/70 text-sm line-clamp-1 max-w-36">
          {product.description}
        </h4>
        <div className=" flex mt-auto mb-2 mr-4 justify-between items-center">
          <h4 className=" text-xl font-bold">₹{product.price}</h4>
          <div className=" flex  gap-2 overflow-hidden  rounded-lg w-fit border border-stone-400">
            <button
              className="bg-stone-200 border-r border-stone-400"
              onClick={() => {
                dispatch(updateQuantity({ _id: product._id, opr: "+" }));
              }}
            >
              <Plus className=" w-5 h-5  p-1" />{" "}
            </button>
            <h4 className="">
              {product.quantity < 10
                ? "0" + product.quantity
                : product.quantity}
            </h4>
            <button
              className="bg-stone-200 border-l border-stone-400"
              onClick={() => {
                dispatch(updateQuantity({ _id: product._id, opr: "-" }));
              }}
            >
              <Minus className=" w-5 h-5  p-1" />
            </button>
          </div>
        </div>

        {/* <button
          onClick={() => {
            dispatch(removeFromCart(product._id));
            dispatch(updateCart());
          }}
        >
          <XSquare size={24} />
        </button> */}
      </div>
    </motion.div>
  );
};

export default CartCard;
