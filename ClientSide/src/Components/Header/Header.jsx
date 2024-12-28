import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusIcon, ShoppingBagIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AgricoLogo from "./AgricoLogo";
import UserManagement from "./UserManagement";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-[#ffffffd3] backdrop-blur-md px-4 sm:px-6 lg:px-[3vw] py-2 fixed top-0 z-50 w-full text-lg font-Archivo text-[#2b1c1c] drop-shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-fit h-[5.8vh] rounded-2xl px-2 sm:px-[1vw] flex justify-center items-center">
            <AgricoLogo />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-4 lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <AnimatedNavLink to="/" isActiveClass="underline">
            Home
          </AnimatedNavLink>
          {isSignedIn && (
            <>
              <AnimatedNavLink to="/article" isActiveClass="underline">
                Article
              </AnimatedNavLink>
              <AnimatedNavLink to="/marketPlace" isActiveClass="underline">
                MarketPlace
              </AnimatedNavLink>
              <AnimatedNavLink to="/sellerDashboard" isActiveClass="underline">
                Seller Dashboard
              </AnimatedNavLink>
              <AnimatedNavLink to="/contact" isActiveClass="underline">
                Contact Us
              </AnimatedNavLink>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <UserManagement />
          {isSignedIn && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/createblog"
                className={({ isActive }) =>
                  `px-3 py-1 rounded flex items-center justify-center border transition-colors ${
                    isActive
                      ? "from-[#9dd394] to-[#5aa34d] text-white bg-gradient-to-t shadow-inner border-white"
                      : "hover:backdrop-blur-sm text-[#0D2035] border-black/40"
                  }`
                }
              >
                <span className="flex gap-1 items-center justify-center">
                  <PlusIcon size={17} />{" "}
                  <span className="hidden sm:inline">Create</span>
                </span>
              </NavLink>
            </motion.div>
          )}
          {!isSignedIn && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:block bg-yellow-200/70 px-2 py-1 rounded"
            >
              Please sign in to get started!
            </motion.p>
          )}
          {isSignedIn && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                className={({ isActive }) =>
                  `flex gap-2 justify-center relative items-center p-2 bg-stone-200 border border-stone-300 rounded transition-all duration-300 ${
                    isActive && "bg-stone-600 text-white"
                  }`
                }
                to="/cart"
              >
                <ShoppingBagIcon size={17} />
                {cartItems.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bg-red-500 top-[-22%] right-[-22%] text-white text-xs h-5 w-5 flex items-center justify-center rounded-full aspect-square"
                  >
                    {cartItems && cartItems.length}
                  </motion.div>
                )}
              </NavLink>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.285, easings: [0.83, 0, 0.17, 1] }}
            className="lg:hidden mt-2 pb-4 border-t border-gray-200 overflow-hidden"
          >
            <AnimatedNavLink
              to="/"
              isActiveClass="underline"
              onClick={toggleMenu}
            >
              Home
            </AnimatedNavLink>
            {isSignedIn && (
              <>
                <AnimatedNavLink
                  to="/article"
                  isActiveClass="underline"
                  onClick={toggleMenu}
                >
                  Article
                </AnimatedNavLink>
                <AnimatedNavLink
                  to="/marketPlace"
                  isActiveClass="underline"
                  onClick={toggleMenu}
                >
                  MarketPlace
                </AnimatedNavLink>
                <AnimatedNavLink
                  to="/sellerDashboard"
                  isActiveClass="underline"
                  onClick={toggleMenu}
                >
                  Seller Dashboard
                </AnimatedNavLink>
                <AnimatedNavLink
                  to="/contact"
                  isActiveClass="underline"
                  onClick={toggleMenu}
                >
                  Contact Us
                </AnimatedNavLink>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const AnimatedNavLink = ({ to, isActiveClass, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-xl transition-all ${
        isActive
          ? isActiveClass
          : "text-[#353535] border-transparent text-opacity-85"
      }`
    }
    onClick={onClick}
  >
    {children}
  </NavLink>
);

export default Header;
