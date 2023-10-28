"use client";
import {
  AppointmentCardProps,
  ApppointmentCard,
} from "@/app/components/AppointmentCard";
import Loader from "@/app/components/Loader";
import { HospitalSidebarNav } from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import {
  saveAppointmentInfo,
  useGetHospitalAppointmentsQuery,
} from "@/app/store/slices/user.slice";
import { useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Appointment = () => {
  const { userAppointmentInfo } = useAppSelector((state) => state.user);
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetHospitalAppointmentsQuery(userInfo?._id);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(saveAppointmentInfo(data?.data));
      setTotalAppointments(data?.data.length);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : (
        <HospitalSidebarNav>
          <section className="appointments my-5">
            <h3 className="font-bold text-2xl capitalize text-accent">
              Scheduled appointments
            </h3>
            <Text className="text-sm flex items-center gap-x-2">
              Your appointment with users{" "}
              <span
                className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
              >
                <span className="text-[12px]">
                  {totalAppointments > 100 ? `${99}+` : totalAppointments}
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
                  (appointment: AppointmentCardProps | any) => {
                    return (
                      <ApppointmentCard
                        key={appointment._id}
                        title={appointment.title}
                        description={appointment.description}
                        createdAt={appointment.createdAt}
                        startDate={appointment.startDate}
                        endDate={appointment.endDate}
                        _id={appointment._id}
                        userType="hospital"
                      />
                    );
                  }
                )
              )}
            </section>
          </section>
        </HospitalSidebarNav>
      )}
    </div>
  );
};

export default Appointment;
