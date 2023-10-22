"use client";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import Verified from "@/app/components/Verified";
import Link from "next/link";
import { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { SlBadge } from "react-icons/sl";

const ViewHospitalProfile = ({ params }: { params: { hospitalId: string } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    signupAs: "user",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="new-appointment w-full">
          <h3 className="font-bold text-2xl capitalize text-accent">
            View Profile
          </h3>
          <Text className="text-sm">
            viewing {params.hospitalId} profile
            <span className="text-accent">Mayfair</span>
          </Text>

          <section className="hospital-profile w-full ">
            <section className="profile-header w-full flex flex-col items-center">
              <div className="avatar cursor-pointer">
                <div className="w-24 rounded-full">
                  <img
                    className=""
                    src="https://api.dicebear.com/7.x/micah/svg?seed=mango"
                    alt="user profile image"
                  />
                </div>
              </div>

              <section className="profile w-11/12 md:w-1/2 xl:w-2/6">
                <section className="hospital-name w-full flex items-center justify-between mt-5">
                  <h3 className="font-bold text-[20px] capitalize flex items-center gap-x-1">
                    Mayfair
                    <span>
                      {" "}
                      <Verified big={true} />
                    </span>
                  </h3>

                  <Link
                    href={`/user/appointments/new/${params.hospitalId}/submit`}
                  >
                    <section className="submit-appointment bg-accent rounded-[20px] text-sm py-1 px-3 text-white text-center capitalize cursor-pointer hover:bg-secondary transition-colors duration-100 ease-in">
                      create appointment
                    </section>
                  </Link>
                </section>

                <Text noCapitalize className="text-sm">
                  @mayfair
                </Text>

                <Text className="text-sm mt-2">
                  Bridging health with technology
                </Text>

                <section className="other-details w-full flex flex-col items-start my-5">
                  <section className="location flex items-center justify-center gap-x-2 my-1">
                    <GrLocation className="w-5 h-5" />
                    <Text className="text-sm">lagos nigeria</Text>
                  </section>

                  <section className="location flex items-center justify-center gap-x-2 my-1">
                    <HiOutlineShieldCheck className="w-5 h-5" />
                    <Text className="text-sm">28 total checkups</Text>
                  </section>

                  <section className="location flex items-center justify-center gap-x-2 my-1">
                    <SlBadge className="w-5 h-5" />
                    <Text className="text-sm">8 reviews</Text>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default ViewHospitalProfile;
