import { useEffect, useState } from "react";
import { User, Mail, Lock, Bell, Smartphone, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { sellerUpdate } from "../../../Apps/sellerDetailsslice";

export default function SellerAccount() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=100&width=100"
  );

  const [sellerInfo, setSellerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    profilePic: "/placeholder.svg?height=100&width=100",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const [isPasswordMatched, setIsPasswordMatched] = useState(true);

  const SellerDetail = useSelector((state) => state.sellerDetail);

  // * Setting all the seller details
  useEffect(() => {
    if (SellerDetail.sellerDetails) {
      setSellerInfo(SellerDetail.sellerDetails);
      setAvatarUrl(
        SellerDetail.sellerDetails.profilePic ||
          "/placeholder.svg?height=100&width=100"
      );

      setFirstName(SellerDetail.sellerDetails.firstName || "");
      setLastName(SellerDetail.sellerDetails.lastName || "");
      setDisplayName(
        `${
          SellerDetail.sellerDetails.displayName
            ? SellerDetail.sellerDetails.displayName
            : SellerDetail.sellerDetails.firstName +
              " " +
              SellerDetail.sellerDetails.lastName
        }`
      );
      setBio(SellerDetail.sellerDetails.bio || "");
    }
  }, [SellerDetail]);

  // Checking if the passwords are matching
  useEffect(() => {
    if (newPassword !== confirmNewPassword) setIsPasswordMatched(false);
    else setIsPasswordMatched(true);
  }, [confirmNewPassword, newPassword]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  //Update Password in DB
  const updatePassword = async () => {
    const token = await getToken();
    const formData = new FormData();

    setIsPasswordUpdating(true);
    formData.append("email", sellerInfo.email);
    formData.append("currentPassword", currentPassword);
    formData.append("newPasssword", newPassword);

    axios
      .put(`${import.meta.env.VITE_SERVER}/seller/update-password`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((err) => console.error(err))
      .finally(() => setIsPasswordUpdating(false));
  };

  //Saving all the changes in DB
  const saveAllChanges = async () => {
    setIsSavingChanges(true);
    const token = await getToken();
    const formData = new FormData();

    const updatedData = {
      firstName,
      lastName,
      displayName,
      bio,
    };

    formData.append("updatedData", JSON.stringify(updatedData));
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    formData.append("email", sellerInfo.email);
    formData.append("currentPassword", currentPassword);

    axios
      .put(`${import.meta.env.VITE_SERVER}/seller/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsSavingChanges(false);

        const [fName, lName] = res.data.name.split(" ");
        dispatch(
          sellerUpdate({
            firstName: fName,
            lastName: lName,
            email: res.data.email,
            profilePic: res.data.profilePic,
            bio: res.data.bio,
            displayName: res.data.displayName,
          })
        );
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((err) => {
        setIsSavingChanges(false);
        console.error(err);
      });
  };

  return (
    <div className="space-y-8 bg-stone-100 min-h-[90svh] px-3 py-3 font-Archivo mr-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
        <button
          className="border border-[#a1bb7c] bg-[#daf5b5] hover:bg-[#d2f0a9] rounded px-4 py-2 transition-all disabled:opacity-80 active:scale-95"
          disabled={isSavingChanges}
          onClick={saveAllChanges}
        >
          {isSavingChanges ? (
            <span className=" animate-pulse transition-all">Saving ..</span>
          ) : (
            "Save All Changes"
          )}
        </button>
      </div>

      {/* Account Profile pic , name & bio */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow md:col-span-1">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Profile</h2>
            <p className="text-sm text-gray-500">Manage your public profile</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={avatarUrl}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="mt-2 border border-gray-300 rounded px-4 py-2 cursor-pointer">
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="w-full space-y-2">
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <input
                id="displayName"
                placeholder="John Doe"
                className="block w-full border border-gray-300 rounded px-3 py-2"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <input
                id="bio"
                placeholder="Tell us about yourself"
                className="block w-full border border-gray-300 rounded px-3 py-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow md:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Account Details</h2>
            <p className="text-sm text-gray-500">
              Manage your account information and preferences
            </p>
          </div>
          <div className="w-full">
            {/* Account Information Detail */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className=" border border-neutral-300 rounded">
                  <div className=" border-b border-neutral-300 px-3 py-1 text-lg text-black/80">
                    Account Information
                  </div>
                  <div className=" flex gap-2 px-2 py-1 mb-1">
                    <div className=" grow">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                          id="firstName"
                          placeholder="Enter First Name"
                          className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className=" grow">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                          id="lastName"
                          placeholder="Enter Last Name"
                          className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-1 mb-1 ">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email (You can't change)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="block w-full border border-gray-300 disabled:bg-stone-100 rounded pl-8 px-3 py-2 "
                        value={sellerInfo.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Accounts Security Settings */}
            <div className=" border border-neutral-300 rounded mt-4 ">
              <div className=" border-b px-3 py-1 border-neutral-300 text-lg text-black/80">
                Security Settings
              </div>
              <div className="flex flex-col gap-2 px-2 py-1 mb-1">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      id="currentPassword"
                      type="password"
                      className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      id="newPassword"
                      type="password"
                      className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      id="confirmPassword"
                      type="password"
                      className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <p
                    className={`${
                      isPasswordMatched && "hidden"
                    } font-semibold text-rose-600`}
                  >
                    ** password doesn't matched
                  </p>
                </div>
                <div className="">
                  <button
                    className="border  hover:bg-black/80 active:scale-95 bg-black text-white rounded shadow px-5 py-2 w-fit  transition-all"
                    disabled={isPasswordUpdating}
                    onClick={updatePassword}
                  >
                    {isPasswordUpdating ? "Wait Updating !" : "Change Password"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
