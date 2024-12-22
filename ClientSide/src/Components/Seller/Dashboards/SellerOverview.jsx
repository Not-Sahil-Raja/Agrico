import { ArrowUp, ArrowUpRightIcon, Crown } from "lucide-react";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 200,
  height: 200,
  value: 60,
};

const PopularProducts = [
  {
    name: "Product 1",
    sales: 100,
    revenue: 5000,
  },
  {
    name: "Product 2",
    sales: 200,
    revenue: 10000,
  },
  {
    name: "Product 3",
    sales: 300,
    revenue: 15000,
  },
  {
    name: "Product 4",
    sales: 400,
    revenue: 20000,
  },
  {
    name: "Product 5",
    sales: 500,
    revenue: 25000,
  },
];

const SellerOverview = () => {
  return (
    <div className=" flex flex-col w-full h-fit px-3 py-2 font-Archivo justify-stretch bg-stone-100 rounded-md ">
      <div className=" mb-2">
        <h1 className="text-2xl font-semibold">Welcome User</h1>
        <p className=" text-black/50 font-semibold">
          Here is a quick overview of your sales and other detail.
        </p>
      </div>
      <div className=" flex h-[77svh] gap-2 mb-2">
        <div className=" flex-1  flex flex-col gap-3">
          <div className="  flex gap-2">
            {[
              {
                title: "Total Sales",
                value: "100000",
              },
              {
                title: "Total Orders",
                value: "8500",
              },
            ].map((arr, index) => (
              <div
                className=" grow flex flex-col border border-stone-300 bg-white rounded-lg shadow"
                key={index}
              >
                <div className=" flex flex-col px-3 py-2 h-full gap-2">
                  <h2 className=" text-xl font-semibold">{arr.title}</h2>
                  <p className=" text-3xl font-semibold py-1 px-3">
                    {arr.value}
                  </p>
                  <div className="flex gap-2 text-black/70">
                    <p className=" flex gap-1 bg-green-200 text-green-800 border border-green-400 rounded-full px-1 font-semibold">
                      <ArrowUp className=" w-4 font-semibold" /> 5%
                    </p>
                    vs last month
                  </div>
                </div>

                <div className=" flex bg-stone-200 font-semibold text-black/60 border-t border-stone-300 px-4 py-5 justify-between">
                  <p>View More</p>{" "}
                  <p className=" bg-white border border-stone-400 p-1 rounded-full">
                    <ArrowUpRightIcon className=" w-4 h-4" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex grow">
            <div className=" grow flex flex-col border border-stone-300 bg-white rounded-lg shadow">
              <div className=" flex flex-col px-3 py-2 h-full gap-2 justify-around">
                <h2 className=" text-xl font-semibold">Customers</h2>
                <p className=" text-3xl font-semibold py-1 px-3">64.25</p>
                <div className=" flex items-center justify-between">
                  <div className="flex gap-2 text-black/70">
                    <p className=" flex gap-1 bg-green-200 text-green-800 border border-green-400 rounded-full px-1 font-semibold">
                      <ArrowUp className=" w-4 font-semibold" /> 5%
                    </p>
                    vs last month
                  </div>
                  <div className=" flex border-2 border-b-4 rounded-lg px-3 py-2 mr-7 items-center justify-between">
                    <div className=" bg-[#d1ffd1] h-full aspect-square flex items-center justify-center rounded-lg border-2 border-[#84da73] mr-4 p-2">
                      <Crown className=" text-[#3aaa3a]" />
                    </div>
                    <div className=" flex flex-col px-2">
                      <p className=" text-lg font-semibold">3,251</p>
                      <p className=" text-black/70">New Customers </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex bg-stone-200 font-semibold text-black/60 border-t border-stone-300 px-4 py-5 justify-between">
                <p>View More</p>{" "}
                <p className=" bg-white border border-stone-400 p-1 rounded-full">
                  <ArrowUpRightIcon className=" w-4 h-4" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1 w-1/2 flex flex-col border border-stone-300 bg-white rounded-lg shadow">
          <div className=" flex flex-col px-3 py-2 gap-2 ">
            <h2 className=" text-xl font-semibold">Sales Report Area</h2>
            <p className=" text-3xl font-semibold py-1 ">20</p>
            <div className="flex gap-2 text-black/70">
              <p className=" flex gap-1 bg-green-200 text-green-800 border border-green-400 rounded-full px-1 font-semibold">
                <ArrowUp className=" w-4 font-semibold" /> 12%
              </p>
              vs last month
            </div>
          </div>

          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "london", label: "London", valueFormatter },
              { dataKey: "paris", label: "Paris", valueFormatter },
              { dataKey: "newYork", label: "New York", valueFormatter },
              { dataKey: "seoul", label: "Seoul", valueFormatter },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;

export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

export function valueFormatter(value) {
  return `${value}mm`;
}
