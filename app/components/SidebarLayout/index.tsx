"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoAnalytics, IoSettingsOutline } from "react-icons/io5";
import Text from "../Text";

const SidebarLayout = () => {
  const currentPath = usePathname();

  return (
    <div className="bg-zinc-100 h-screen md:flex  md:w-3/12  lg:w-2/12 items-center justify-start flex-col  p-0  fixed ">
      <section className="sidebar-header my-4">
        <h2 className="font-bold text-[20px] capitalize ">caresync</h2>
      </section>

      <section className="w-11/12 p-2">
        <Link
          href={"dashboard"}
          className={`dashboard cursor-pointer ${
            currentPath.includes("dashboard") && "bg-accent text-white"
          } hover:bg-accent duration-100 ease-in hover:text-white transition-colors flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4`}
        >
          <IoAnalytics className="w-6 h-6" />
          <Text>Dashboard</Text>
        </Link>

        <Link
          href="appointments"
          className={`dashboard cursor-pointer ${
            currentPath.includes("appointments") && "bg-accent text-white"
          } hover:bg-accent duration-100 ease-in hover:text-white transition-colors flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4`}
        >
          <BsCameraVideo className="w-6 h-6" />
          <Text>Appointments</Text>
        </Link>

        <Link
          href="messages"
          className={`dashboard cursor-pointer ${
            currentPath.includes("messages") && "bg-accent text-white"
          } hover:bg-accent duration-100 ease-in hover:text-white transition-colors flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4`}
        >
          <BiMessageRoundedDots className="w-6 h-6" />
          <Text>Messages</Text>
        </Link>

        <Link
          href="settings"
          className={`dashboard cursor-pointer ${
            currentPath.includes("settings") && "bg-accent text-white"
          } hover:bg-accent duration-100 ease-in hover:text-white transition-colors flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4`}
        >
          <IoSettingsOutline className="w-6 h-6" />
          <Text>Settings</Text>
        </Link>

        <Link
          href="logout"
          className={`dashboard cursor-pointer ${
            currentPath.includes("logout") && "bg-accent text-white"
          } hover:bg-accent duration-100 ease-in hover:text-white transition-colors flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4`}
        >
          <FiLogOut className="w-6 h-6" />
          <Text>Logout</Text>
        </Link>
      </section>
    </div>
  );
};

export default SidebarLayout;
