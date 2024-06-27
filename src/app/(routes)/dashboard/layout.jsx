"use client";
import { AlignJustify, X } from "lucide-react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNavBar from "./_components/SideNavBar";
import { useState } from "react";

const DashBoardLayout = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  return (
    <div>
      <div
        className={`p-4 cursor-pointer md:hidden ${showNavBar && "hidden"}`}
        onClick={() => setShowNavBar(true)}
      >
        <AlignJustify />
      </div>
      <div
        className={`${
          showNavBar ? "block" : "hidden"
        } fixed  h-screen md:w-64 md:block bg-slate-100`}
      >
        <X
          onClick={() => setShowNavBar(false)}
          className="mt-4 mr-4 cursor-pointer md:hidden"
        />
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};
export default DashBoardLayout;
