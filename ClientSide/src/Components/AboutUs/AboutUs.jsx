import React from "react";
import { Globe, Sun } from "lucide-react";

function AboutUs() {
  return (
    <section className="w-full bg-[#fffff2] py-8 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8 sm:mb-12 relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-Archivo mb-2 sm:mb-4">
            <span id="abttxt1">Planting seeds today</span>
            <p id="abttxt2" className="mt-2">
              for a{" "}
              <span
                id="abttxthigh"
                className="bg-[#74c274] px-2 py-1 drop-shadow rounded-2xl"
              >
                greener
              </span>{" "}
              tomorrow
            </p>
          </h1>
          <span
            className="text-2xl sm:text-3xl lg:text-4xl font-Archivo absolute top-0 right-0 sm:right-4"
            id="abtright"
          >
            About Us
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            className="bg-[#599259] rounded-2xl p-4 sm:p-6 relative shadow-inner"
            id="card1"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#ffffff73] absolute rounded-full -bottom-4 -left-8" />
            <div className="relative z-10">
              <p className="font-Archivo text-sm sm:text-base lg:text-lg text-white">
                Our story is one of passion, perseverance, and a commitment to
                sustainability. Our goal is to create a platform that connects
                people who are passionate about sustainability with the
                resources they need to make a difference. We believe that by
                working together.
              </p>
            </div>
          </div>

          <div
            className="bg-[#407940] rounded-2xl overflow-hidden shadow-inner"
            id="card2"
          >
            <img
              src="https://images.unsplash.com/photo-1527847263472-aa5338d178b8?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sustainable farming"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="bg-[#83be83] rounded-2xl p-4 sm:p-6 shadow-inner"
            id="card3"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="mb-4 flex space-x-4">
                <Globe className="w-6 h-6" />
                <Sun className="w-6 h-6" />
              </div>
              <p className="font-Archivo text-sm sm:text-base lg:text-lg">
                Our team brings together diverse expertise and experiences to
                create a platform that is easy to use and accessible to all. We
                are committed to providing the best services to our customers
                and are constantly working to improve our platform.
              </p>
            </div>
          </div>

          <div
            className="bg-[#152b15] rounded-2xl overflow-hidden shadow-inner"
            id="card4"
          >
            <img
              src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sustainable technology"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
