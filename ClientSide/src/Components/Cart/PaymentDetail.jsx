import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CreditCardIcon } from "lucide-react";

const PaymentDetail = ({
  setCheckOutStage,
  cartDetails,
  paymentDetail,
  setPaymentDetail,
}) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPaymentDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentDetails = (e) => {
    e.preventDefault();
    setCheckOutStage("review");
  };

  return (
    <motion.form
      className="flex flex-col p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      onSubmit={handlePaymentDetails}
      noValidate
    >
      <h2 className="text-center text-lg">Payment Details</h2>
      <div className="mb-3 mt-2">
        <label
          htmlFor="paymentMethod"
          className="block text-gray-700 text-sm pl-1 mb-2 leading-none"
        >
          Select Payment Method
        </label>
        <div className="flex gap-2">
          <label
            className={`flex flex-col items-center cursor-pointer border border-stone-300 py-3 rounded-md flex-1 text-current/75 opacity-75 transition-all ${
              paymentDetail.PaymentMethod === "creditCard" &&
              "opacity-100 text-current/100 bg-stone-200 font-semibold border-stone-400"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              className="mr-2 hidden peer"
              onChange={(e) =>
                setPaymentDetail({
                  ...paymentDetail,
                  PaymentMethod: e.target.value,
                })
              }
              required
            />
            <CreditCardIcon className="w-6 h-6" fill="#ecd27a" />
            <p>Credit Card</p>
          </label>
          <label
            className={`flex flex-col items-center cursor-pointer border border-stone-300 py-3 rounded-md flex-1 text-current/75 opacity-75 transition-all ${
              paymentDetail.PaymentMethod === "UPI" &&
              "opacity-100 text-current/100 bg-stone-200 font-semibold border-stone-400"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              className="mr-2 hidden peer"
              onChange={(e) =>
                setPaymentDetail({
                  ...paymentDetail,
                  PaymentMethod: e.target.value,
                })
              }
              required
            />
            <img
              src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg"
              alt="UPI"
              className="w-6 h-6"
            />
            UPI
          </label>
        </div>
        <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
          **Please select a payment method
        </p>
      </div>
      {paymentDetail.PaymentMethod === "creditCard" ? (
        // Credit Card Related Input Fields
        <>
          <div className="mb-2 mt-2">
            <label
              htmlFor="CardNumber"
              className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
            >
              Card Number
            </label>
            <input
              type="text"
              id="CardNumber"
              name="CardNumber"
              className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
              placeholder="xxxx xxxx xxxx xxxx"
              value={paymentDetail.CardNumber}
              onChange={handleInput}
              required
            />
            <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
              **Please enter your card number
            </p>
          </div>
          <div className="mb-2 mt-2 flex gap-2">
            <div className="flex-1">
              <label
                htmlFor="Expiration"
                className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
              >
                Expiration
              </label>
              <input
                type="text"
                id="Expiration"
                name="Expiration"
                className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                placeholder="mm/yy"
                value={paymentDetail.Expiration}
                onChange={handleInput}
                required
              />
              <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
                **Please enter the expiration date
              </p>
            </div>

            <div className="flex-1">
              <label
                htmlFor="SecurityCode"
                className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
              >
                Security Code
              </label>
              <input
                type="text"
                id="SecurityCode"
                name="SecurityCode"
                className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                placeholder="xxx"
                value={paymentDetail.SecurityCode}
                onChange={handleInput}
                required
              />
              <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
                **Please enter the security code
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-2 mt-2">
            <label
              htmlFor="UPI"
              className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
            >
              UPI Id
            </label>
            <input
              type="text"
              id="UPI"
              name="UpiId"
              className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
              placeholder="yourname@bank"
              value={paymentDetail.UpiId}
              onChange={handleInput}
              required
            />
            <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
              **Please enter your UPI ID
            </p>
          </div>
        </>
      )}

      <div className="mb-2">
        <label
          htmlFor="voucher"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          Voucher Code
        </label>
        <input
          type="text"
          id="voucher"
          name="VoucherCode"
          className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          placeholder="xxxxx"
          value={paymentDetail.VoucherCode}
          onChange={handleInput}
          required
        />
        <p className="mt-1 text-sm text-red-500 hidden peer-invalid:block">
          **Please enter a voucher code
        </p>
      </div>

      {/* products total price  */}
      <div className="px-2 py-2 flex flex-col gap-1 text-black/75 text-sm bg-stone-100 rounded mt-2">
        <p className="flex justify-between">
          <span>{cartDetails.productQuantiy}x Products</span>
          <span>&#8377;{cartDetails.subTotalCharge}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span>&#8377;{cartDetails.shippingCharges}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span>
          <span>&#8377;{cartDetails.discount}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax</span>
          <span>&#8377;{cartDetails.tax}</span>
        </p>
        <p className="flex justify-between mt-1 border-t pt-1">
          <span>Total</span>
          <span className="text-lg font-semibold">
            &#8377;{cartDetails.totalCharge}
          </span>
        </p>
        <button
          className="mt-3 flex items-center justify-center w-full py-2 border border-stone-900 bg-[#BEEC6F] text-black"
          type="submit"
        >
          Pay &#8377;{3665} <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.form>
  );
};

export default PaymentDetail;
