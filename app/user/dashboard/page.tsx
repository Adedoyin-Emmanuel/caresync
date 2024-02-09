"use client";

import { AppointmentLabel } from "@/app/components/AppointmentCard";
import Button from "@/app/components/Button";
import ChatBotButton from "@/app/components/ChatBotButton";
import DashboardCard from "@/app/components/DashboardCard/DashboardCard";
import Loader, { LoaderSmall } from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import {
  saveAppointmentInfo,
  saveDashboardInfo,
  saveRecentAppointmentInfo,
  useGetLatestAppointmentsQuery,
  useGetUserQuery,
  userAppointmentInfoProps,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { SlBadge } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { DashboardQuickActions } from "@/app/components/DashboardQuickActions/DashboardQuickActions";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData, isLoading } = useGetUserQuery({});
  const { userInfo } = useAppSelector((state) => state.auth);
  const healthCareHistoryRef = useRef<HTMLDivElement | any>(null);
  const chatBotRef = useRef<HTMLFormElement>(null);
  const chatBotMessageBottomRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    userChat: "",
  });

  const [chatBodyHeight, setChatBodyHeight] = useState<string>("h-full");

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //it makes more sense to define it here

  interface messageStruct {
    sender: "bot" | "user";
    message: string;
  }

  const [messages, setMessages] = useState<messageStruct[]>([
    {
      sender: "bot",
      message: `Hi, I'm Caresync AI, nice to meet you ${userInfo?.name}`,
    },

    {
      sender: "bot",
      message: ` I can analyze your symptoms to provide rapid and accurate diagnoses for a wide range of health conditions. 
      I can also provide valuable insights into your overall health and wellness, helping you make informed decisions about your healthcare.
`,
    },
  ]);

  let dataToPass = {
    id: userInfo?._id,
    limit: 5,
    userType: "user",
  };

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      dispatch(saveDashboardInfo(userData?.data));
    }
  }, [userData]);

  const { userDashboardInfo, recentAppointmentInfo } = useAppSelector(
    (state) => state.user
  );

  const { data: latestAppointmentData, isLoading: latestAppointmentLoading } =
    useGetLatestAppointmentsQuery(dataToPass);

  useEffect(() => {
    if (latestAppointmentData) {
      dispatch(saveAppointmentInfo(latestAppointmentData?.data));
      dispatch(saveRecentAppointmentInfo(latestAppointmentData?.data));
    }
  }, [latestAppointmentData]);

  const handleNewAppointmentClick = () => {
    router.push("/user/appointments/new");
  };

  const handleBotClick = () => {
    chatBotRef.current?.classList.remove("scale-0");
    chatBotRef.current?.classList.add("scale-100");
  };

  const handleBotCancelButtonClick = () => {
    chatBotRef.current?.classList.remove("scale-100");
    chatBotRef.current?.classList.add("scale-0");
  };

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedMessages = [...messages];

    updatedMessages.push({ sender: "user", message: formData.userChat });

    setMessages(updatedMessages);

    updatedMessages.push({
      sender: "bot",
      message: `Response from bot`,
    });
    setMessages(updatedMessages);

    setFormData({ ...formData, userChat: "" });
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const chatBotMessageBottom = chatBotMessageBottomRef.current;
    if (chatBotMessageBottom) {
      chatBotMessageBottom.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();

    if (messages.length >= 10) {
      setChatBodyHeight("h-auto");
    }
  }, [messages]);

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : (
        <SidebarLayout showWelcomeMesage={true}>
          <section className="general-container w-full mx-auto items-start flex flex-col xl:flex-row gap-x-5">
            <section className="w-full p-1 flex md:hidden items-center justify-center">
              <DashboardCard
                appointments={userDashboardInfo?.appointments?.length!}
                className="mt-5"
                healthcareHistoryRef={healthCareHistoryRef}
                userType="user"
              />
            </section>

            <section className="w-full p-1 flex md:hidden items-center justify-center">
              <DashboardQuickActions />
            </section>

            <section className="first-section w-full xl:w-8/12 hidden md:flex flex-col items-center justify-center ">
              <section className="stats-container grid p-1 lg:grid-cols-3 gap-10 w-full">
                <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                  <BsCameraVideo className="w-8 h-8" />
                  <Text>
                    {userDashboardInfo?.appointments?.length}{" "}
                    {userDashboardInfo?.appointments?.length! > 1
                      ? "Appointments"
                      : "Appointment"}
                  </Text>
                </section>

                <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                  <HiOutlineShieldCheck className="w-8 h-8" />
                  <Text>
                    {userDashboardInfo?.allTotalAppointments} total{" "}
                    {userDashboardInfo?.allTotalAppointments! > 1
                      ? "Checkups"
                      : "Checkup"}
                  </Text>
                </section>

                <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                  <SlBadge className="w-8 h-8" />
                  <Text>
                    {userDashboardInfo?.reviews?.length} total{" "}
                    {userDashboardInfo?.reviews?.length! > 1
                      ? "Reviews"
                      : "Review"}
                  </Text>
                </section>
              </section>

              <section
                className="health-care-history w-full my-5 p-2"
                ref={healthCareHistoryRef}
              >
                <h3 className="font-bold capitalize text-[18px] md:text-[20px]">
                  healthcare history
                </h3>

                {userDashboardInfo?.healthCareHistory?.length === 0 ? (
                  <Text className="text-center my-5">
                    No healthcare history
                  </Text>
                ) : (
                  <Text>History dey</Text>
                )}
              </section>
            </section>

            <section className="second-section w-full xl:w-4/12 mt-16 md:mt-0 grid grid-cols-1 items-center justify-center p-2">
              <section className="user-appointments">
                <h3 className="font-bold capitalize text-[18px] md:text-[20px]">
                  recent appointments
                </h3>

                <section className="appointments mt-4">
                  {latestAppointmentLoading ? (
                    <LoaderSmall className="my-2" />
                  ) : recentAppointmentInfo?.length == 0 ? (
                    <Text className="text-center my-3">
                      No recent appointments
                    </Text>
                  ) : (
                    recentAppointmentInfo?.map(
                      (appointment: userAppointmentInfoProps) => {
                        return (
                          <AppointmentLabel
                            key={appointment._id}
                            userType="hospital"
                            status={appointment.status}
                            attender={appointment.hospitalId}
                            _id={appointment._id}
                            href={`/user/appointments/${appointment._id}`}
                            createdAt={appointment.createdAt}
                          />
                        );
                      }
                    )
                  )}
                  <section className="new-appointment w-full flex items-end justify-end my-5">
                    <Button
                      className="bg-accent"
                      onClick={handleNewAppointmentClick}
                    >
                      New appointment
                    </Button>
                  </section>
                </section>
              </section>
            </section>

            <section className="health-care-history w-full md:hidden my-5 p-2">
              <h3 className="font-bold capitalize text-[18px] md:text-[20px]">
                healthcare history
              </h3>

              {userDashboardInfo?.healthCareHistory?.length === 0 ? (
                <Text className="text-center my-5 text-sm">
                  No healthcare history
                </Text>
              ) : (
                <Text>History dey</Text>
              )}
            </section>
            <form
              className="bg-purple-200 h-4/6 absolute overflow-x-hidden scroll-smooth overflow-y-auto md:w-[28rem] w-11/12 transform-gpu transition duration-150 ease-linear scale-0 rounded-lg shadow-md  bottom-3  right-2 z-[10000]"
              ref={chatBotRef}
              onSubmit={(e) => {
                handleChatSubmit(e);
              }}
              id="chat-container"
            >
              <section className="w-full sticky top-0 z-[10000] bg-white flex items-center justify-between p-1">
                <section className="w-full flex items-center gap-5  p-2">
                  <div className="avatar online">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://api.dicebear.com/7.x/micah/svg?seed=ai"
                        alt="Caresync bot image"
                      />
                    </div>
                  </div>
                  <h2 className="capitalize font-semibold text-[16px]">
                    caresync Ai
                  </h2>
                </section>

                <section className="">
                  <section className="h-8 w-8 flex items-center justify-center rounded-full  shadow bg-red-400 text-white duration-100 cursor-pointer transition-colors ease-linear">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={handleBotCancelButtonClick}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </section>
                </section>
              </section>

              <section
                className={`chat-container w-full ${chatBodyHeight} p-2 overflow-x-hidden overflow-y-clip mb-10`}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      msg.sender === "user" ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={`${
                            msg.sender === "user"
                              ? userInfo?.profilePicture
                              : "https://api.dicebear.com/7.x/micah/svg?seed=ai"
                          }`}
                          alt={`${msg.sender} image`}
                        />
                      </div>
                    </div>
                    <div className="chat-bubble bg-white text-black break-words">
                      {msg.message}
                    </div>
                    <div className="" ref={chatBotMessageBottomRef}></div>
                  </div>
                ))}
              </section>

              <div className="sticky bottom-0 w-full shadow-md flex items-center">
                <input
                  type="text"
                  placeholder="Type something..."
                  name="userChat"
                  onChange={handleInputChange}
                  value={formData.userChat}
                  className="w-full border-none focus:outline-none focus:border-transparent p-4"
                />
                <button className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-1 z-[10000] w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <ChatBotButton onClick={handleBotClick} />
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Home;
