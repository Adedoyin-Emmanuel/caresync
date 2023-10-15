import AppHeader from "@/app/components/AppHeader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <AppHeader />
        <section className="user-stats flex items-center gap-x-10">
          <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
            <BsCameraVideo className="w-8 h-8" />
            <Text>7 appointments</Text>
          </section>

          <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
            <HiOutlineShieldCheck className="w-8 h-8" />
            <Text>28 total checkups</Text>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Home;
