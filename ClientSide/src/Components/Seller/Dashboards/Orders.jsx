import React from "react";

const Orders = () => {
  const recentOrders = [
    {
      customer: "Jane Smith",
      date: "2023-06-01",
      total: 125,
      status: "Delivered",
    },
    {
      customer: "Bob Johnson",
      date: "2023-06-03",
      total: 225.299,
      status: "Shipped",
    },
  ];
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      change: "+18% from last month",
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "-5 from yesterday",
    },
    {
      title: "Completed Orders",
      value: "1,180",
      change: "+22% from last month",
    },
    {
      title: "Average Order Value",
      value: "$78.35",
      change: "+3.2% from last month",
    },
  ];

  return (
    <div className="space-y-8 bg-stone-100 min-h-[90svh] px-3 py-2 font-Archivo mr-2">
      <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white border  rounded-lg shadow">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">{stat.title}</h2>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Customer</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-zinc-100 transition-colors"
                  >
                    <td className="py-2 px-4 border-b text-left">
                      {order.customer}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {order.date}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
