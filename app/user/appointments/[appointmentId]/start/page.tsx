"use client";
import SidebarLayout from "@/app/components/SidebarLayout";
import {
  useGetAppointmentByIdQuery,
  useGetAppointmentTokenQuery,
  useCreateAppointmentMutation,
  saveUserSpecificAppointmentInfo
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from "@livekit/components-react";
import Loader from "@/app/components/Loader";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";

const StartAppointment = () => {
  const pathName = usePathname();
  const router = useRouter();
  const serverUrl = "wss://caresync-y6vac96e.livekit.cloud";
  const urlParts = pathName.split("/");
  let appointmentId = urlParts[3];

  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, isError, refetch } = useGetAppointmentByIdQuery(appointmentId);

  useEffect(() => {
    refetch();
    if (data) {
      console.log(data.data);
      dispatch(saveUserSpecificAppointmentInfo(data.data));
    }
  }, [appointmentId, data]);

 const viewAllAppointments = () => {
   router.push("/user/appointments")
 };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <section className="w-full flex items-center flex-col ">
          <Text className="my-5">Couldn't get appointment details 😥</Text>
          <section className="my-5">
            <Button onClick={viewAllAppointments}>All appointments</Button>
          </section>
        </section>
      ) : (
        <SidebarLayout>
          <h3 className="font-bold text-2xl  capitalize">
            appointment id is {appointmentId}
          </h3>
        </SidebarLayout>
      )}
    </div>
  );
};

export default StartAppointment;
