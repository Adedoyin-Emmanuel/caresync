"use client";
import { AppointmentLabel } from "@/app/components/AppointmentCard";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import {
  hospitalProps,
  saveUserSpecificAppointmentInfo,
  useGetAppointmentByIdQuery,
  useGetHospitalByIdQuery,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { BsPen } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Appointment = ({ params }: { params: { appointmentId: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAppointmentByIdQuery(
    params.appointmentId
  );
  const dispatch = useDispatch<AppDispatch>();
  const [hospitalDetails, setHospitalDetails] = useState<hospitalProps>();
  const { userSpecificAppointmentInfo } = useAppSelector((state) => state.user);
  const { data: hospitalData } = useGetHospitalByIdQuery(
    userSpecificAppointmentInfo?.hospitalId
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(saveUserSpecificAppointmentInfo(data.data));
      console.log(hospitalData);
      setHospitalDetails(hospitalData?.data);
    }
  }, [data, hospitalData]);

  const viewAllAppointments = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
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
          <section className="appointment-details w-full">
            <section className="appointment-header my-5">
              <h3 className="font-bold text-[18px]  capitalize">
                appointment with{" "}
                <span className="text-accent">
                  {hospitalDetails?.clinicName}{" "}
                </span>
              </h3>
            </section>

            <section className="appointment-details md:w-1/2 xl:w-2/4 ">
              <AppointmentLabel
                key={userSpecificAppointmentInfo?.id}
                userType="hospital"
                status={userSpecificAppointmentInfo?.status!}
                attender={userSpecificAppointmentInfo?.hospitalId!}
                _id={userSpecificAppointmentInfo?._id!}
                href={``}
                createdAt={userSpecificAppointmentInfo?.createdAt!}
              />
            </section>

            <section className="dropdown-container md:w-1/2 xl:w-2/4 flex items-end justify-end p-3">
              <div className="dropdown dropdown-left transform -translate-y-10">
                <BsPen
                  tabIndex={0}
                  className="text-accent w-6 h-6 cursor-pointer"
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 bg-gray-100 rounded w-40"
                >
                  <section className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-accent hover:text-white rounded-md transition-colors duration-100 ease-linear">
                    <BsPen className="w-4 h-4" />
                    <div className="">
                      <Text className="block">update</Text>
                    </div>
                  </section>
                  <section className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-yellow-300 hover:text-white rounded-md transition-colors duration-100 ease-linear">
                    <AiOutlineClose className="w-4 h-4" />
                    <div className="">
                      <Text className="block">cancel</Text>
                    </div>
                  </section>
                  <section className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-red-400 hover:text-white rounded-md transition-colors duration-100 ease-linear">
                    <AiOutlineDelete className="w-4 h-4" />
                    <div className="">
                      <Text className="block">delete</Text>
                    </div>
                  </section>
                </ul>
              </div>
            </section>
          </section>
        )}
      </SidebarLayout>
    </div>
  );
};

export default Appointment;
