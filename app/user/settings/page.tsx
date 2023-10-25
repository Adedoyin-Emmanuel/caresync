"use client";

import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import Verified from "@/app/components/Verified";
import { logoutUser } from "@/app/store/slices/auth.slice";
import { resetUser, useLogoutMutation } from "@/app/store/slices/user.slice";
import { useAppSelector } from "@/app/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsPenFill, BsPeopleFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { BiSolidUser } from "react-icons/bi";

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

  const handleNavigateToProfile = () => {
    router.push("/user/profile/me");
  }

  const handleUpdateProfile = () => {
    router.push("/user/profile");
  }


  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="appointments my-5">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Settings
          </h3>
          <Text className="text-sm">change your settings</Text>
          <section className="settings-section my-8">
            <section
              className="profile-container  w-full flex items-center justify-center cursor-pointer"
              onClick={handleNavigateToProfile}
            >
              <section className="profile-section w-full p-2 my-5 flex items-center md:justify-center gap-x-5 md:gap-x-20">
                <div className="avatar cursor-pointer">
                  <div className="w-16 rounded-full">
                    <img
                      className=""
                      src={`${userDashboardInfo?.profilePicture}`}
                      alt="user profile image"
                    />
                  </div>
                  <section className="pen-container bg-accent flex items-center justify-center rounded-full w-6 h-6 transform-gpu text-white translate-y-12 -translate-x-7 hover:scale-110 duration-100 ease-linear hover:bg-secondary hover:text-slate-200">
                    <Link href={"/user/profile"}>
                      {" "}
                      <BsPenFill />
                    </Link>
                  </section>
                </div>
                <section className="user-info">
                  <h3 className="font-bold capitalize flex items-center gap-x-1">
                    {userDashboardInfo?.name}
                    <span>{userDashboardInfo?.isVerified && <Verified />}</span>
                  </h3>
                  <Text className="text-sm font-bold" noCapitalize={true}>
                    @{userDashboardInfo?.username}
                  </Text>
                  <Text className="text-sm">{userDashboardInfo?.bio}</Text>
                </section>
              </section>
            </section>

            <section className="action-container w-full flex flex-col items-center md:justify-center">
              <section
                className="account-details my-5 flex items-center transition-colors duration-100 ease-linear hover:bg-purple-100 rounded cursor-pointer gap-x-10 w-full p-2 md:w-6/12"
                onClick={handleUpdateProfile}
              >
                <FaKey className="h-5 w-5" />

                <Link href="/user/profile" className="details">
                  <h3 className="account font-bold capitalize text-[16px]">
                    account{" "}
                  </h3>
                  <Text className="text-sm">update your account info</Text>
                </Link>
              </section>

              <section
                className="account-details my-5 flex items-center transition-colors duration-100 ease-linear hover:bg-purple-100 rounded cursor-pointer gap-x-10 w-full p-2 md:w-6/12"
                onClick={handleNavigateToProfile}
              >
                <BiSolidUser className="h-5 w-5" />

                <section className="details">
                  <Link href={"/user/profile/me"}>
                    <h3 className="account font-bold capitalize text-[16px]">
                      profile{" "}
                    </h3>
                    <Text className="text-sm">view your profile</Text>
                  </Link>
                </section>
              </section>

              <section className="account-details my-5 flex items-center transition-colors duration-100 ease-linear hover:bg-purple-100 rounded cursor-pointer gap-x-10 w-full p-2 md:w-6/12">
                <BsPeopleFill className="h-5 w-5" />

                <section className="details">
                  <h3 className="account font-bold capitalize text-[16px]">
                    Invite{" "}
                  </h3>
                  <Text className="text-sm">invite your friends to caresync</Text>
                </section>
              </section>

              <section
                className="account-details my-5 flex items-center transition-colors duration-100 ease-linear hover:bg-purple-100 rounded cursor-pointer gap-x-10 w-full p-2 md:w-6/12"
                onClick={handleLogoutClick}
              >
                <FiLogOut className="h-5 w-5" />

                <section className="details">
                  <h3 className="account font-bold capitalize text-[16px]">
                    Logout{" "}
                  </h3>
                  <Text className="text-sm">log out of your account</Text>
                </section>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Settings;
