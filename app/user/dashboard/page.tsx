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
  const chatBotRef = useRef<HTMLDivElement>(null);

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
            <section
              className="bg-purple-200 h-1/2 md:w-[28rem] w-11/12 transform-gpu transition duration-150 ease-linear scale-0 rounded-lg shadow-md absolute bottom-3  right-2 z-[10000]"
              ref={chatBotRef}
            >
              <section className="w-full flex items-center justify-between p-1">
                <section className="flex items-center gap-5  p-2">
                  <div className="avatar online">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://api.dicebear.com/7.x/micah/svg?seed=emmysoft"
                        alt="Caresync bot image"
                      />
                    </div>
                  </div>
                  <h2 className="capitalize font-semibold text-[16px]">
                    caresync Ai
                  </h2>
                </section>

                <section className="">
                  <section className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-400 hover:text-white duration-100 cursor-pointer transition-colors ease-linear">
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
            </section>
            <ChatBotButton onClick={handleBotClick} />
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Home;
