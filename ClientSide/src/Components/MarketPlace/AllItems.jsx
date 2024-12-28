import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./MarketPlaceCard/ItemCard";
import ShowCurrentState from "./ShowCurrentState";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

const AllItems = () => {
  const { getToken } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFetchingState, setCurrentFetchState] = useState("");

  const filterTypes = [
    { value: "", label: "All" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "dairy", label: "Dairy" },
    { value: "meat", label: "Meat" },
    { value: "grains", label: "Grains" },
  ];

  // ** fetching all  the products accordingly to the filter and query
  const fetchPaginatedProducts = async () => {
    const token = await getToken();
    setCurrentFetchState("loading");
    axios
      .get(`${import.meta.env.VITE_SERVER}/product/pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageSize: 10,
          pageIndex: activePage,
          category: selectedFilter,
          search: searchQuery,
        },
      })
      .then((res) => {
        setFilteredItems(res.data.productList);
        if (!res.data.productList.length) setCurrentFetchState("empty");
        else setCurrentFetchState("");
      })
      .catch((err) => {
        console.log(err);
        setCurrentFetchState("error");
      });
  };

  useEffect(() => {
    fetchPaginatedProducts();
  }, []);

  useEffect(() => {
    fetchPaginatedProducts();
  }, [selectedFilter, activePage]);

  return (
    <>
      <div className=" h-fit flex flex-col relative pt-10 font-Archivo bg-stone-100">
        <div className=" text-xl font-semibold md:text-left text-center flex flex-col px-8  justify-center">
          <span className="text-3xl flex items-end">Buy AnyThing You Want</span>
          <span className=" opacity-70 font-normal text-base">
            Get the Best Quality Products at Best Prices.
          </span>
        </div>
        <div className=" flex md:flex-row flex-col items-center gap-3 md:gap-0 md:px-9 px-2 mt-3 mb-3 overflow-hidden">
          {/* Search area */}
          <div className="relative flex items-center md:border-r border-stone-300 md:pr-4 md:mr-3">
            <input
              type="text"
              name=""
              id=""
              className=" w-full h-full pl-8 py-2 text-lg rounded-full border border-stone-400 shadow-md mr-2 peer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className=" absolute w-4 h-4 top-1/2 -translate-y-1/2 left-3 text-black/65 peer-focus:text-black" />

            <button
              className=" bg-[#beecb0] h-full px-5 py-1 rounded-full border border-stone-500"
              onClick={fetchPaginatedProducts}
            >
              Search
            </button>
          </div>
          <div className=" flex flex-wrap  gap-2">
            {/* Iterate over all the filter types */}
            {filterTypes.map((filter) => (
              <label
                key={filter.value}
                className={`ml-4 px-4 py-2 rounded-md  cursor-pointer transition-all duration-300 ease-in-out ${
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
                  onChange={() => setSelectedFilter(filter.value)}
                  className="hidden"
                />
                {filter.label}
              </label>
            ))}
          </div>
        </div>

        {/* Render all the product accordingly  */}
        {filteredItems.length > 0 ? (
          <>
            <motion.div
              className=" h-fit w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-2 gap-4 md:px-[2%] px-5 py-[2vh] row-auto "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>{" "}
          </>
        ) : (
          <ShowCurrentState currentState={currentFetchingState} />
        )}
        {/* Pagination part  */}
        <div className=" flex md:p-3 p-1 md:gap-2 gap-1 justify-center items-center w-full flex-wrap">
          <button
            className=" h-fit my-auto md:mr-6 mr-1 bg-zinc-300/75 md:px-3 md:py-1 rounded-md border border-zinc-400 disabled:opacity-65"
            onClick={() =>
              setActivePage((prevIndex) => {
                return Math.max(prevIndex - 1, 1);
              })
            }
            disabled={activePage === 1}
          >
            {" "}
            <ArrowLeft className=" w-5 h-5" />{" "}
          </button>
          {[...Array(10).keys()].map((i) => (
            <button
              key={i}
              className={`   border-neutral-400/50 rounded border aspect-square transition-colors duration-200 ease-in-out md:w-9 w-6 h-6 ${
                i + 1 === activePage
                  ? "bg-[#56684b] text-white hover:bg-[#56684b]/80"
                  : "bg-neutral-200/65 hover:bg-neutral-300/90"
              }`}
              onClick={() => setActivePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className=" h-fit my-auto md:ml-6 ml-1 bg-zinc-300/75 md:px-3 md:py-1 rounded-md border border-zinc-400 disabled:opacity-65"
            onClick={() =>
              setActivePage((prevIndex) => {
                return Math.min(prevIndex + 1, 10);
              })
            }
            disabled={activePage === 10}
          >
            {" "}
            <ArrowRight className=" w-5 h-5" />{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default AllItems;
