import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { sellerLogin } from "../../../Apps/sellerDetailsslice";

export function SellerLogin() {
  const dispatch = useDispatch();

  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);

    const token = await getToken();
    axios
      .post(`${import.meta.env.VITE_SERVER}/seller/login`, formdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData({
          email: "",
          password: "",
        });

        const [firstName, lastName] = res.data.seller.name.split(" ");

        dispatch(
          sellerLogin({
            firstName: firstName,
            lastName: lastName,
            email: res.data.seller.email,
            profilePic: res.data.seller.profilePic,
          })
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      className="flex items-center justify-center h-full p-4 font-Archivo"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      <div className="w-full max-w-2xl  rounded-lg h-full flex flex-col  p-6">
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold">Login to Your Account</h2>
          <p className="text-gray-600">
            Enter your credentials to access your dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-700 text-white rounded px-4 py-2"
          >
            Log In
          </button>
        </form>
        {/* <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </div> */}
      </div>
    </motion.div>
  );
}
