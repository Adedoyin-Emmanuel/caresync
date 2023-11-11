"use client";

import React, { useEffect, useRef, useState } from "react";
import {HospitalSidebarNav} from "@/app/components/SidebarLayout";
import { SlBadge } from "react-icons/sl";
import Text from "@/app/components/Text";
import { BsPen } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { LuTimer } from "react-icons/lu";
import { MdUpdate } from "react-icons/md";
import { TbMessage2Bolt } from "react-icons/tb";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import {
  useGetReviewByIdQuery,
  saveSpecificReviewInfo,
  useGetUserByIdQuery,
  userDashboardInfoProps,
} from "@/app/store/slices/user.slice";
import { formatDateTime } from "@/app/helpers";
import moment from "moment";

const page = ({ params }: { params: { reviewId: string } }) => {
  const viewHospitalModalRef = useRef<HTMLDialogElement | any>(null);
  const deleteReviewModalRef = useRef<HTMLDialogElement | any>();
  const cancelReviewModalRef = useRef<HTMLDialogElement | any>();
  const updateReviewModalRef = useRef<HTMLDialogElement | any>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userSpecificReviewInfo } = useAppSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState<userDashboardInfoProps>();

  const {
    data: reviewData,
    isLoading: isReviewDataLoading,
    isError: isReviewDataError,
    isSuccess,
  } = useGetReviewByIdQuery(params.reviewId);

  const {
    data: hospitalData,
    isLoading: hospitalDataLoading,
    isError: hospitalDataError,
    refetch,
  } = useGetUserByIdQuery(userSpecificReviewInfo?.userId);

  useEffect(() => {
    if (isSuccess && reviewData) {
      dispatch(saveSpecificReviewInfo(reviewData.data));

      const refetchData = async () => {
        const response = await refetch();
        return response;
      };

      refetchData().then((data) => {});
      setUserDetails(hospitalData?.data);
    }
  }, [reviewData, params.reviewId, hospitalData]);

  const viewAllReviews = () => {
    router.back();
  };
  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isReviewDataLoading || hospitalDataLoading ? (
        <Loader />
      ) : isReviewDataError || hospitalDataError ? (
        <section className="w-full flex items-center flex-col ">
          <Text className="my-5">Couldn't get review details 😥</Text>
          <section className="my-5">
            <Button onClick={viewAllReviews}>All reviews</Button>
          </section>
        </section>
      ) : (
        <HospitalSidebarNav>
          <section className="w-full">
            <section className="review-header my-5">
              <h3 className="font-bold text-[18px]  capitalize">
                <span className="text-accent">
                  {" "}
                  {`${userDetails?.name}'s`}
                </span>{" "}
                Review
              </h3>
            </section>

            <section className="review-container xl:w-2/4">
              <section
                className={`review bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4`}
              >
                <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
                  <SlBadge className="w-6 h-6" />
                </section>

                <section className="other-content w-11/12 flex items-center justify-around">
                  <Text className="text-sm">
                    {
                      formatDateTime(userSpecificReviewInfo?.createdAt!)
                        .formattedDate
                    }
                  </Text>
                  <Text className="text-sm font-bold" noCapitalize={true}>
                    @{userDetails?.username}
                  </Text>
                </section>
              </section>
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
                  <section className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-accent hover:text-white rounded-md transition-colors duration-100 ease-linear">
                    <BsPen className="w-4 h-4" />
                    <div>
                      <Text className="block">update</Text>
                    </div>
                  </section>
                  <section className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-red-400 hover:text-white rounded-md transition-colors duration-100 ease-linear">
                    <AiOutlineDelete className="w-4 h-4" />
                    <div>
                      <Text className="block">delete</Text>
                    </div>
                  </section>
                </ul>
              </div>
            </section>

            <section className="review-details  flex flex-col items-start my-5 md:w-1/2 xl:w-2/4">
              <h3 className="font-bold text-[17px]  capitalize">details</h3>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <LuTimer className="w-5 h-5" />

                <Text className="text-sm">
                  created{" "}
                  {moment(new Date(userSpecificReviewInfo?.createdAt!))
                    .startOf("seconds")
                    .fromNow()}
                </Text>
              </section>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <MdUpdate className="w-5 h-5" />

                <Text className="text-sm">
                  updated{" "}
                  {moment(new Date(userSpecificReviewInfo?.updatedAt!))
                    .startOf("seconds")
                    .fromNow()}
                </Text>
              </section>

              <section className="flex items-center justify-center gap-x-2 my-1">
                <TbMessage2Bolt className="w-5 h-5" />

                <Text className="text-sm">
                  {" "}
                  {userSpecificReviewInfo?.message}
                </Text>
              </section>
            </section>
          </section>
        </HospitalSidebarNav>
      )}
    </div>
  );
};

export default page;
