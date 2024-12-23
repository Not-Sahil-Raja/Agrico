import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  UserCircle,
  FileText,
  Image,
  Plus,
  Eye,
  EyeOffIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { sellerLogin } from "../../../Apps/sellerDetailsslice";

//Error for not proper details aren't there like images , password etc
export function SellerRegistration() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("displayName", firstName + " " + lastName);
    formData.append("bio", "");
    formData.append("profilePic", profilePic);

    axios
      .post(`${import.meta.env.VITE_SERVER}/seller/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const [resfirstName, reslastName] = res.data.name.split(" ");
        dispatch(
          sellerLogin({
            firstName: resfirstName,
            lastName: reslastName,
            email: res.data.email,
            profilePic: res.data.profilePic,
          })
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setProfilePic(null);
        setPreviewUrl("");
      })
      .catch((err) => {
        console.error(err);
      });
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
          <h2 className="text-3xl font-bold">Create Your Seller Account</h2>
          <p className="text-gray-600">Enter your information to get started</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="  flex flex-col h-full gap-2 py-2"
        >
          <div className="flex justify-center">
            <div className="relative my-5">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-20 w-20 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
              >
                <Plus className=" w-4 h-4" />
                <input
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded px-8 py-2"
                placeholder="••••••••"
                required
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 "
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full border border-black mt-auto rounded px-4 py-2 hover:bg-zinc-100"
          >
            Create Account
          </button>
        </form>
      </div>
    </motion.div>
  );
}
