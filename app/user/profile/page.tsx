"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { AiOutlineCamera } from "react-icons/ai";

const Profile = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="appointments my-5">
          <h3 className="font-bold text-2xl capitalize text-accent">profile</h3>
          <Text className="text-sm">update your profile</Text>
          <section className="update-profile w-full ">
            <section className="image-section flex flex-col items-center justify-center">
              <div className="avatar cursor-pointer">
                <div className="w-24 rounded-full">
                  <img
                    className=""
                    src="https://api.dicebear.com/7.x/micah/svg?seed=micah"
                    alt="user profile image"
                  />
                </div>
                <section className="pen-container bg-accent flex items-center justify-center rounded-full w-8 h-8 transform-gpu text-white translate-y-16 -translate-x-10 hover:scale-110 duration-100 ease-linear hover:bg-secondary hover:text-slate-200">
                  <AiOutlineCamera className="h-6 w-6" />
                </section>
              </div>

              <form className="w-11/12 md:w-1/2 xl:w-2/4">
                <section className="my-4 mb-5">
                  <label htmlFor="fullname" className="text-md block my-2">
                    Fullname
                  </label>
                  <Input
                    type="text"
                    name="fullname"
                    placeholder="Enter your fullname"
                    value={"Adedoyin Emmanuel"}
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
                    value={"@doyin"}
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
                    value={"adedoyine535@gmail.com"}
                  />
                </section>
                <section className="my-4 mb-5">
                  <label htmlFor="bio" className="text-md block my-2">
                    Bio
                  </label>
                  <textarea
                    className="textarea border-2 border-gray-300 focus:outline-none rounded-md w-full textarea-md"
                    value={"Bridging Health With Technology"}
                  ></textarea>
                </section>

                <section className="my-4 mb-5 w-full">
                  <Button> Update info</Button>
                </section>
              </form>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Profile;
