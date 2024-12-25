import React from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const ReviewDetail = ({
  setCheckOutStage,
  cartDetails,
  shippingDetail,
  paymentDetail,
}) => {
  const { user } = useUser();
  // console.log(user.fullName, user.primaryEmailAddress.emailAddress);
  return (
    <motion.div
      className="flex flex-col p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
    >
      <h2 className=" text-center text-lg">Review Details</h2>

      <div className="mb-2 mt-2 flex border-b pb-1">
        <div className=" w-24 text-sm">SHIP TO</div>
        <div className="grow">
          <p className=" leading-tight mb-1 font-semibold">
            {shippingDetail.City}
          </p>
          <div className=" leading-none line-clamp-2 min-w-36 text-sm text-black/70">
            {shippingDetail.Address}
          </div>
        </div>
      </div>
      <div className="mb-2 mt-2 flex border-b pb-1">
        <div className=" w-24 text-sm">PAYMENT</div>
        <div className="grow">
          <p className=" leading-tight mb-1 font-semibold">
            {paymentDetail.PaymentMethod}
          </p>
          <div className=" leading-none line-clamp-2 min-w-36 text-sm text-black/70">
            {paymentDetail.VoucherCode}
          </div>
        </div>
      </div>
      <div className="mb-2 mt-2 flex border-b pb-1">
        <div className=" w-24 text-sm">EMAIL</div>
        <div className="grow">
          <p className=" leading-tight mb-1 font-semibold max-w-40 text-ellipsis overflow-hidden">
            {user ? user.primaryEmailAddress.emailAddress : ""}
          </p>
        </div>
      </div>
      <div className="my-4">
        <div className=" text-sm">
          PRODUCTS {`(${cartDetails.productQuantiy})`}
        </div>
      </div>

      {/* products total price  */}
      <div className=" px-2 py-2 flex flex-col gap-1 text-black/75 text-sm bg-stone-100 rounded mt-2">
        <p className=" flex justify-between">
          <span>{cartDetails.productQuantiy}x Products</span>
          <span>&#8377;{cartDetails.subTotalCharge}</span>
        </p>
        <p className=" flex justify-between">
          <span>Shipping</span>
          <span>&#8377;{cartDetails.shippingCharges}</span>
        </p>
        <p className=" flex justify-between">
          <span>Discount</span>
          <span>&#8377;{cartDetails.discount}</span>
        </p>
        <p className=" flex justify-between">
          <span>Tax</span>
          <span>&#8377;{cartDetails.tax}</span>
        </p>
        <p className=" flex justify-between mt-1 border-t pt-1">
          <span>Total</span>
          <span className=" text-lg font-semibold">
            &#8377;{cartDetails.totalCharge}
          </span>
        </p>
        <button
          className=" mt-3 flex items-center justify-center w-full py-2 border border-stone-900 bg-[#BEEC6F] text-black"
          onClick={() => setCheckOutStage("processing")}
        >
          Place Order
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewDetail;
