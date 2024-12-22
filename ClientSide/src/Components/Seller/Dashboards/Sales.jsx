import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Sales = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  const TopSellingProduct = [
    {
      name: "Strawberry",
      sales: "200Kg",
      img: "./strawberry.jpg",
    },
    {
      name: "Rice",
      sales: "500kg",
      img: "./rice-image.jpg",
    },
  ];

  return (
    <div className=" flex flex-col w-full h-[90svh] px-3 py-2 font-Archivo  justify-stretch bg-stone-100  rounded-md space-x-4 ">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <div className=" flex gap-3 grow">
        <div className=" flex-[4] flex flex-col gap-3">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Sales",
                value: "$124,567.89",
                percentage: "+12%",
              },
              {
                title: "Returning Customers",
                value: "28%",
                percentage: "+5%",
              },
              {
                title: "Average Order Value",
                value: "$101.23",
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
          <div className=" border flex flex-col bg-white  p-4 rounded-lg grow">
            <p className=" text-xl font-semibold mb-2">Sales Summary</p>
            <LineChart
              series={[
                { data: pData, label: "pv", yAxisId: "leftAxisId" },
                { data: uData, label: "uv", yAxisId: "rightAxisId" },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
              rightAxis="rightAxisId"
            />
          </div>
        </div>
        <div className=" border flex flex-col bg-white gap-2 p-4 rounded-lg grow">
          <h1 className=" text-xl font-semibold mb-2">Top Selling Products</h1>
          <div className=" flex w-full justify-between border-b mb-3 px-4 font-semibold text-neutral-500">
            <p>Products</p>
            <p>Earning</p>
          </div>
          {TopSellingProduct.map((prd, index) => (
            <div
              className=" flex border justify-between items-center px-2 py-1"
              key={index}
            >
              <img
                src={prd.img}
                alt={prd.img}
                className=" w-16 h-16 rounded "
              />
              <div className="  max-w-32 line-clamp-2 ">{prd.name}</div>
              <div className=" mr-2">{prd.sales}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
