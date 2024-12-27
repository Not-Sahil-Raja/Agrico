import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Package, CreditCard, ClipboardCheckIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import CartCard from "./CartCard";
import ShippingDetail from "./ShippingDetail";
import PaymentDetail from "./PaymentDetail";
import ReviewDetail from "./ReviewDetail";
import PaymentProcessing from "./PaymentProcessing";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  // Cart's Charges
  const [cartDetails, setCartDetails] = useState({
    productQuantiy: 0,
    shippingCharges: 0,
    discount: 0,
    tax: 0,
    subTotalCharge: 0,
    totalCharge: 0,
  });

  //Shipping Address Details
  const [shippingDetail, setShippingDetail] = useState({
    CustomerName: "",
    Country: "",
    Address: "",
    City: "",
    State: "",
    PostalCode: "",
    PhoneNumber: "",
  });

  // Chekout Payment Details
  const [paymentDetail, setPaymentDetail] = useState({
    PaymentMethod: "creditCard",
    UpiId: "",
    CardNumber: "",
    Expiration: "",
    SecurityCode: "",
    VoucherCode: "",
  });

  // Used to set check out the stage to conditionally render component
  const [checkOutStage, setCheckOutStage] = useState("shipping");

  //Updating Cart Details for other checkout pages whenever cartItems gets updated
  useEffect(() => {
    let totalCharge = parseFloat(0);
    let subTotalCharge = parseFloat(0);
    let shippingCharges = 0;

    for (const product of cartItems)
      totalCharge += parseFloat(
        parseFloat(product.price) * parseInt(product.quantity)
      );

    subTotalCharge = parseFloat(totalCharge);

    if (totalCharge < 500) shippingCharges = 50;
    else if (totalCharge < 1000) shippingCharges = 30;
    else shippingCharges = 0;

    const discount = totalCharge > 1000 ? totalCharge * 0.1 : 0;
    const tax = (totalCharge - discount) * 0.05;

    totalCharge = totalCharge - discount + tax + shippingCharges;

    setCartDetails({
      productQuantiy: cartItems.length,
      shippingCharges,
      discount,
      tax,
      subTotalCharge,
      totalCharge,
    });
  }, [cartItems]);

  return (
    <div className=" overflow-hidden font-Archivo">
      <motion.div className=" flex w-full h-fit min-h-[100svh]">
        <div className=" flex-1 mt-14 bg-stone-200 ">
          <div className="  flex-col py-6  lg:pl-[18%] lg:pr-[15%] 2xl:pl-[25%] 2xl:pr-[22%]">
            <h2 className=" text-lg font-semibold">Cart Informations </h2>
            <h3 className=" text-sm text-black/70 mb-5">
              By placing an order you agree to our{" "}
              <span className=" text-black/75 font-semibold">
                terms and conditions
              </span>
            </h3>
            <div className=" flex flex-col gap-3">
              {cartItems.length > 0 ? (
                cartItems.map((product, index) => (
                  <CartCard key={index} product={product} />
                ))
              ) : (
                <>
                  <div>Cart Is Empty</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="  flex-1 mt-14 ">
          <div className="  flex-col py-6  lg:pl-[18%] lg:pr-[15%] 2xl:pl-[25%] 2xl:pr-[22%]">
            <h2 className=" text-lg font-semibold">Checkout Process</h2>
            <h3 className=" text-sm text-black/70 mb-5">
              Complete your purchase by providing all the details
            </h3>
            {/* Full Checkout Process */}
            <div className=" w-full  px-3 mb-4">
              <div className=" flex bg-stone-200/50 rounded-md px-2 py-3">
                <div className=" flex-1 flex flex-col justify-center items-center text-black/100">
                  <CreditCard className=" w-6 h-6 " />
                  <span className=" mt-1 leading-none text-sm ">Shipping</span>
                </div>
                <div className="flex justify-center items-center">
                  <div className=" h-[.05rem] bg-stone-700 w-8" />
                </div>

                <div
                  className={`flex-1 flex flex-col justify-center items-center ${
                    checkOutStage == "payment" || checkOutStage == "review"
                      ? "text-black/100"
                      : "text-black/70"
                  } `}
                >
                  <Package
                    className={`w-6 h-6  ${
                      checkOutStage == "payment" || checkOutStage == "review"
                        ? "text-black/100"
                        : "text-black/50"
                    }`}
                  />
                  <span className=" mt-1 leading-none text-sm ">Payment</span>
                </div>
                <div className="flex justify-center items-center">
                  <div className=" h-[.05rem] bg-stone-700 w-8" />
                </div>
                <div
                  className={`flex-1 flex flex-col justify-center items-center ${
                    checkOutStage == "review"
                      ? "text-black/100"
                      : "text-black/70"
                  }`}
                >
                  <ClipboardCheckIcon
                    className={`w-6 h-6  ${
                      checkOutStage == "review"
                        ? "text-black/100"
                        : "text-black/50"
                    }`}
                  />
                  <span className=" mt-1 leading-none text-sm ">Review</span>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {checkOutStage === "shipping" && (
                <ShippingDetail
                  setCheckOutStage={setCheckOutStage}
                  cartDetails={cartDetails}
                  setShippingDetail={setShippingDetail}
                  shippingDetail={shippingDetail}
                />
              )}
              {checkOutStage === "payment" && (
                <PaymentDetail
                  setCheckOutStage={setCheckOutStage}
                  cartDetails={cartDetails}
                  paymentDetail={paymentDetail}
                  setPaymentDetail={setPaymentDetail}
                />
              )}
              {checkOutStage === "review" && (
                <ReviewDetail
                  setCheckOutStage={setCheckOutStage}
                  cartDetails={cartDetails}
                  shippingDetail={shippingDetail}
                  paymentDetail={paymentDetail}
                />
              )}
              {checkOutStage === "processing" && (
                <PaymentProcessing
                  shippingDetail={shippingDetail}
                  paymentDetail={paymentDetail}
                  cartItems={cartItems}
                  setCheckOutStage={setCheckOutStage}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
