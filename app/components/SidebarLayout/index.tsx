import { IoAnalytics } from "react-icons/io5";
import Text from "../Text";
import { BsCameraVideo } from "react-icons/bs";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";


const SidebarLayout = () => {
  return (
    <div className="bg-zinc-100 h-screen md:flex  md:w-3/12  lg:w-2/12 items-center justify-start flex-col  p-0  fixed ">
      <section className="sidebar-header my-4">
        <h2 className="font-bold text-[20px] capitalize ">caresync</h2>
      </section>

      <section className="w-11/12 p-2">
        <section className="dashboard flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4">
          <IoAnalytics className="w-6 h-6" />
          <Text>Dashboard</Text>
        </section>

        <section className="dashboard flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4">
          <BsCameraVideo className="w-6 h-6" />
          <Text>Appointments</Text>
        </section>

        <section className="dashboard flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4">
          <BiMessageRoundedDots className="w-6 h-6" />
          <Text>Messages</Text>
        </section>

        <section className="dashboard flex items-center gap-x-4 bg-gray-200 p-5 rounded my-4">
          <IoSettingsOutline className="w-6 h-6" />
          <Text>Settings</Text>
        </section>
      </section>
    </div>
  );
};

export default SidebarLayout;
