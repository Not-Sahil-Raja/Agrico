import React, { useEffect } from "react";
import { ArrowUp, ArrowUpRightIcon, Crown } from "lucide-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useSelector } from "react-redux";

const SellerOverview = ({ setActivePage }) => {
  const sellerDet = useSelector((state) => state.sellerDetail);
  const { getToken } = useAuth();
  const [overviewData, setOverviewData] = React.useState({
    salesAreas: 0,
    totalCustomers: 0,
    totalOrder: 0,
    totalSales: 0,
    newCustomer: 0,
    formattedReport: [],
  });

  // used to format value for the barchart
  const valueFormatter = (value, dataKey) => {
    if (dataKey === "totalSales") {
      return `$${value.toFixed(2)}`;
    }
    return value;
  };

  //* Fetch all the seller overview
  const fetchSellerOverview = async () => {
    const token = await getToken();
    axios
      .get(`${import.meta.env.VITE_SERVER}/seller-dashboard/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sellerEmail: sellerDet.sellerDetails.email,
        },
      })
      .then((res) => {
        setOverviewData({
          salesAreas: res.data.salesAreas,
          totalCustomers: res.data.totalCustomers,
          totalOrder: res.data.totalOrder,
          totalSales: res.data.totalSales,
          formattedReport: res.data.formattedReport,
          newCustomer: 0,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSellerOverview();
  }, []);

  return (
    <div className=" flex flex-col w-full h-fit px-3 py-2 font-Archivo justify-stretch bg-stone-100 rounded-md ">
      <div className=" mb-2">
        <h1 className="text-2xl font-semibold">Welcome User</h1>
        <p className=" text-black/50 font-semibold">
          Here is a quick overview of your sales and other detail.
        </p>
      </div>
      <div className=" flex h-[77svh] gap-2 mb-2">
        {/* Rendering the total sales and orders overview */}
        <div className=" flex-1  flex flex-col gap-3">
          <div className="  flex gap-2">
            {[
              {
                title: "Total Sales",
                value: overviewData.totalSales,
                link: "sales",
              },
              {
                title: "Total Orders",
                value: overviewData.totalOrder,
                link: "orders",
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

                <div
                  className=" flex bg-stone-200 font-semibold hover:bg-stone-300/80 duration-200 transition-all cursor-pointer text-black/60 border-t border-stone-300 px-4 py-5 justify-between"
                  onClick={() => setActivePage(arr.link)}
                >
                  <p>View More</p>{" "}
                  <p className=" bg-white border border-stone-400 p-1 rounded-full">
                    <ArrowUpRightIcon className=" w-4 h-4" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Total customers of the seller  */}
          <div className=" flex ">
            <div className=" grow flex flex-col border border-stone-300 bg-white rounded-lg shadow">
              <div className=" flex flex-col px-3 py-2 h-full gap-2 justify-aroun</div>d">
                <h2 className=" text-xl font-semibold">Customers</h2>
                <p className=" text-3xl font-semibold py-1 px-3">
                  {overviewData.totalCustomers}
                </p>
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
                      <p className=" text-lg font-semibold">
                        {overviewData.newCustomer}
                      </p>
                      <p className=" text-black/70">New Customers </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className=" flex bg-stone-200 font-semibold hover:bg-stone-300/80 duration-200 transition-all cursor-pointer text-black/60 border-t border-stone-300 px-4 py-5 justify-between"
                onClick={() => setActivePage("inventory")}
              >
                <p>View More</p>{" "}
                <p className=" bg-white border border-stone-400 p-1 rounded-full">
                  <ArrowUpRightIcon className=" w-4 h-4" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total sales report area and graph  */}
        <div className=" flex-1 w-1/2 flex flex-col border border-stone-300 bg-white rounded-lg shadow">
          <div className=" flex flex-col px-3 py-2 gap-2 ">
            <h2 className=" text-xl font-semibold">Sales Report Area</h2>
            <p className=" text-3xl font-semibold py-1 ">
              {overviewData.salesAreas}
            </p>
            <div className="flex gap-2 text-black/70">
              <p className=" flex gap-1 bg-green-200 text-green-800 border border-green-400 rounded-full px-1 font-semibold">
                <ArrowUp className=" w-4 font-semibold" /> 12%
              </p>
              vs last month
            </div>
          </div>

          <BarChart
            dataset={overviewData.formattedReport}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "totalOrders", label: "Total Orders", valueFormatter },
              { dataKey: "totalSales", label: "Total Sales", valueFormatter },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
