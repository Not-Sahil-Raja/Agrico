import React from "react";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full font-Archivo bg-stone-100/70  px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end mb-8 lg:mb-12">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl text-gray-800 mb-6 lg:mb-0">
            Agrico
          </h2>
          <form className="lg:ml-auto w-full lg:w-1/3 flex flex-col items-start">
            <label htmlFor="email" className="text-lg text-gray-800 mb-2">
              Sign up for our newsletter
            </label>
            <div className="flex w-full sm:gap-2 gap-1">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email here"
                className="p-2 sm:text-base text-sm rounded-sm grow focus:outline-none appearance-none"
              />
              <button
                type="submit"
                className="bg-stone-200 hover:bg-stone-300/65 text-stone-700 border border-stone-300 py-2 sm:px-4 px-1 rounded-md hover:border-stone-400/70 w-fit flex items-center gap-2 h-fit duration-100 transition-all sm:text-base text-sm"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
          <p className="text-lg text-gray-900/85 max-w-lg">
            Bridging the gap between local farmers and conscious consumers.
            Bringing you the freshest produce while supporting sustainable
            agriculture.
          </p>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Our Farmers
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  How It Works
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  CSA Program
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Support</h4>
              <ul className="space-y-2">
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Contact Us
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  FAQ
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Shipping & Returns
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Facebook
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Twitter
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  Instagram
                </li>
                <li className="hover:text-black/65 transition-colors cursor-pointer">
                  LinkedIn
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <span className="font-medium text-center block w-full text-base text-black/65">
            © 2021 AgroTech. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
