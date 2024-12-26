import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Article from "./Components/Articles/Article.jsx";
import Homepage from "./Components/HomePage/Homepage.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import MarketPlace from "./Components/MarketPlace/MarketPlace.jsx";
import Login from "./Components/Login/Login.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import { store } from "./Apps/store.js";
import { Provider } from "react-redux";
import Cart from "./Components/Cart/Cart.jsx";
import CreateBlogPage from "./Components/CreateBlog/CreateBlogPage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EachArticle from "./Components/Articles/EachArticle/EachArticle.jsx";
import SellerDashboard from "./Components/Seller/SellerDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },

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
        path: "/createblog",
        element: <CreateBlogPage />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/article/:id",
        element: <EachArticle />,
      },
      {
        path: "/sellerDashboard",
        element: <SellerDashboard />,
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
