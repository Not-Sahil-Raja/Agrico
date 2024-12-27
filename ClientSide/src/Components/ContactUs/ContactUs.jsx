import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactUs = () => {
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFeedback = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const token = await getToken();
    axios
      .post(`${import.meta.env.VITE_SERVER}/feedback`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          setStatus("");
        }, 3000);
      })
      .catch((err) => {
        setStatus("failed");
        console.log(err);
      });
  };

  return (
    <div className=" bg-stone-200/50 w-full h-screen rounded-md pt-[10vh] select-none overflow-hidden font-Archivo relative">
      <AnimatePresence>
        {status !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded shadow-md text-white ${
              status === "sending"
                ? "bg-stone-200 text-stone-800 border border-stone-400"
                : status === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {status === "sending"
              ? "Sending the feedback..."
              : status === "success"
              ? "Feedback sent successfully!"
              : "Failed to send feedback."}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-[80vh] w-[90%] m-auto relative flex items-center">
        <img
          className="absolute object-cover h-full w-[100%] brightness-50 rounded z-0"
          src="https://images.unsplash.com/photo-1468253926858-331ac6e1e97f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          id="conimg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
        <div className="flex flex-col gap-3 w-full h-full z-10 py-3 px-4">
          <div className="text-2xl  text-white ">
            {" "}
            <h2 className=" w-fit bg-[#659965] px-2">AgriCo</h2>
          </div>
          <div className=" grow text-white flex gap-4 justify-evenly">
            <h3 className=" text-2xl 2xl:text-5xl h-full flex items-center ">
              Have some suggestions or found a bug ? <br />
              We would love to hear from you!
            </h3>
            <div className=" font-Archivo h-full grow flex flex-col  max-w-[32rem]">
              <form
                className="flex flex-col gap-4 p-4 bg-black/20 border border-stone-600 backdrop-blur-md rounded-lg shadow-md h-full"
                onSubmit={sendFeedback}
              >
                <label className="flex flex-col">
                  <span className=" text-white">Name</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded text-black"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col">
                  <span className=" text-white">Email</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-1 p-2 border border-gray-300 rounded text-black"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="flex flex-col grow">
                  <span className=" text-white">Message</span>
                  <textarea
                    id="message"
                    name="message"
                    className="mt-1 p-2 border border-gray-300 rounded grow text-black"
                    placeholder="Your Message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="mt-auto p-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 disabled:opacity-65 transition-colors duration-300"
                  disabled={status !== ""}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Bottom directly mail me option */}
          <div className=" text-xl tracking-normal text-white">
            Directly Mail me at{" "}
            <a
              href="mailto:sahilraja2002@gmail.com"
              className="underline bg-yellow-900 px-2  rounded"
            >
              sahilraja2002@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
