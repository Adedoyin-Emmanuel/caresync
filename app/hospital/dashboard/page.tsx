import Button from "@/app/components/Button";
import ChatBotButton from "@/app/components/ChatBotButton";
import { HospitalSidebarNav } from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";

import { SlBadge } from "react-icons/sl";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <HospitalSidebarNav showWelcomeMesage={true}>
        <section className="general-container w-full items-start flex flex-col xl:flex-row gap-x-5">
          <section className="first-section w-full xl:w-8/12 flex flex-col items-center justify-center">
            <section className="stats-container grid p-1 lg:grid-cols-3 gap-10 w-full">
              <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                <BsCameraVideo className="w-8 h-8" />
                <Text>2 appointments</Text>
              </section>

              <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                <HiOutlineShieldCheck className="w-8 h-8" />
                <Text>14 total checkups</Text>
              </section>

              <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                <SlBadge className="w-8 h-8" />
                <Text>68 total reviews</Text>
              </section>
            </section>

            <section className="health-care-history w-full my-5 p-2">
              <h3 className="font-bold capitalize text-2xl">
                healthcare history
              </h3>

              <section className="appointment bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4">
                <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
                  <HiOutlineShieldCheck className="w-6 h-6" />
                </section>

                <section className="other-content w-11/12 flex items-center justify-around">
                  <Text className="text-sm">14/09/2023</Text>
                  <Text className="text-sm font-bold">@doyin</Text>
                </section>
              </section>
            </section>
          </section>

          <section className="second-section w-full xl:w-4/12 mt-16 md:mt-0 grid grid-cols-1 items-center justify-center p-2">
            <section className="user-appointments">
              <h3 className="font-bold capitalize text-2xl">
                recent appointments
              </h3>

              <section className="appointments mt-4">
                <section className="appointment bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4">
                  <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
                    <BsCameraVideo className="w-6 h-6" />
                  </section>

                  <section className="other-content w-11/12 flex items-center justify-around">
                    <Text className="text-sm">14/09/2023</Text>
                    <Text className="text-sm font-bold">@doyin</Text>
                    <section className="status-badge text-black rounded bg-green-300 flex items-center justify-center h-5 w-20">
                      <Text className="text-[12px] font-bold">success</Text>
                    </section>
                  </section>
                </section>

                <section className="appointment bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4">
                  <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
                    <BsCameraVideo className="w-6 h-6" />
                  </section>

                  <section className="other-content w-11/12 flex items-center justify-around">
                    <Text className="text-sm">14/09/2023</Text>
                    <Text className="text-sm font-bold">@emmysoft</Text>
                    <section className="status-badge  text-black rounded bg-red-400 flex items-center justify-center h-5 w-20">
                      <Text className="text-[12px] font-bold">failed</Text>
                    </section>
                  </section>
                </section>
                <section className="new-appointment w-full flex items-end justify-end">
                  <Button className="bg-accent">view appointments</Button>
                </section>
              </section>
            </section>
          </section>
          <ChatBotButton />
        </section>
      </HospitalSidebarNav>
    </div>
  );
};

export default Home;
