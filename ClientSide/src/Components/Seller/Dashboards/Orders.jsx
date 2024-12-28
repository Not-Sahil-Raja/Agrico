import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = () => {
  const sellerDet = useSelector((state) => state.sellerDetail);
  const { getToken } = useAuth();
  const [orderDetail, setOrderDetail] = React.useState({
    AverageOrderValue: 0,
    CompletedOrders: 0,
    PendingOrders: 0,
    TotalOrders: 0,
    RecentOrders: [],
  });

  // * All the stats for this page
  const stats = [
    {
      title: "Total Orders",
      value: orderDetail.TotalOrders,
      change: "+18% from last month",
    },
    {
      title: "Pending Orders",
      value: orderDetail.PendingOrders,
      change: "-5 from yesterday",
    },
    {
      title: "Completed Orders",
      value: orderDetail.CompletedOrders,
      change: "+22% from last month",
    },
    {
      title: "Average Order Value",
      value: `₹${orderDetail.AverageOrderValue.toFixed(2)}`,
      change: "+3.2% from last month",
    },
  ];

  // * Fetch the order details for the dashboards
  const fetchOrderDetails = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/seller-dashboard/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sellerEmail: sellerDet.sellerDetails.email,
        },
      })
      .then((res) => {
        setOrderDetail({
          AverageOrderValue: res.data.AverageOrderValue,
          CompletedOrders: res.data.CompletedOrders,
          PendingOrders: res.data.PendingOrders,
          TotalOrders: res.data.TotalOrders,
          RecentOrders: res.data.RecentOrders,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="space-y-8 bg-stone-100 min-h-[90svh] px-3 py-2 font-Archivo md:mr-2">
      <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>

      {/* Rendering all the stats  */}
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
        {/* Rendering All the recent orders */}
        <div className="mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            {orderDetail.RecentOrders.length ? (
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
                  {orderDetail.RecentOrders.map((order, index) => (
                    <tr
                      key={index}
                      className=" hover:bg-zinc-100 transition-colors"
                    >
                      <td className="py-2 px-4 border-b text-left">
                        {order.shippingDetail.CustomerName}
                      </td>
                      <td className="py-2 px-4 border-b text-left">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b text-left">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-left ">
                        <p
                          className={` ${
                            order.status == "processing"
                              ? "bg-yellow-300/75"
                              : "bg-green-400/50"
                          } rounded w-fit px-2`}
                        >
                          {order.status}
                        </p>
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
    </div>
  );
};

export default Orders;
