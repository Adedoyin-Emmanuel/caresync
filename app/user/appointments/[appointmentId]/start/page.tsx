"use client";
import SidebarLayout from "@/app/components/SidebarLayout";
import {
  useGetAppointmentByIdQuery,
  useGetAppointmentTokenQuery,
  useCreateAppointmentRoomMutation,
  saveUserSpecificAppointmentInfo,
  useGetHospitalByIdQuery,
  saveHospitalSearchProfileInfo,
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
import Loader, {LoaderSmall} from "@/app/components/Loader";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";

const StartAppointment = () => {
  const pathName = usePathname();
  const router = useRouter();
  const serverUrl = "wss://caresync-y6vac96e.livekit.cloud";
  const urlParts = pathName.split("/");
  let appointmentId = urlParts[3];

  const dispatch = useDispatch<AppDispatch>();
  const [skip, setSkip] = useState<boolean>(true);

  const { data, isLoading, isError, refetch } = useGetAppointmentByIdQuery(appointmentId);
  const { userDashboardInfo, userSpecificAppointmentInfo, hospitalSearchProfileInfo } = useAppSelector((state) => state.user);
  const {data: hospitalDetails} = useGetHospitalByIdQuery(userSpecificAppointmentInfo?.hospitalId!);
  const [roomToken, setRoomToken] = useState();
  const [createAppointmentRoom, { isLoading: createAppointmentRoomLoading }] =
   useCreateAppointmentRoomMutation();
 
  
  useEffect(() => {
    refetch();
    if (data && hospitalDetails) {
      console.log(data?.data);
      console.log(hospitalDetails?.data);
      dispatch(saveUserSpecificAppointmentInfo(data.data));
      dispatch(saveHospitalSearchProfileInfo(hospitalDetails.data));
    }
  }, [appointmentId, data, hospitalDetails]);



  const dataToSend = {
    participantName: userDashboardInfo?.name,
    roomName: userSpecificAppointmentInfo?._id,
  };


  console.log(dataToSend);

  const { data: tokenData, refetch: refetchToken, isLoading:tokenDataLoading, isError: tokenDataError } = useGetAppointmentTokenQuery(dataToSend, {
    skip,
  });


  
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData);
    }
  }, [skip]);

  
  const handleJoinRoom = () => {
    setSkip(false);
  }

  const viewAllAppointments = () => {
    router.push("/user/appointments");
  };
  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <section className="w-full flex items-center flex-col ">
          <Text className="my-5">Couldn't get appointment details 😥</Text>
          <section className="my-5 w-full md:w-1/4 mx-auto">
            <Button onClick={viewAllAppointments}>All appointments</Button>
          </section>
        </section>
      ) : (
        <SidebarLayout>
          {tokenDataLoading ? (
            <LoaderSmall />
          ) : tokenDataError ? (
            <section className="w-full flex items-center flex-col ">
              <Text className="my-5">Couldn't join room 😥</Text>
              <section className="my-5 w-full md:w-1/4 mx-auto">
                <Button onClick={viewAllAppointments}>All appointments</Button>
              </section>
            </section>
          ) : (
            <section className="create-room">
              <h3 className="font-bold text-2xl capitalize my-5">
                appointment with{" "}
                <span className="text-accent">
                  {hospitalSearchProfileInfo?.clinicName}
                </span>
              </h3>

              <section className="button-container md:w-80 mx-auto my-5">
                <Button onClick={handleJoinRoom} disabled={tokenDataLoading}>
                  join meeting room
                </Button>
              </section>
            </section>
          )}
          <section className="meeting-area"></section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default StartAppointment;
