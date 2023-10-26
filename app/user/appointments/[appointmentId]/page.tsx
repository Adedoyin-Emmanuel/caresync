"use client";
import { AppointmentLabel } from "@/app/components/AppointmentCard";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import Modal from "@/app/components/Modal";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import Verified from "@/app/components/Verified";
import { formatDateTime } from "@/app/helpers";
import {
  hospitalProps,
  saveUserSpecificAppointmentInfo,
  useGetAppointmentByIdQuery,
  useGetHospitalByIdQuery,
} from "@/app/store/slices/user.slice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { BiCalendarWeek } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LuTimer } from "react-icons/lu";
import { MdOutlineTitle } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { TbMessage2Bolt } from "react-icons/tb";
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

  const viewHospitalModalRef = useRef<HTMLDialogElement | any>(null);
  const deleteAppointmentModalRef = useRef<HTMLDialogElement | any>();
  const cancelAppointmentModalRef = useRef<HTMLDialogElement | any>();
  const updateAppointmentModalRef = useRef<HTMLDialogElement | any>();

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

  const handleDeleteAppointmentClick = () => {
    if (deleteAppointmentModalRef && deleteAppointmentModalRef.current) {
      deleteAppointmentModalRef?.current.showModal();
      console.log("something");
    }
  };

  const handleCancelAppointmentClick = () => {
    if (cancelAppointmentModalRef && cancelAppointmentModalRef.current) {
      cancelAppointmentModalRef.current.showModal();
      console.log("something");
    }
  };

  const handleUpdateAppointmentClick = () => {
    if (updateAppointmentModalRef && updateAppointmentModalRef.current) {
      updateAppointmentModalRef?.current.showModal();
      console.log("something");
    }
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
              <div className="dropdown dropdown-left transform -translate-y-10 -translate-x-3">
                <BsPen
                  tabIndex={0}
                  className="text-accent w-6 h-6 cursor-pointer"
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 bg-gray-100 rounded w-40"
                >
                  <section
                    className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-accent hover:text-white rounded-md transition-colors duration-100 ease-linear"
                    onClick={handleUpdateAppointmentClick}
                  >
                    <BsPen className="w-4 h-4" />
                    <div>
                      <Text className="block">update</Text>
                    </div>
                  </section>
                  <section
                    className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-yellow-300 hover:text-white rounded-md transition-colors duration-100 ease-linear"
                    onClick={handleCancelAppointmentClick}
                  >
                    <AiOutlineClose className="w-4 h-4" />
                    <div>
                      <Text className="block">cancel</Text>
                    </div>
                  </section>
                  <section
                    className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-red-400 hover:text-white rounded-md transition-colors duration-100 ease-linear"
                    onClick={handleDeleteAppointmentClick}
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                    <div>
                      <Text className="block">delete</Text>
                    </div>
                  </section>
                </ul>
              </div>
            </section>

            <section className="appointment-details  flex flex-col items-start my-5 md:w-1/2 xl:w-2/4">
              <h3 className="font-bold text-[17px]  capitalize">details</h3>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <MdOutlineTitle className="w-5 h-5" />
                <Text className="text-sm">
                  {userSpecificAppointmentInfo?.title}
                </Text>
              </section>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <LuTimer className="w-5 h-5" />

                <Text className="text-sm">
                  created{" "}
                  {moment(new Date(userSpecificAppointmentInfo?.createdAt!))
                    .startOf("seconds")
                    .fromNow()}
                </Text>
              </section>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <TbMessage2Bolt className="w-5 h-5" />

                <Text className="text-sm">
                  {" "}
                  {userSpecificAppointmentInfo?.description}
                </Text>
              </section>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <BiCalendarWeek className="w-5 h-5" />

                <Text className="text-sm">
                  {" "}
                  {
                    formatDateTime(userSpecificAppointmentInfo?.startDate!)
                      .dateMonthYear
                  }{" "}
                  (
                  {
                    formatDateTime(userSpecificAppointmentInfo?.startDate!)
                      .hoursAndMinutes
                  }
                  {" - "}
                  {
                    formatDateTime(userSpecificAppointmentInfo?.endDate!)
                      .hoursAndMinutes
                  }
                  )
                </Text>
              </section>
            </section>

            <button
              className="w-36 bg-accent p-2 capitalize  text-white rounded text-sm"
              onClick={() => viewHospitalModalRef?.current.showModal()}
            >
              hospital profile
            </button>

            <dialog
              id="profile_modal"
              className="modal"
              ref={viewHospitalModalRef}
            >
              <div className="modal-box">
                <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-sm btn-circle shadow-none border-none outline-none bg-gray-100 hover:bg-red-400 hover:text-white duration-100 transition-colors ease-linear absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                <section className="hospital-profile w-full my-5">
                  <section className="profile-header w-full flex flex-col items-center">
                    <div className="avatar cursor-pointer">
                      <div className="w-24 rounded-full">
                        <img
                          src={hospitalDetails?.profilePicture}
                          alt="hospital profile image"
                        />
                      </div>
                    </div>

                    <section className="profile w-full p-1 md:p-0">
                      <section className="hospital-name w-full flex items-center justify-between mt-5">
                        <h3 className="font-bold text-[20px] capitalize flex items-center gap-x-1">
                          {hospitalDetails?.clinicName}
                          <span>
                            {" "}
                            {hospitalDetails?.isVerified && (
                              <Verified big={true} />
                            )}
                          </span>
                        </h3>
                      </section>

                      <Text noCapitalize className="text-sm">
                        @{hospitalDetails?.username}
                      </Text>

                      <Text className="text-sm mt-2">
                        {hospitalDetails?.bio}
                      </Text>

                      <section className="other-details w-full flex flex-col items-start my-5">
                        <section className="location flex items-center justify-center gap-x-2 my-1">
                          <GrLocation className="w-5 h-5" />
                          <Text className="text-sm">
                            {hospitalDetails?.location || "lagos nigeria"}
                          </Text>
                        </section>

                        <section className="checkups flex items-center justify-center gap-x-2 my-1">
                          <HiOutlineShieldCheck className="w-5 h-5" />
                          <Text className="text-sm">
                            {hospitalDetails?.allTotalAppointments} total
                            checkups
                          </Text>
                        </section>

                        <section className="review flex items-center justify-center gap-x-2 my-1">
                          <SlBadge className="w-5 h-5" />
                          <Text className="text-sm">
                            {hospitalDetails?.reviews.length} reviews
                          </Text>
                        </section>
                      </section>
                    </section>
                  </section>
                </section>
              </div>
            </dialog>

            <Modal ref={updateAppointmentModalRef}>update appointment</Modal>
            <Modal ref={deleteAppointmentModalRef}>delete appointment</Modal>
            <Modal ref={cancelAppointmentModalRef}>cancel appointment</Modal>
          </section>
        )}
      </SidebarLayout>
    </div>
  );
};

export default Appointment;
