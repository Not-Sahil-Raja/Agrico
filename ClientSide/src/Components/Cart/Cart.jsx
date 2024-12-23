import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "./CartCard";
import { useState } from "react";
import { CheckSquare, X, HandCoins } from "lucide-react";
import { emptyCart, addSellDet } from "../../Apps/cartSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

import axios from "axios";

const Cart = () => {
  const { getToken } = useAuth();

  const [selectedOptions, setSelectedOptions] = useState("Gpay");
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  //for checkout

  //only used for checkout

  const [payDonePop, setPayDonePop] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let count = 0;
    cartItems.map((item) => {
      count += item.price;
    });
    setTotal(count);
  }, []);

  useEffect(() => {}, [cartItems]);

  const [payDetails, setPayDetails] = useState({});

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    const token = await getToken();

    axios
      .post(
        `${import.meta.env.VITE_SERVER}/orders/place-orders`,
        {
          products: cartItems,
          userName: name,
          userEmail: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPayDonePop(true);
      })
      .catch((err) => console.log(err));
  };

  const PlaceOrder = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/orders/place-orders`, cartItems)
      .catch((err) => {
        console.log("Axios Issue! : ", err);
      });
    console.log("PayNow");
    setPayDonePop(true);
    dispatch(emptyCart());
    setName("");
    setPhoneNo("");
    setEmail("");
    setAddress("");
    setLandmark("");
    setTotal(0);
    setDiscount(0);
    setDeliveryCharges(0);
  };

  const handleOptionChange = (e) => {
    setSelectedOptions(e.target.value);
  };

  return (
    <div className=" overflow-hidden">
      <motion.div
        className={`absolute z-50 scale-90 font-WorkSans text-lg h-[50vh] w-[40vw]  bg-[#ffffff]  rounded-lg font-semibold shadow-inner border border-[#00000054] top-1/2 left-1/2 `}
        animate={{
          transform: payDonePop
            ? "translate(-50%,-50%) scale(1) "
            : "translate(-50%,-900%) scale(0) ",
          opacity: payDonePop ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          mass: 0.3,
          damping: 10,
          ease: [0.85, 0, 0.15, 1],
        }}
      >
        <div className="w-full h-full relative flex items-center">
          <div className="w-fit h-fit p-1 top-[2%] left-[2%] absolute ">
            <X
              className="cursor-pointer"
              size={25}
              onClick={() => setPayDonePop(false)}
            />
          </div>
          <div className=" h-full flex-[1.2] flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center gap-2">
              <div className=" bg-[black] p-4 rounded-full ">
                <HandCoins size={50} className=" text-white" />
              </div>
              <div className=" flex flex-col leading-none justify-center items-center">
                <span className=" text-[#000000af] font-semibold ">Amount</span>
                <span className=" font-bold">{payDetails.total}₹</span>
              </div>
            </div>
          </div>
          <div className=" h-[90%] flex-[2] my-4 border-l-2 border-l-[#0000003a]">
            <div className=" h-[75%] pl-[2%] flex flex-col justify-evenly">
              <div className=" flex w-full">
                <span className=" font-medium opacity-80">Receipt Name</span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.name}
                </span>
              </div>
              <div className=" flex w-full ">
                <span className=" font-medium opacity-80">Receipt Email</span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.email}
                </span>
              </div>
              <div className=" flex w-full">
                <span className=" font-medium opacity-80">Receipt PhoneNo</span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.phoneNo}
                </span>
              </div>
              <div className=" flex w-full">
                <span className=" font-medium opacity-80">Receipt Address</span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.address}
                </span>
              </div>
              <div className=" flex w-full">
                <span className=" font-medium opacity-80">
                  Receipt Landmark
                </span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.landmark}
                </span>
              </div>
              <div className=" flex w-full">
                <span className=" font-medium opacity-80">Payment Method</span>
                <span className=" font-semibold ml-auto pr-3">
                  {payDetails.paymentMethod}
                </span>
              </div>
            </div>
            <div className=" h-[25%] px-[10%] py-[5%]   flex justify-center items-center">
              <motion.button
                className=" bg-[#256d31] text-white w-full h-full rounded-md"
                whileHover={{ backgroundColor: "#319241" }}
                whileTap={{ scale: 0.9 }}
              >
                Confirm & Pay Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className=" bg-[#fffff2] w-full h-[100vh] overflow-hidden pt-[9vh] px-[1vw] pb-[2vh] select-none relative"
        style={{
          filter: payDonePop ? "blur(5px) brightness(50%)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            type: "spring",
            delay: 0.1,
            ease: "easeInOut",
            stiffness: 100,
          },
        }}
      >
        <motion.div className={`flex w-full h-[full]`}>
          <div className=" flex-1  h-[88vh]">
            <div className="  flex-col  h-[88vh] px-[4vw] py-[2vh] ">
              <motion.div
                className=" h-[60%]  bg-[#0000000e] shadow-inner rounded-lg backdrop-blur-md py-[3vh] relative px-[5vw]  overflow-y-scroll scrollbar-hide flex flex-col gap-[1.5vh]
                
              "
              >
                <div className=" text-xl font-Archivo font-semibold pl-[.2vw] ">
                  Order Summary
                </div>

                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <CartCard key={index} item={item} />
                  ))
                ) : (
                  <>
                    <div>Cart Is Empty</div>
                  </>
                )}
              </motion.div>

              <div className=" bg-[#d8d8d850] mt-[3vh] h-[35%] w-full rounded-lg">
                <div></div>
              </div>
            </div>
          </div>
          <div className="  flex-1 px-[1vw] py-[2vh] flex items-center justify-center">
            <div className="  bg-[#d8d8d87a] rounded-md border-2 border-[#c4c4c498] shadow-inner h-[97%] w-[65%] m-[1vw] flex flex-col px-[1vw] py-[1vh]">
              <span className=" text-lg font-semibold font-Archivo">
                Payment Details
              </span>
              <span className=" text-[#000000c7] font-Archivo ">
                Complete your purchase by providing payment details
              </span>
              <form
                onSubmit={paymentSubmitHandler}
                className="  pt-[1vh] h-full flex flex-col justify-between px-[2vw] pb-[5vh] w-full rounded-md"
              >
                <div className=" h-[75%] flex flex-col justify-evenly px-[.3vw]">
                  <div className=" flex w-full justify-evenly mb-[3vh] h-[15%] items-center gap-[1vw]">
                    <div className=" flex-1 h-full flex justify-center items-center border border-[#3b3737] bg-[#0000001a] backdrop-blur-md rounded-md  whitespace-nowrap cursor-pointer">
                      <input
                        type="radio"
                        value="Gpay"
                        id="Gpay"
                        className=" mr-[.5vw]"
                        onChange={handleOptionChange}
                        checked={selectedOptions === "Gpay"}
                      />
                      <label
                        htmlFor="Gpay"
                        className=" cursor-pointer font-Archivo  text-sm font-semibold"
                      >
                        Gpay
                      </label>
                    </div>
                    <div className=" flex-1 h-full flex justify-center items-center border border-[#3b3737] bg-[#0000001a] backdrop-blur-md rounded-md  whitespace-nowrap cursor-pointer">
                      <input
                        type="radio"
                        value="PhonePe"
                        id="PhonePe"
                        className=" mr-[.5vw]"
                        onChange={handleOptionChange}
                        checked={selectedOptions === "PhonePe"}
                      />
                      <label
                        htmlFor="PhonePe"
                        className=" cursor-pointer font-Archivo  text-sm font-semibold"
                      >
                        PhonePe
                      </label>
                    </div>
                    <div className=" flex-1 h-full flex justify-center items-center border border-[#3b3737] bg-[#0000001a] backdrop-blur-md rounded-md  whitespace-nowrap cursor-pointer">
                      <input
                        type="radio"
                        value="COD"
                        id="COD"
                        className=" mr-[.5vw]"
                        onChange={handleOptionChange}
                        checked={selectedOptions === "COD"}
                      />
                      <label
                        htmlFor="COD"
                        className=" cursor-pointer font-Archivo  text-sm font-semibold"
                      >
                        COD
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-[1vw]  w-full h-1/5  justify-evenly">
                    <div className=" w-full relative ">
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="absolute z-0 w-full outline-none border-b-[#2e2e2e3a] focus:bg-[#00000010]  focus:border-b-[#2e2e2e] border-b-2 pb-[.2vh] focus:outline-none bg-transparent transition-all px-[.5vw]   font-Archivo h-[59%]"
                      />
                      <span className="  absolute z-10 left-[2.5%] top-[-30%] font-Archivo text-sm font-semibold text-[#000000c9]">
                        Your Name
                      </span>
                    </div>
                  </div>
                  <div className=" flex gap-[1vw]  w-full h-1/5  justify-evenly ">
                    <div className=" w-1/2 relative ">
                      <input
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        type="phone"
                        className="absolute z-0 w-full outline-none border-b-[#2e2e2e3a] focus:bg-[#00000010]  focus:border-b-[#2e2e2e] border-b-2 pb-[.2vh] focus:outline-none bg-transparent transition-all px-[.5vw] h-[59%]  font-Archivo"
                      />
                      <span className=" absolute z-10 left-[5%] top-[-30%] font-Archivo text-sm font-semibold text-[#000000c9]">
                        PhoneNo
                      </span>
                    </div>

                    <div className=" w-1/2 relative ">
                      <input
                        required
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="absolute z-0 w-full outline-none border-b-[#2e2e2e3a] focus:bg-[#00000010]  focus:border-b-[#2e2e2e] border-b-2 pb-[.1vh] focus:outline-none bg-transparent transition-all px-[.5vw] h-[59%] font-Archivo"
                      />
                      <span className=" absolute z-10 left-[5%] top-[-30%] font-Archivo text-sm font-semibold text-[#000000c9]">
                        Email Address
                      </span>
                    </div>
                  </div>
                  <div className=" flex gap-[1vw] h-1/5  w-full  justify-evenly ">
                    <div className=" w-1/2 relative ">
                      <input
                        required
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="absolute z-0 w-full outline-none border-b-[#2e2e2e3a] focus:bg-[#00000010]  focus:border-b-[#2e2e2e] border-b-2 pb-[.2vh] focus:outline-none bg-transparent transition-all px-[.5vw] h-[59%]  font-Archivo"
                      />
                      <span className=" absolute z-10 left-[5%] top-[-30%] font-Archivo text-sm font-semibold text-[#000000c9]">
                        Address
                      </span>
                    </div>

                    <div className=" w-1/2 relative ">
                      <input
                        required
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="absolute z-0 w-full outline-none border-b-[#2e2e2e3a] focus:bg-[#00000010]  focus:border-b-[#2e2e2e] border-b-2 pb-[.2vh] focus:outline-none bg-transparent transition-all px-[.5vw] h-[59%]  font-Archivo"
                      />
                      <span className=" absolute z-10 left-[5%] top-[-30%] font-Archivo text-sm font-semibold text-[#000000c9]">
                        LandMark
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className=" flex flex-col font-Archivo border-t pt-[2vh] border-[#202020] text-sm">
                    <div className=" flex">
                      <span>SubTotal:</span>
                      <span className=" ml-auto pr-[1vw]">{total}.00₹</span>
                    </div>
                    <div className=" flex">
                      <span>Discount:</span>
                      <span className=" ml-auto pr-[1vw]">{discount}.00₹</span>
                    </div>
                    <div className=" flex">
                      <span>Delivery Charges:</span>
                      <span className=" ml-auto pr-[1vw]">
                        {deliveryCharges}.00₹
                      </span>
                    </div>
                    <div className=" flex text-base font-semibold">
                      <span>Total:</span>
                      <span className=" ml-auto pr-[1vw]">
                        {total + discount + deliveryCharges}.00₹
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <input
                      required
                      type="submit"
                      value={
                        "Proceed To Pay " +
                        (total + discount + deliveryCharges) +
                        ".00 ₹"
                      }
                      className=" bg-[#1d3128] text-[white] font-Archivo rounded-md mt-[2vh] p-[1vh] w-full cursor-pointer hover:bg-[#476e5d] transition-all"
                      disabled={cartItems.length === 0}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Cart;
