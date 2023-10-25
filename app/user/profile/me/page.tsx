"use client";

import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import Verified from "@/app/components/Verified";
import { logoutUser } from "@/app/store/slices/auth.slice";
import {
  resetUser,
  useGetUserQuery,
  useLogoutMutation,
} from "@/app/store/slices/user.slice";
import { useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import moment from "moment";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { SlBadge } from "react-icons/sl";

const Settings = () => {
  const { userDashboardInfo } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (!userDashboardInfo) router.push("/user/dashboard");
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    const response: any = await logout({});

    if (response) {
      toast.success(response.data.message);
      router.push("/auth/login");
      dispatch(resetUser());
      dispatch(logoutUser());
    }
  };

  const { data, isLoading, isError } = useGetUserQuery({});

  const dateCreated: any = userDashboardInfo && userDashboardInfo?.createdAt;

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Text>An error occured</Text>
      ) : (
        <SidebarLayout>
          <section className="appointments my-5">
            <section className="new-appointment w-full">
              <section className="hospital-profile w-full my-5">
                <section className="profile-header w-full flex flex-col items-center">
                  <div className="avatar cursor-pointer">
                    <div className="w-24 rounded-full">
                      <img
                        className=""
                        src={userDashboardInfo?.profilePicture}
                        alt="hospital profile image"
                      />
                    </div>
                  </div>

                  <section className="profile w-full p-1 md:p-0 md:w-1/2 xl:w-2/6">
                    <section className="hospital-name w-full flex items-center justify-between mt-5">
                      <h3 className="font-bold text-[20px] capitalize flex items-center gap-x-1">
                        {userDashboardInfo?.name}
                        <span>
                          {" "}
                          {userDashboardInfo?.isVerified && (
                            <Verified big={true} />
                          )}
                        </span>
                      </h3>

                      <Link href={"/user/profile"}>
                        <section className="submit-appointment bg-accent rounded-[20px] text-sm py-1 px-3 text-white text-center capitalize cursor-pointer hover:bg-secondary transition-colors duration-100 ease-in">
                          update profile
                        </section>
                      </Link>
                    </section>

                    <Text noCapitalize className="text-sm">
                      @{userDashboardInfo?.username}
                    </Text>

                    <Text className="text-sm mt-2">
                      {userDashboardInfo?.bio}
                    </Text>

                    <section className="other-details w-full flex flex-col items-start my-5">
                      <section className="location flex items-center justify-center gap-x-2 my-1">
                        <GrLocation className="w-5 h-5" />
                        <Text className="text-sm">
                          {userDashboardInfo?.location}
                        </Text>
                      </section>

                      <section className="location flex items-center justify-center gap-x-2 my-1">
                        <HiOutlineShieldCheck className="w-5 h-5" />
                        <Text className="text-sm">
                          {userDashboardInfo?.allTotalAppointments} total
                          checkups
                        </Text>
                      </section>

                      <section className="location flex items-center justify-center gap-x-2 my-1">
                        <SlBadge className="w-5 h-5" />
                        <Text className="text-sm">
                          {userDashboardInfo?.reviews.length} reviews
                        </Text>
                      </section>

                      <section className="date-joined flex items-center justify-center gap-x-2 my-1">
                        <MdDateRange className="w-5 h-5" />
                        <Text className="text-sm">
                          joined{" "}
                          {moment(new Date(dateCreated))
                            .startOf("days")
                            .fromNow()}{" "}
                        </Text>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Settings;
