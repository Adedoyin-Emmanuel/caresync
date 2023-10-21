"use client";
import ApppointmentCard from "@/app/components/AppointmentCard";
import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import {
  saveAppointmentInfo,
  useGetUserAppointmentsMutation,
  useGetUserMutation,
  userAppointmentInfoProps,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Appointment = () => {
  const { userAppointmentInfo } = useAppSelector((state) => state.user);
  const { userInfo } = useAppSelector((state) => state.auth);

  const [getUserAppointments, { isLoading }] = useGetUserAppointmentsMutation();
  const [getUser] = useGetUserMutation();
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const userId = userInfo?._id;
        const response: any = await getUserAppointments(userId);
        console.log(response);
        const { data } = response.data;
        setTotalAppointments(data.length);
        const payload: userAppointmentInfoProps = data;
        dispatch(saveAppointmentInfo(payload));
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
        <SidebarLayout>
          <section className="appointments my-5">
            <h3 className="font-bold text-2xl capitalize text-accent">
              Scheduled appointments
            </h3>
            <Text className="text-sm flex items-center gap-x-2">
              Your appointment with hospitals{" "}
              <span
                className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full"
              >
                <span>
                  {totalAppointments > 9 ? `${9}+` : totalAppointments}
                </span>
              </span>
            </Text>

            <section
              className={`appointment-container items-center justify-center mx-auto gap-10 ${
                totalAppointments !== 0 && "grid"
              } sm:grid-cols-2 xl:grid-cols-3 my-8`}
            >
              {totalAppointments == 0 ? (
                <div className="w-full mx-auto  p-4">
                  <Text className="text-center">No appointment found!</Text>
                </div>
              ) : (
                userAppointmentInfo?.map(
                  (appointment: userAppointmentInfoProps, index: number) => {
                    return (
                      <ApppointmentCard
                        key={appointment._id}
                        title={appointment.title}
                        description={appointment.description}
                        dateCreated={appointment.createdAt}
                        startDate={appointment.startDate}
                        endDate={appointment.endDate}
                        id={appointment._id}
                      />
                    );
                  }
                )
              )}
            </section>
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Appointment;
