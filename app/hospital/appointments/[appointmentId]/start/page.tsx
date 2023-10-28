"use client";
import { HospitalSidebarNav } from "@/app/components/SidebarLayout";
import {
  saveAppointmentInfo,
  useGetUserAppointmentsQuery,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const StartAppointment = () => {
  const { userAppointmentInfo } = useAppSelector((state) => state.user);
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetUserAppointmentsQuery(userInfo?._id);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      dispatch(saveAppointmentInfo(data?.data));
      setTotalAppointments(data?.data.length);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <HospitalSidebarNav>
        <h3 className="font-bold text-2xl  capitalize">
          hello we want to start the appointment{" "}
        </h3>
      </HospitalSidebarNav>
    </div>
  );
};

export default StartAppointment;
