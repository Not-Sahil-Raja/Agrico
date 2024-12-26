import { ArrowRight, QuoteIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-full bg-stone-100/70 relative flex flex-col font-Archivo px-10 py-8 pt-20">
      <div className=" w-full flex mb-2">
        <h2 className=" text-9xl text-gray-800">Agrico</h2>
        <form className=" ml-auto mt-auto mr-5 w-1/4 flex flex-col items-start">
          <label htmlFor="email" className="text-lg text-gray-800 mb-2">
            Sign up for our newsletter
          </label>
          <div className=" flex w-full gap-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email here"
              className="p-2 rounded-sm mb-2 grow focus:outline-none appearance-none"
            />
            <button
              type="submit"
              className=" bg-stone-200 hover:bg-stone-300/65 text-stone-700 border border-stone-300 py-2 px-4 rounded-md hover:border-stone-400/70 w-fit flex gap-2 h-fit duration-100 transition-all"
            >
              Subscribe <ArrowRight />
            </button>
          </div>
        </form>
      </div>
      <div className=" flex gap-5 mt-2 mb-3">
        <p className="text-lg text-gray-900/85  pb-3 line-clamp-3 break-words leading-tight max-w-[30rem]">
          Bridging the gap between local farmers and conscious consumers.
          Bringing you the freshest produce while supporting sustainable
          agriculture.
        </p>
        <div className=" flex-1 px-4 flex justify-end gap-32 mr-14 ml-32 my-7">
          <div>
            <h4 className="font-semibold mb-4 ">Quick Links</h4>
            <ul className="space-y-2 ">
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
          <div className="">
            <h4 className="font-semibold mb-4 ">Customer Support</h4>
            <ul className="space-y-2 ">
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
            <h4 className="font-semibold mb-4 ">Social</h4>
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

      <span className="font-medium font-Archivo text-center w-full text-base text-black/65 border-t pt-2">
        © 2021 AgroTech. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
