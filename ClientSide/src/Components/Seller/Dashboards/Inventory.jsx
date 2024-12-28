import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const Inventory = () => {
  const [inventoryDetails, setInventoryDetails] = React.useState({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    inventoryValue: 0,
    currentInventory: [],
  });

  const inventoryData = [
    {
      title: "Total Items",
      value: inventoryDetails.totalItems,
      change: "+15% from last month",
    },
    {
      title: "Low Stock Items",
      value: inventoryDetails.lowStockItems,
      change: "-3 from last week",
    },
    {
      title: "Out of Stock Items",
      value: inventoryDetails.outOfStockItems,
      change: "+1 from last week",
    },
    {
      title: "Inventory Value",
      value: `₹${inventoryDetails.inventoryValue}`,
      change: "+7.2% from last month",
    },
  ];

  const { getToken } = useAuth();
  const sellerDet = useSelector((state) => state.sellerDetail);

  // * Fetch Inventory Details
  const fetchInventoryDetails = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/seller-dashboard/inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sellerEmail: sellerDet.sellerDetails.email,
        },
      })
      .then((res) => {
        setInventoryDetails({
          totalItems: Math.abs(res.data.InventoryDetails.totalItems),
          lowStockItems: res.data.InventoryDetails.lowStockItems,
          outOfStockItems: res.data.InventoryDetails.outOfStockItems,
          inventoryValue: res.data.InventoryDetails.inventoryValue,
          currentInventory: res.data.currentInventory,
        });
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchInventoryDetails();
  }, []);
  return (
    <div className=" w-full space-y-8 bg-stone-100 min-h-[90svh] px-3 py-2 font-Archivo mr-2">
      <h1 className="md:text-3xl text-xl font-bold text-gray-800">
        Inventory Management
      </h1>

      {/* Inventory Card details  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {inventoryData.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">{item.title}</h2>
            </div>
            <div>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-gray-500">{item.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* List of current inventory of the seller */}
      <div className="p-4 bg-white flex flex-col rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Current Inventory</h2>
        </div>
        <div className="overflow-x-auto ">
          {inventoryDetails.currentInventory &&
          inventoryDetails.currentInventory.length > 0 ? (
            <table className="w-full  bg-white md:text-base text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">Price (₹)</th>
                  <th className="py-2 px-4 border-b text-left">
                    Total Value (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryDetails.currentInventory.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-left">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {product.quantity}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" min-w-full h-48 bg-white rounded-md flex items-center justify-center">
              <p>Not Enough Data To Show !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
