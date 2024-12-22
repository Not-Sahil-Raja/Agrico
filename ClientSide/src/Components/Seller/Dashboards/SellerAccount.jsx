import { useState } from "react";
import { User, Mail, Lock, Bell, Smartphone, Shield } from "lucide-react";

export default function SellerAccount() {
  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=100&width=100"
  );

  return (
    <div className="space-y-8 bg-stone-100 min-h-[90svh] px-3 py-2 font-Archivo mr-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
        <button className="border border-gray-300 rounded px-4 py-2">
          Save All Changes
        </button>
      </div>

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
            <button
              className="border border-gray-300 rounded px-4 py-2"
              onClick={() =>
                setAvatarUrl("/placeholder.svg?height=100&width=100")
              }
            >
              Change Avatar
            </button>
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
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-1 mb-1 ">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    />
                  </div>
                </div>
                <div className=" ">
                  <button className="border border-zinc-400 hover:bg-zinc-200 active:scale-95 bg-zinc-100 rounded px-2 py-2 w-fit  transition-all">
                    Change Password
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
