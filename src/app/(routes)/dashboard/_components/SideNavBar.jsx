"use client";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  {
    id: 1,
    name: "Metting Type",
    path: "/dashboard/meeting-type",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Scheduled Meeting",
    path: "/dashboard/scheduled-meeting",
    icon: Calendar,
  },
  {
    id: 3,
    name: "Availability",
    path: "/dashboard/availability",
    icon: Clock,
  },
  {
    id: 4,
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const SideNavBar = () => {
  const activePath = usePathname();

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center">
        <Image src="/logo.svg" width={150} height={150} alt="logo" />
      </div>
      <Link href="/create-meeting">
        <Button className="flex items-center w-full gap-2 rounded-full mt-7">
          <Plus /> Create
        </Button>
      </Link>
      <div className="flex flex-col gap-5 mt-5">
        {menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <Button
              className={`flex justify-start w-full gap-2 hover:bg-blue-100 ${
                activePath === item.path && "text-primary bg-blue-100"
              }`}
              variant="ghost"
            >
              <item.icon />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SideNavBar;
