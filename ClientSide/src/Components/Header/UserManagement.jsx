import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const UserManagement = () => {
  return (
    <div className=" flex items-center justify-center">
      <SignedOut>
        <SignInButton>
          <button className="  border-[1px] border-[#ffffff] bg-gradient-to-tr from-transparent to-white hover:from-slate-50 hover:to-white rounded-lg px-2 py-1 transition-colors active:scale-95">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn className=" border">
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default UserManagement;
