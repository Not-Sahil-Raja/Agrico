import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ShippingDetail = ({
  setCheckOutStage,
  cartDetails,
  setShippingDetail,
  shippingDetail,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const handleShippingDetail = (e) => {
    e.preventDefault();
    if (
      !shippingDetail.CustomerName ||
      !shippingDetail.Country ||
      !shippingDetail.Address ||
      !shippingDetail.City ||
      !shippingDetail.State ||
      !shippingDetail.PostalCode ||
      !shippingDetail.PhoneNumber
    )
      return;
    setCheckOutStage("payment");
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
      onSubmit={handleShippingDetail}
      noValidate
    >
      <h2 className=" text-center text-lg">Shipping Address</h2>
      <div className="mb-3 mt-2">
        <label
          htmlFor="Name"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          Name
        </label>
        <input
          type="text"
          id="Name"
          className="appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          value={shippingDetail.CustomerName}
          onChange={(e) =>
            setShippingDetail({
              ...shippingDetail,
              CustomerName: e.target.value,
            })
          }
          required
        />
        <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
          **Please enter your name
        </p>
      </div>
      <div className="mb-2 ">
        <label
          htmlFor="country"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          value={shippingDetail.Country}
          onChange={(e) =>
            setShippingDetail({ ...shippingDetail, Country: e.target.value })
          }
          required
        />
        <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
          **Please enter your country
        </p>
      </div>
      <div className="mb-2 mt-2">
        <label
          htmlFor="Address"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          Address
        </label>
        <input
          type="text"
          id="Address"
          className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          value={shippingDetail.Address}
          onChange={(e) =>
            setShippingDetail({ ...shippingDetail, Address: e.target.value })
          }
          required
        />
        <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
          **Please enter your address
        </p>
      </div>
      <div className="mb-2 mt-2">
        <label
          htmlFor="City"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          City
        </label>
        <input
          type="text"
          id="City"
          className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          value={shippingDetail.City}
          onChange={(e) =>
            setShippingDetail({ ...shippingDetail, City: e.target.value })
          }
          required
        />
        <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
          **Please enter your city
        </p>
      </div>
      <div className=" mb-2 mt-2 flex gap-2">
        <div className=" flex-1">
          <label
            htmlFor="State/Region"
            className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
          >
            State/Region
          </label>
          <input
            type="text"
            id="State/Region"
            className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
            value={shippingDetail.State}
            onChange={(e) =>
              setShippingDetail({ ...shippingDetail, State: e.target.value })
            }
            required
          />
          <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
            **Please enter your state/region
          </p>
        </div>

        <div className=" flex-1">
          <label
            htmlFor="PostalCode"
            className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="PostalCode"
            className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
            value={shippingDetail.PostalCode}
            onChange={(e) =>
              setShippingDetail({
                ...shippingDetail,
                PostalCode: e.target.value,
              })
            }
            required
          />
          <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
            **Please enter your postal code
          </p>
        </div>
      </div>
      <div className="mb-2 mt-2">
        <label
          htmlFor="PhoneNumber"
          className="block text-gray-700 text-sm pl-1 mb-1 leading-none"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="PhoneNumber"
          className=" appearance-none border focus:border-stone-500 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
          value={shippingDetail.PhoneNumber}
          onChange={(e) =>
            setShippingDetail({
              ...shippingDetail,
              PhoneNumber: e.target.value,
            })
          }
          required
        />
        <p className=" mt-1 hidden text-sm text-red-500 peer-invalid:block">
          **Please enter your phone number
        </p>
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
          type="submit"
          className=" mt-3 flex items-center justify-center w-full py-2 border border-stone-900 bg-[#BEEC6F] text-black disabled:opacity-75 "
          disabled={cartItems.length == 0}
        >
          Next
        </button>
      </div>
    </motion.form>
  );
};

export default ShippingDetail;
