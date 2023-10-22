"use client";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useState, useEffect } from "react";
import { LoaderSmall } from "@/app/components/Loader";
import {
  useSearchHospitalQuery,
  useGetHospitalRatingQuery,
} from "@/app/store/slices/user.slice";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { saveHospitalSearchInfo } from "@/app/store/slices/user.slice";

const NewAppointment = () => {

  const [formData, setFormData] = useState({
    hospitalName: ''
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="new-appointment">
          <h3 className="font-bold text-2xl capitalize text-accent">
            New appointment
          </h3>
          <Text className="text-sm">
            Find an hospital to submit appointment request to
          </Text>

          <section className="hospitals">
            <form className="flex items-center justify-center mt-5">
              <input
                type="search"
                placeholder="Search hospitals"
                name="hospitalName"
                className="bg-[#F5F5F5] capitalize p-5 rounded-full w-11/12 lg:w-8/12   outline-none border-2 border-transparent focus:border-slate-200 hover:border-slate-200 my-5 text-sm"
                onChange={handleInputChange}
                value={formData.hospitalName}
              ></input>
            </form>

            <section className="found-hospitals w-full">
              <Text className="text-center text-sm">
                search result for <span className="text-accent">mayfair</span>
              </Text>
            </section>

            <section className="all-hospitals w-full items-center  mx-auto gap-10 grid sm:grid-cols-2 xl:grid-cols-3 my-8">
              {/* add the hospital card here */}
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default NewAppointment;
