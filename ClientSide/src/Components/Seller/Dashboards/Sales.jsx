import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ResponsiveChartContainer } from "@mui/x-charts";
import { Box, Container } from "@mui/material";

const Sales = () => {
  const { getToken } = useAuth();
  const sellerDet = useSelector((state) => state.sellerDetail);

  //Storing all sales details
  const [salesDetail, setSalesDetail] = React.useState({
    averageOrderValue: 0,
    returningCustomers: 0,
    topSoldItems: [],
    totalRevenue: 0,
    weeklySalesSummary: [],
  });

  // * Fetching all the sales information about the seller
  const fetchSalesDetail = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/seller-dashboard/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sellerEmail: sellerDet.sellerDetails.email,
        },
      })
      .then((res) => {
        setSalesDetail({
          averageOrderValue: res.data.averageOrderValue,
          returningCustomers: res.data.returningCustomers,
          totalRevenue: res.data.totalRevenue,
          topSoldItems: res.data.topSoldItems,
          weeklySalesSummary: res.data.weeklySalesSummary,
        });
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchSalesDetail();
  }, []);

  //* Making the chartdata for the weekly summary
  const chartData = salesDetail.weeklySalesSummary.map((day, index) => ({
    day: `Day ${index + 1}`,
    totalSales: day.totalSales,
    totalOrders: day.totalOrders,
  }));

  return (
    <div className=" flex flex-col w-full md:h-[90svh] h-fit px-3 py-2 font-Archivo  justify-stretch bg-stone-100  rounded-md md:space-x-4 space-x-1">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <div className=" flex md:flex-row flex-col gap-3 grow md:mb-0 mb-5">
        <div className=" flex-[4] flex flex-col gap-3">
          {/* Rendering the average order , total Revenue , returningCustomers */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Revenue",
                value: salesDetail.totalRevenue,
                percentage: "+12%",
              },
              {
                title: "Returning Customers",
                value: salesDetail.returningCustomers,
                percentage: "+5%",
              },
              {
                title: "Average Order Value",
                value: salesDetail.averageOrderValue.toFixed(2),
                percentage: "+3%",
              },
            ].map((arr, index) => (
              <div
                className="bg-gradient-to-br border shadow bg-white  p-4 rounded-lg"
                key={index}
              >
                <div className="mb-1">
                  <h2 className="text-lg text-black/70">{arr.title}</h2>
                </div>

                <div className="text-3xl font-semibold mb-2">{arr.value}</div>

                <div className="text-sm flex gap-3 items-center text-black/75 font-semibold">
                  <p className=" bg-zinc-200 border border-zinc-300 px-2 py-1 rounded-full text-black/85">
                    {arr.percentage}
                  </p>
                  from last month
                </div>
              </div>
            ))}
          </div>
          {/* Rendering the LineChart */}
          <div className="border md:flex flex-col bg-white items-center p-4 rounded-lg grow">
            <p className="text-xl font-semibold mb-2">Weekly Sales Summary</p>
            <Box sx={{ width: "100%", height: "100%" }}>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: chartData.map((item) => item.day),
                  },
                ]}
                series={[
                  {
                    data: chartData.map((item) => item.totalSales),
                    label: "Total Sales",
                  },
                  {
                    data: chartData.map((item) => item.totalOrders),
                    label: "Total Orders",
                  },
                ]}
              />
            </Box>
          </div>
        </div>
        <div className=" border flex flex-col bg-white gap-3 p-4 rounded-lg grow">
          <h1 className=" text-xl font-semibold mb-2">Top Selling Products</h1>
          <div className="md:text-base text-sm flex w-full justify-between border-b mb-3 md:px-4 font-semibold text-neutral-500">
            <p>Products</p>
            <p>Total Quantity</p>
          </div>
          {salesDetail.topSoldItems.length > 0 ? (
            salesDetail.topSoldItems.map((prd, index) => (
              <div
                className=" flex bg-stone-100 border justify-between items-center px-4 py-4"
                key={index}
              >
                <div className=" max-w-32 line-clamp-2 font-semibold text-black/80 border-r leading-tight mr-1">
                  {prd.name}
                </div>
                <div className=" mr-2">{prd.totalQuantity}</div>
              </div>
            ))
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

export default Sales;
