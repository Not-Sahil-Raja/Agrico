import React from "react";

const ListedItem = ({ item, index }) => {
  return (
    <div className="  h-[8vh]  bg-[#fffffff6] rounded-lg flex justify-between items-center px-[2%] font-Montserrat font-semibold">
      <div className=" w-[25%] py-[.75vh] whitespace-nowrap overflow-hidden h-full">
        <img
          src="https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={item.itemName + ".img"}
          className=" w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className=" w-[30%] pl-[2%] text-ellipsis whitespace-nowrap overflow-hidden">
        {item.itemName}
      </div>
      <div className=" w-[15%] whitespace-nowrap">{item.price}₹</div>
      <div className=" w-[20%] whitespace-nowrap">{item.quantity} Kg</div>
    </div>
  );
};

export default ListedItem;
