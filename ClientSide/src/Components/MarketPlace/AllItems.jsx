import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./MarketPlaceCard/ItemCard";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Search } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const AllItems = () => {
  const { getToken } = useAuth();
  const [itemList, setItemList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const filterTypes = [
    { value: "", label: "All" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "dairy", label: "Dairy" },
    { value: "meat", label: "Meat" },
    { value: "grains", label: "Grains" },
  ];

  const fetchProducts = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/product/all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItemList(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: Search functionality

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter) {
      setFilteredItems(itemList.filter((item) => item.category === filter));
    } else {
      setFilteredItems(itemList);
    }
  };

  return (
    <>
      <div className=" h-fit flex flex-col relative pt-10 font-Archivo bg-stone-100">
        {itemList.length > 0 ? (
          <>
            <div className=" text-xl font-semibold  flex flex-col px-8  justify-center">
              <span className="text-3xl flex items-end">
                Buy AnyThing You Want
              </span>

              <span className=" opacity-70 font-normal text-base">
                Get the Best Quality Products at Best Prices.
              </span>
            </div>
            <div className=" flex items-center px-9 mt-3 mb-3">
              {/* Search area */}
              <div className="relative flex items-center border-r border-stone-300 pr-4 mr-3">
                <input
                  type="text"
                  name=""
                  id=""
                  className=" w-full h-full pl-8 py-2 text-lg rounded-full border border-stone-400 shadow-md mr-2 peer"
                />
                <Search className=" absolute w-4 h-4 top-1/2 -translate-y-1/2 left-3 text-black/65 peer-focus:text-black" />

                <button className=" bg-[#beecb0] h-full px-5 py-1 rounded-full border border-stone-500">
                  Search
                </button>
              </div>
              {filterTypes.map((filter) => (
                <label
                  key={filter.value}
                  className={`ml-4 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedFilter === filter.value
                      ? "bg-[#738d73] text-white"
                      : "bg-neutral-200 "
                  }`}
                >
                  <input
                    type="radio"
                    name="filter"
                    value={filter.value}
                    checked={selectedFilter === filter.value}
                    onChange={() => handleFilterChange(filter.value)}
                    className="hidden"
                  />
                  {filter.label}
                </label>
              ))}
            </div>
            <motion.div
              className=" h-fit w-full  grid grid-cols-4 2xl:grid-cols-5 gap-2 px-[2%] py-[2vh] row-auto "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <>
            <div className=" h-[50vh] flex justify-center items-center   ">
              <div className="  w-16 h-12 flex justify-center items-center">
                <motion.div
                  className=" "
                  initial={{ rotate: 0, opacity: 1 }}
                  animate={{ rotate: 360, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                >
                  <Loader size={30} />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllItems;

// <option value="fruits">Fruits</option>
//                 <option value="vegetables">Vegetables</option>
//                 <option value="dairy">Dairy</option>
//                 <option value="meat">Meat</option>
//                 <option value="grains">Grains</option>
