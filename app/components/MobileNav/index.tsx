"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { IoAnalytics, IoSettingsOutline } from "react-icons/io5";
import Text from "../Text";
interface MobileNavProps {
  className?: string;
  children?: React.ReactNode;
}

const MobileNav = ({ className, children, ...others }: MobileNavProps) => {
  const currentPath = usePathname();
  return (
    
    <section
      className={`w-screen flex items-center justify-between fixed bottom-0 left-0 md:hidden  bg-gray-100 h-20 z-10 p-2 ${className}`}
      {...others}
    >
      {children}

      <Link
        href={"/user/dashboard"}
        className={`${
          currentPath.includes("dashboard") && "text-secondary"
        } transition-colors hover:text-secondary duration-100 ease-in flex flex-col items-center justify-center gap-y-2`}
      >
        <IoAnalytics className="h-6 w-6" />
        <Text className="text-[13px]">Dashboard</Text>
      </Link>

      <Link
        href={"/user/appointments"}
        className={`${
          currentPath.includes("appointments") && "text-secondary"
        } transition-colors hover:text-secondary duration-100 ease-in flex flex-col items-center justify-center gap-y-2`}
      >
        <BsCameraVideo className="h-6 w-6" />
        <Text className="text-[13px]">Appointments</Text>
      </Link>

      <Link
        href={"/user/messages"}
        className={`${
          currentPath.includes("messages") && "text-secondary"
        } transition-colors hover:text-secondary duration-100 ease-in flex flex-col items-center justify-center gap-y-2`}
      >
        <BiMessageRoundedDots className="h-6 w-6" />
        <Text className="text-[13px]">Messages</Text>
      </Link>

      <Link
        href={"/user/settings"}
        className={`${
          currentPath.includes("settings") && "text-secondary"
        } transition-colors hover:text-secondary duration-100 ease-in flex flex-col items-center justify-center gap-y-2`}
      >
        <IoSettingsOutline className="h-6 w-6" />
        <Text className="text-[13px]">Settings</Text>
      </Link>
    </section>
  );
};

export default MobileNav;
