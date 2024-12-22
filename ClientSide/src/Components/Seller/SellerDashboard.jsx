import React from "react";
import Sidebar from "./Sidebar";
import SellerOverview from "./Dashboards/SellerOverview";
import Sales from "./Dashboards/Sales";
import Orders from "./Dashboards/Orders";
import Inventory from "./Dashboards/Inventory";
import SellerAccount from "./Dashboards/SellerAccount";
import AddItem from "./Dashboards/AddItem";

const SellerDashboard = () => {
  const [activePage, setActivePage] = React.useState("overview");

  const renderPage = () => {
    switch (activePage) {
      case "additem":
        return <AddItem />;
      case "overview":
        return <SellerOverview />;
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
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="content flex-1 pr-2">{renderPage()}</div>
    </div>
  );
};

export default SellerDashboard;
