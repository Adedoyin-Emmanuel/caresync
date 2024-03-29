"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { updateUserInfo } from "@/app/store/slices/auth.slice";
import { saveDashboardInfo } from "@/app/store/slices/user.slice";
import { useUpdateUserMutation } from "@/app/store/slices/user.slice";
import { useAppSelector } from "@/app/store/store";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Seo from "@/app/components/Seo/Seo";

export default function Profile() {
  const { userDashboardInfo } = useAppSelector((state) => state.user);

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: userDashboardInfo?.name,
    email: userDashboardInfo?.email,
    username: userDashboardInfo?.username,
    bio: userDashboardInfo?.bio,
    location: userDashboardInfo?.location,
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        body: formData,
        id: userDashboardInfo?._id,
      };
      const response: any = await updateUser(dataToSubmit).unwrap();

      //dispatch the saveDashboardInfo since the response is also the user object
      toast.success(response.message);
      if (response?.data) {
        dispatch(updateUserInfo(response.data));
        dispatch(saveDashboardInfo(response.data));
      }
    } catch (error: any) {
      console.log(error.message);

      toast.error(error?.data?.message || error.error || error?.data);
    }
  };

  return (
    <>
      <Seo
        title="My Profile"
        description="Your profile"
        keywords="profile, your profile"
      />
      <div className="w-screen h-screen bg-zinc-50">
        {updateUserLoading ? (
          <Loader />
        ) : (
          <SidebarLayout>
            <section className="appointments my-5">
              <h3 className="font-bold text-2xl capitalize text-accent">
                profile
              </h3>
              <Text className="text-sm">update your profile</Text>
              <section className="update-profile w-full my-8">
                <section className="image-section flex flex-col items-center justify-center">
                  <div className="avatar cursor-pointer">
                    <div className="w-24 rounded-full">
                      <img
                        className=""
                        src={userDashboardInfo?.profilePicture}
                        alt="user profile image"
                      />
                    </div>
                    <section className="pen-container bg-accent flex items-center justify-center rounded-full w-8 h-8 transform-gpu text-white translate-y-16 -translate-x-10 hover:scale-110 duration-100 ease-linear hover:bg-secondary hover:text-slate-200">
                      <AiOutlineCamera className="h-6 w-6" />
                    </section>
                  </div>

                  <form
                    className="w-full p-1 md:w-1/2 xl:w-2/4"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <section className="my-4 mb-5">
                      <label htmlFor="name" className="text-md block my-2">
                        Fullname
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your fullname"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </section>

                    <section className="my-4 mb-5">
                      <label htmlFor="username" className="text-md block my-2">
                        Username
                      </label>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </section>

                    <section className="my-4 mb-5">
                      <label htmlFor="email" className="text-md block my-2">
                        Email
                      </label>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </section>
                    <section className="my-4 mb-5">
                      <label htmlFor="bio" className="text-md block my-2">
                        Bio
                      </label>
                      <textarea
                        className="textarea border-2 border-gray-300 focus:outline-none rounded-md w-full textarea-md"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </section>

                    <section className="my-4 mb-5">
                      <label htmlFor="bio" className="text-md block my-2">
                        Location
                      </label>
                      <Input
                        type="text"
                        name="location"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </section>

                    <section className="my-4 mb-5 w-full">
                      <Button disabled={updateUserLoading}> Update info</Button>
                    </section>
                  </form>
                </section>
              </section>
            </section>
          </SidebarLayout>
        )}
      </div>
    </>
  );
}
