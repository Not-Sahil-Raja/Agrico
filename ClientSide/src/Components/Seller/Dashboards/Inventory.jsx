import React from "react";

const Inventory = () => {
  const inventoryData = [
    {
      title: "Total Items",
      value: "2,345",
      change: "+15% from last month",
    },
    {
      title: "Low Stock Items",
      value: "12",
      change: "-3 from last week",
    },
    {
      title: "Out of Stock Items",
      value: "3",
      change: "+1 from last week",
    },
    {
      title: "Inventory Value",
      value: "$124,567.89",
      change: "+7.2% from last month",
    },
  ];

  const CurrentInventory = [
    {
      name: "Apples",
      quantity: 300,
      price: 0.05,
    },
    {
      name: "Carrots",
      quantity: 130,
      price: 0.29,
    },
  ];

  return (
    <div className="space-y-8 bg-stone-100 min-h-[90svh] px-3 py-2 font-Archivo mr-2">
      <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>

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

      <div className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Current Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Price </th>
                <th className="py-2 px-4 border-b text-left">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {CurrentInventory.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-left">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {product.quantity}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
