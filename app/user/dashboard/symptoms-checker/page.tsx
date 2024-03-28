"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SidebarLayout from "@/app/components/SidebarLayout";
import Seo from "@/app/components/Seo/Seo";
import Text from "@/app/components/Text";
import Input from "@/app/components/Input";

const SymptomsChecker = () => {
  return (
    <>
      <Seo
        title="Symptoms Checker"
        description="Symptoms checker to help you identify potential health
                    conditions based on your symptoms"
        keywords="symptoms, symptoms checker,  health diagnosis"
      />
      <SidebarLayout>
        <section className="my-5 w-full">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Symptoms checker
          </h3>
          <Text className="text-sm flex items-center gap-x-2">
            Identify potential health conditions based on your symptoms
          </Text>

          <section className="my-5 md:grid grid-cols-3">
            <section className="p-3 w-full border">
              <Text noCapitalize className="flex items-center gap-x-2">
                Select symptoms
                <span
                  className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
                >
                  <span className="text-[12px]">1</span>
                </span>
              </Text>
              <br />
              <Input
                type="text"
                placeholder="Type your symptoms here"
                className=""
              />

              <select
                className="select border-2 border-gray-300 focus:outline-none rounded-md w-full my-5 h-16"
                name="gender"
              >
                <option value="adult-male">Male</option>
                <option value="adult-female">Female</option>
                <option value="child">Child</option>
              </select>

              <Input type="number" placeholder="Enter your birthyear" />
            </section>

            <section className="w-full p-3 border">
              <Text noCapitalize className="flex items-center gap-x-2">
                Selected symptoms
                <span
                  className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
                >
                  <span className="text-[12px]">2</span>
                </span>
              </Text>
              <br />

              <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" defaultChecked />
                  <Text noCapitalize className="collapse-title">
                    Reduced appetite
                  </Text>
                  <div className="collapse-content">
                    <p className="text-sm">Do you've reduced appetite</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" />
                  <Text noCapitalize className="collapse-title">
                    Tiredness
                  </Text>
                  <div className="collapse-content">
                    <p className="text-sm">
                      Do you feel tired lately even when you don't do anything
                      stressful?
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" />
                  <Text noCapitalize className="collapse-title">
                    Sleeplessness
                  </Text>
                  <div className="collapse-content">
                    <p className="text-sm">
                      Do you've difficulties sleeping recently?
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full p-3 border">
              <Text noCapitalize className="flex items-center gap-x-2">
                Possible diseases
                <span
                  className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
                >
                  <span className="text-[12px]">3</span>
                </span>
              </Text>
              <br />

              <Text className="">Pediatrics</Text>
              <Text className="">Pediatrics</Text>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </>
  );
};

export default SymptomsChecker;
