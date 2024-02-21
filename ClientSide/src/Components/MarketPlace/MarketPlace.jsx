import React, { useEffect } from "react";
import { Search, MoveRight, XSquare, CheckSquare2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import ListedItem from "./ListedItem";
import AllItems from "./AllItems";
import { useSelector } from "react-redux";

const MarketPlace = () => {
  const userInfos = useSelector((state) => state.userInfo.userInfo);

  const [marType, setMarType] = useState(0);
  const [additemCheck, setAdditemCheck] = useState(false);
  const [addedPop, setAddedPop] = useState(false);

  const [refresh, setRefresh] = useState(0);

  const [addedItemList, setAddedItemList] = useState([]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // console.log(addedItemList);

  useEffect(() => {
    axios
      .get("http://localhost:3000/itemsList")
      .then((res) => {
        setAddedItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const addItem = (e) => {
    e.preventDefault();
    const item = {
      itemName: itemName,
      price: price,
      quantity: quantity,
      username: "username",
    };
    axios
      .post("http://localhost:3000/Allitems", item)
      .then((res) => {
        console.log(res.data);
        setAddedPop(true);
        setTimeout(() => {
          setAddedPop(false);
          setItemName("");
          setPrice("");
          setQuantity("");
        }, 2000);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Item Added");
  };

  return (
    <>
      <div className="   bg-[#fffff2] w-full h-[100vh]  overflow-hidden select-none">
        <div className=" w-full h-[40vh] bg-slate-300 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className=" w-[100vw] h-[50vh] object-cover brightness-[.3] absolute z-10"
          />

          <div className=" absolute z-20 top-1/2 left-1/2  text-[white] w-[50%] h-[25vh]  [transform:translate(-50%,-30%)] flex-col flex items-center justify-around">
            <div className=" text-center">
              <div className=" text-2xl font-semibold font-NunitoSans">
                Find What You Want
              </div>
              <div className=" text-[#ffffffc0]">
                You can find products available near you
              </div>
            </div>
            <div className=" w-[30vw] flex bg-[white] py-[.75vh] px-[.5vw] items-center rounded-lg gap-[.3vw]">
              <div>
                <Search className=" scale-[.80] text-[#3d3232]" />
              </div>
              <input
                type="text"
                placeholder="Search for products"
                className="  h-[3vh] w-full bg-transparent border-none text-[#3d3232] font-NunitoSans focus:outline-none px-[.5vw]"
              />
            </div>
            <div className=" my-[.6vh]">
              <button className=" px-[.8vw] font-NunitoSans border-2 rounded-2xl flex items-center justify-center hover:bg-[#0000008c]">
                Search
                <MoveRight className=" scale-75" />
              </button>
            </div>
          </div>
        </div>

        {/* marketPlace */}
        <div className="  relative overflow-y-scroll h-[60vh] scrollbar-hide px-[1vw] py-[2vh]">
          <div className=" absolute w-[92vw] left-[4%] py-[1vh] z-40  flex items-center backdrop-blur-md rounded-3xl">
            <div className=" flex px-[2vw] gap-[.5vw] justify-around w-[15vw]">
              <div
                className={` px-[1vw] py-[.8vh] rounded-lg border border-[#3f3838] transition-all  font-medium whitespace-nowrap cursor-pointer ${
                  marType === 0
                    ? "bg-[#3f3838] shadow-inner text-[#ffffff] "
                    : "hover:backdrop-blur-sm "
                }`}
                onClick={() => setMarType(0)}
              >
                All
              </div>
              {/* <div
                className={` px-[1vw] py-[.8vh] rounded-lg border border-[#3f3838] transition-all  font-medium whitespace-nowrap cursor-pointer ${
                  marType === 1
                    ? "bg-[#3f3838] shadow-inner text-[#ffffff] "
                    : "hover:backdrop-blur-sm "
                }`}
                onClick={() => setMarType(1)}
              >
                Filter
              </div> */}
            </div>
            <div className=" ml-auto py-[.2vh] px-[.5vw] rounded-lg  drop-shadow-md  mx-[2vw] flex justify-around items-center gap-[1vw] border border-[#3f3838]">
              <img
                src=" https://images.unsplash.com/photo-1612736231323-e7bcba8fcbaf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className=" w-[2.3rem] h-[2.3rem] object-cover rounded-lg"
              />
              <div className=" flex flex-col  flex-[2] text-sm font-medium ">
                <p>Need Help? </p>
                <span>Ask a specalist</span>
              </div>
            </div>
          </div>

          {/* marketPlace card showing areas */}
          <div className=" w-[100vw] flex justify-evenly items-end ">
            <div className="  w-[60%] h-[55vh] pt-[10vh] overflow-hidden relative ">
              <div
                className={`h-[43vh]  w-full bg-[#0000000a] shadow-inner rounded px-[1%] py-[1%] overflow-y-scroll scrollbar-hide text-3xl absolute transition-all   ${
                  marType === 0 ? "left-[0%]  delay-0" : "left-[100%] delay-100"
                }  `}
              >
                <AllItems />
              </div>
              <div
                className={`h-[80vh] w-full bg-green-500 overflow-y-scroll scrollbar-hide text-3xl absolute  z-50 transition-all ${
                  marType === 1 ? "left-[0%] delay-0" : "left-[100%] delay-100"
                }`}
              >
                Offline
              </div>
            </div>

            <div className="  w-[30%] h-[45vh]  rounded-lg relative drop-shadow-md overflow-hidden">
              <div className=" h-full bg-gradient-to-r from-lightYellow via-lightOrange to-extralightYellow flex flex-col overflow-hidden  ">
                <div
                  className={` px-[2%] py-[2%] text-sm absolute  h-[33vh] w-full  transition-transform ${
                    additemCheck
                      ? "translate-x-0"
                      : " [transform:translate(0%,-120%)]"
                  } `}
                >
                  <form
                    onSubmit={addItem}
                    className=" cursor-pointer h-full relative flex flex-col justify-evenly bg-[#2b2b2b27] backdrop-blur-sm px-[2%] py-[2%] rounded-lg font-Montserrat font-semibold"
                  >
                    <span
                      className=" absolute z-30 right-[-1%] top-[-3%]"
                      onClick={() => setAdditemCheck(!additemCheck)}
                    >
                      <XSquare className=" hover:rotate-12 transition-all" />
                    </span>
                    <div className=" flex flex-col relative">
                      <label htmlFor="name" className=" absolute top-[-70%]">
                        Item Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className=" w-full h-[5vh] border-2 bg-[#0000002d] border-[#03030362] rounded-lg px-[1%] font-Montserrat font-semibold focus:outline-none focus:bg-[#ffffffaf] transition-all  hover:border-[#201c1c]"
                      />
                    </div>
                    <div className=" flex flex-col relative">
                      <label htmlFor="" className=" absolute top-[-70%]">
                        Item Price
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className=" w-full h-[5vh] border-2 bg-[#0000002d] border-[#03030362] rounded-lg px-[1%] font-Montserrat font-semibold focus:outline-none transition-all  hover:border-[#201c1c] focus:bg-[#ffffffaf] "
                      />
                    </div>
                    <div className=" flex flex-col relative">
                      <label htmlFor="" className=" absolute top-[-70%]">
                        Item Quantity
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className=" w-full h-[5vh] border-2 bg-[#0000002d] border-[#03030362] rounded-lg px-[1%] font-Montserrat font-semibold focus:outline-none transition-all  hover:border-[#201c1c] focus:bg-[#ffffffaf]"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Add Item"
                      className=" absolute bottom-[-10%] left-[50%] [transform:translate(-50%,-20%)] bg-[#201c1c] text-[#ffffff] rounded-lg px-[5%] py-[1.2%] font-Montserrat font-semibold hover:bg-[#0f0f0f] transition-all cursor-pointer"
                    />
                  </form>
                  <div
                    className={` text-md font-semibold flex bg-[#56ff56] text-[#000000] w-[35%] py-[1vh] rounded-md justify-evenly items-center drop-shadow-lg shadow-inner absolute bottom-[-23%] right-[5%] transition-transform ${
                      addedPop
                        ? "[transform:translate(-20%,40%)]"
                        : "[transform:translate(130%,40%)]"
                    }`}
                  >
                    <CheckSquare2 className=" " size={20} /> Item Added
                  </div>
                </div>
                <div
                  className={`  h-[15%] px-[2%] py-[2%] text-sm  ${
                    additemCheck ? "mt-auto" : " mt-0 "
                  }`}
                >
                  <button
                    className={`bg-transparent text-[#292929] border-2 border-[#201c1c] hover:bg-[#0f0f0f28] transition-all font-Archivo font-semibold w-full h-full rounded 
                    ${additemCheck ? "scale-0" : "hover:backdrop-blur-md"}
                    `}
                    onClick={() => setAdditemCheck(!additemCheck)}
                    disabled={!userInfos.username}
                  >
                    ADD NEW ITEM
                  </button>
                </div>
                <div
                  className={`absolute bottom-[0vh] backdrop-blur-md shadow-inner bg-[#00000011] w-full h-[80%] transition-transform overflow-y-scroll scrollbar-hide ${
                    additemCheck ? "[transform:translate(0%,100%)]" : ""
                  } `}
                >
                  <div className="  w-full flex flex-col gap-[1vh] px-[1vw] py-[1.5vh]">
                    {addedItemList.map((item, index) => {
                      return (
                        <ListedItem item={item} index={index} key={index} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
