import React from "react";
import Sidebar from "./Sidebar";
import SellerOverview from "./Dashboards/SellerOverview";
import Sales from "./Dashboards/Sales";
import Orders from "./Dashboards/Orders";
import Inventory from "./Dashboards/Inventory";
import SellerAccount from "./Dashboards/SellerAccount";
import AddProduct from "./Dashboards/AddProduct";
import SellerDetails from "./Details/SellerDetails";

import { useSelector } from "react-redux";

const SellerDashboard = () => {
  const [activePage, setActivePage] = React.useState("overview");
  const [isSellerLoggedIn, setIsSellerLoggedIn] = React.useState(false);

  const sellerDetail = useSelector((state) => state.sellerDetail);

  React.useEffect(() => {
    if (sellerDetail && sellerDetail.sellerDetails.sellerLoggedIn) {
      setIsSellerLoggedIn(true);
    } else setIsSellerLoggedIn(false);
  }, [sellerDetail]);

  const renderPage = () => {
    switch (activePage) {
      case "addProduct":
        return <AddProduct />;
      case "overview":
        return <SellerOverview setActivePage={setActivePage} />;
      case "sales":
        return <Sales />;
      case "orders":
        return <Orders />;
      case "inventory":
        return <Inventory />;
      case "account":
        return <SellerAccount />;
      default:
        return <SellerOverview />;
    }
  };

  return (
    <div className="pt-16 h-[100svh] flex">
      {isSellerLoggedIn ? (
        <>
          <Sidebar setActivePage={setActivePage} activePage={activePage} />
          <div className="content flex-1 pr-2">{renderPage()}</div>
        </>
      ) : (
        <SellerDetails />
      )}
    </div>
  );
};

export default SellerDashboard;
