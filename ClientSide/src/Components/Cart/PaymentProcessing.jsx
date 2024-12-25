import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../Apps/cartSlice";
import axios from "axios";

const PaymentProcessing = ({ shippingDetail, paymentDetail, cartItems }) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(true);

  const paymentSubmitHandler = async () => {
    const token = await getToken();

    setIsProcessing(true);
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/orders/place-orders`,
        {
          products: cartItems,
          userName: user.fullName,
          userEmail: user.primaryEmailAddress.emailAddress,
          shippingDetail,
          paymentDetail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsProcessing(false);
        setIsOrderSuccessful(true);
        dispatch(emptyCart());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    paymentSubmitHandler();
  }, []);
  return (
    <motion.div
      className=" flex items-center h-[35rem] relative justify-center bg-stone-200/50 rounded"
      style={{ transformOrigin: "bottom" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ type: "tween" }}
    >
      {isProcessing && (
        <div className=" flex flex-col items-center gap-2  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className=" w-40 h-40 flex  items-center justify-center ">
            <motion.div
              className=" w-32 h-32 rounded-full overflow-hidden border border-[#A1CF6B]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2.25,
              }}
            />
          </div>
          <p className=" animate-pulse">Processing...</p>
        </div>
      )}
      {isOrderSuccessful && (
        <div className=" flex flex-col items-center gap-2">
          <motion.div
            className=" w-32 h-32 flex mb-4 bg-white rounded-full items-center justify-center shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Check className=" w-20 h-20" />
          </motion.div>
          <p className=" text-center text-black/75 leading-tight">
            Payment Successful <br /> Your order is on the way
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentProcessing;
