import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Catlg from "./Components/Catalogue/Catlg.jsx";
import Homepage from "./Components/HomePage/Homepage.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import MarketPlace from "./Components/MarketPlace/MarketPlace.jsx";
import Login from "./Components/Login/Login.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import { store } from "./Apps/store.js";
import { Provider } from "react-redux";
import Cart from "./Components/Cart/Cart.jsx";
import Eachcard from "./Components/Catalogue/Eachcard.jsx";
import SellItem from "./Components/MarketPlace/SellItem.jsx";
import CreateBlogPage from "./Components/CreateBlog/CreateBlogPage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      {
        path: "/catlg",
        element: <Catlg />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },

      {
        path: "/marketPlace",
        element: <MarketPlace />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/course",
        element: <Eachcard />,
      },
      {
        path: "/sellitem",
        element: <SellItem />,
      },
      {
        path: "/createblog",
        element: <CreateBlogPage />,
      },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ClerkProvider>
);
