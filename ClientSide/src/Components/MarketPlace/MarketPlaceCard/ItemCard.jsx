import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Apps/cartSlice";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ItemCard = ({ item }) => {
  const Dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const addCartItem = () => {
    const isItemInCart = cartItems?.some(
      (cartItem) => cartItem._id == item._id
    );
    if (isItemInCart) return;
    Dispatch(addToCart(item));
    setAlreadyInCart(true);
  };

  useEffect(() => {
    const isItemInCart = cartItems?.some(
      (cartItem) => cartItem._id == item._id
    );
    setAlreadyInCart(isItemInCart);
  }, [cartItems]);

  return (
    <motion.div
      className=" flex flex-col rounded-md overflow-hidden font-Archivo bg-white shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      <div className="aspect-square  relative w-full">
        <img
          src={item.itemImage}
          alt=""
          className=" aspect-square object-cover absolute"
        />
        <p className=" absolute right-4 top-3 z-[1] px-3 py-[.15rem] text-sm bg-[#6c8532] border drop-shadow-md text-white rounded-full">
          {item.category}
        </p>
        <h4 className=" py-1 text-xl first-letter:uppercase leading-none tracking-wide absolute left-3 bottom-4 text-white z-[1]">
          {item.name}
        </h4>
        <div className="w-full h-full top-0 absolute bg-gradient-to-bl to-transparent from-[#00000083]" />
        <div className=" w-full h-2/5 bottom-0 absolute bg-gradient-to-t to-transparent from-black " />
      </div>
      <div className=" mt-2 flex-col leading-none px-4 py-2 pb-4">
        <p className=" overflow-hidden overflow-ellipsis line-clamp-1 max-w-full">
          {item.description}
        </p>
        <div className=" flex w-full justify-between items-center my-1 px-1">
          <p className="text-xl font-semibold">₹{item.price}</p>
          <p className="text-base bg-neutral-200 px-2 rounded">
            {item.quantity}Kg
          </p>
        </div>

        <button
          className="mt-2 flex items-center justify-center gap-1 rounded w-full px-2 py-2 bg-black text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-60"
          onClick={addCartItem}
          disabled={alreadyInCart}
        >
          {alreadyInCart ? (
            <>
              {" "}
              <Check className=" w-4 h-4" /> Already in Cart
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ItemCard;
