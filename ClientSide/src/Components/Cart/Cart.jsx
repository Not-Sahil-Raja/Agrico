import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "./CartCard";
import { useState } from "react";
import { CheckSquare, XCircle } from "lucide-react";
import { emptyCart } from "../../Apps/cartSlice";

const Cart = () => {
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

  const paymentSubmitHandler = (e) => {
    e.preventDefault();
    const paymentDetails = {
      name,
      phoneNo,
      email,
      address,
      landmark,
      paymentMethod: selectedOptions,
      total: total + discount + deliveryCharges,
    };
    setPayDetails(paymentDetails);
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
  console.log("Payment Submitted", payDetails);
  const handleOptionChange = (e) => {
    setSelectedOptions(e.target.value);
  };

  // console.log(cartItems);
  return (
    <>
      <div className=" bg-[#fffff2] w-full h-[100vh] overflow-hidden pt-[9vh] px-[1vw] pb-[2vh] select-none relative">
        <div
          className={`absolute z-50 text-lg h-[40vh] font-Archivo bg-[#f5fdf8] px-[2vw] py-[3vh] rounded-lg font-semibold shadow-inner border border-[#4b4b4b] top-1/2 left-1/2 transition-all ${
            payDonePop
              ? "[transform:translate(-50%,-50%)]"
              : "[transform:translate(-50%,-900%)]"
          } `}
        >
          <XCircle
            className=" absolute top-[-3%] right-[-5%] bg-white rounded-full cursor-pointer hover:scale-110 transition-all"
            onClick={() => setPayDonePop(false)}
          />

          <span className=" flex">
            <CheckSquare className=" scale-90 " /> Payment Done
          </span>
          <div className=" text-base font-medium font-Epilogue flex-col flex justify-evenly h-[80%] items-start">
            <span>Name: {payDetails.name}</span>
            <span>email: {payDetails.email}</span>
            <span>phoneNo: {payDetails.phoneNo}</span>
            <span>address: {payDetails.address}</span>
            <span>landmark: {payDetails.landmark}</span>
            <span>Payment Method: {payDetails.paymentMethod}</span>
            <span>Total: {payDetails.total} ₹ </span>
          </div>
        </div>
        <div
          className={`flex w-full h-[full] ${
            payDonePop ? "pointer-events-none blur" : ""
          } `}
        >
          <div className=" flex-1  h-[88vh]">
            <div className="  flex-col  h-[88vh] px-[4vw] py-[2vh] ">
              <div className=" h-[60%]  bg-[#0000000e] shadow-inner rounded-lg backdrop-blur-md py-[3vh] relative px-[5vw]  overflow-y-scroll scrollbar-hide flex flex-col gap-[1.5vh]">
                <div className=" text-xl font-Archivo font-semibold pl-[.2vw] ">
                  Order Summary
                </div>
                <div
                  className={`absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] font-Poppins shadow-inner bg-[#00000017] transition-all px-[1vw] py-[2vh] ${
                    cartItems.length < 0 ? "scale-100 " : " opacity-0"
                  }`}
                >
                  Add Someting To Cart
                </div>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <CartCard key={index} item={item} />
                  ))
                ) : (
                  <></>
                )}
              </div>

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
                        "Pay " + (total + discount + deliveryCharges) + ".00 ₹"
                      }
                      className=" bg-[#1d3128] text-[white] font-Archivo rounded-md mt-[2vh] p-[1vh] w-full cursor-pointer hover:bg-[#476e5d] transition-all"
                      disabled={cartItems.length === 0}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
