"use client";

import { AppointmentLabel } from "@/app/components/AppointmentCard";
import Button from "@/app/components/Button";
import ChatBotButton from "@/app/components/ChatBotButton";
import Loader, { LoaderSmall } from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import {
  saveDashboardInfo,
  saveRecentAppointmentInfo,
  useGetLatestAppointmentsMutation,
  useGetUserMutation,
  userAppointmentInfoProps,
  userDashboardInfoProps,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { SlBadge } from "react-icons/sl";
import { useDispatch } from "react-redux";

const Home = () => {
  const [getUser, { isLoading }] = useGetUserMutation();
  const [getLatestAppointments, { isLoading: latestAppointmentLoading }] =
    useGetLatestAppointmentsMutation();
  const dispatch = useDispatch<AppDispatch>();
  const { userDashboardInfo, recentAppointmentInfo, healthCareHistoryInfo } = useAppSelector(
    (state) => state.user
  );
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response: any = await getUser({ signal });
        const dataToPass = {
          id: userInfo._id,
          limit: 5,
          userType: userInfo.role,
        };

        const appointmentResponse: any = await getLatestAppointments(
          dataToPass
        );

        dispatch(saveRecentAppointmentInfo(appointmentResponse.data.data));
        const { data } = response.data;
        const payload: userDashboardInfoProps = data;
        dispatch(saveDashboardInfo(payload));
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request was aborted due to unmounting.");
        } else {
          console.error("Error:", error);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : (
        <SidebarLayout showWelcomeMesage={true}>
          <section className="general-container w-full items-start flex flex-col xl:flex-row gap-x-5">
            <section className="first-section w-full xl:w-8/12 flex flex-col items-center justify-center">
              <section className="stats-container grid p-1 lg:grid-cols-3 gap-10 w-full">
                <section className="bg-gray-100 h-28 w-52 rounded my-5 flex items-center flex-col justify-around cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100 ease-in">
                  <BsCameraVideo className="w-8 h-8" />
                  <Text>
                    {userDashboardInfo?.appointments.length}{" "}
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

              <section className="health-care-history w-full my-5 p-2">
                <h3 className="font-bold capitalize text-2xl">
                  healthcare history
                </h3>

                <section className="appointment bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4">
                  <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
                    <HiOutlineShieldCheck className="w-6 h-6" />
                  </section>

                  <section className="other-content w-11/12 flex items-center justify-around">
                    <Text className="tmeetingext-sm">14/09/2023</Text>
                    <Text className="text-sm font-bold">@Mayfair</Text>
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
                            href={`/user/dashboard/appointment/${appointment._id}`}
                            createdAt={appointment.createdAt}
                          />
                        );
                      }
                    )
                  )}
                  <section className="new-appointment w-full flex items-end justify-end my-2">
                    <Button className="bg-accent">New appointment</Button>
                  </section>
                </section>
              </section>
            </section>
            <ChatBotButton />
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Home;
