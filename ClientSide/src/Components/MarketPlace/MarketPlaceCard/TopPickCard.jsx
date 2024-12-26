import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Apps/cartSlice";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TopPickCard = ({ index, product }) => {
  const Dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const addCartItem = () => {
    const isItemInCart = cartItems?.some(
      (cartItem) => cartItem._id == product.productDetails._id
    );
    if (isItemInCart) return;
    Dispatch(addToCart(product.productDetails));
    setAlreadyInCart(true);
  };

  useEffect(() => {
    const isItemInCart = cartItems?.some(
      (cartItem) => cartItem._id == product.productDetails._id
    );
    setAlreadyInCart(isItemInCart);
  }, [cartItems]);

  return (
    <motion.div
      className=" flex flex-col rounded-md overflow-hidden bg-white shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="aspect-square  relative w-full">
        <p className=" absolute left-2 top-3 z-[1] bg-white shadow px-2 py-1 rounded-xl text-xs">
          {"#" + (index + 1)} Best Seller
        </p>
        <img
          src={
            product && product.productDetails
              ? product.productDetails.itemImage
              : ""
          }
          alt=""
          className=" aspect-square object-cover absolute"
        />
      </div>
      <div className=" mt-2 flex-col leading-none px-2 py-2">
        <h4 className=" py-1 text-xl font-semibold leading-none">
          {product && product.productDetails
            ? product.productDetails.name
            : "Items Name"}
        </h4>
        <div className=" flex justify-between">
          <h6 className=" text-md text-black/70 mb-2 mt-1">
            {product.totalQuantity} Sold
          </h6>
          <h6 className=" bg-stone-200/75 px-2 py-1 h-fit rounded">
            {product && product.productDetails
              ? product.productDetails.category
              : "Items category"}
          </h6>
        </div>
        <div className=" flex w-full justify-between items-center mb-2">
          <p className=" overflow-hidden overflow-ellipsis line-clamp-1">
            {product && product.productDetails
              ? product.productDetails.description
              : "Product description"}
          </p>
          <p className=" px-3 text-lg font-semibold">
            ₹
            {product && product.productDetails
              ? product.productDetails.price
              : "Items price"}
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

export default TopPickCard;
