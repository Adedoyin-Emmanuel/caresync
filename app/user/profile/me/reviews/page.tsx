"use client";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import React, { useState, useEffect } from "react";
import { LuTimer } from "react-icons/lu";

const AllReviews = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="reviews my-5 w-full">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Your reviews
          </h3>
          <Text className="text-sm flex items-center gap-x-2">
            reviews you've made for hospitals
            <span
              className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
            >
              <span className="text-[12px]">2</span>
            </span>
          </Text>

          <section className="all-reviews">
            <section className="review-one bg-slate-50 p-3 rounded w-full md:w-96 cursor-pointer my-5">
              <section className="header flex items-center justify-between my-1">
                <section className="image w-10 rounded-full">
                  <img
                    src="https://api.dicebear.com/7.x/micah/svg?seed=emmysoft"
                    alt="image"
                  />
                </section>

                <div className="text-[13px] font-bold capitalize flex items-center  gap-x-1">
                  <LuTimer className="w-5 h-5" />5 days ago
                </div>
              </section>

              <section className="body text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                at, corporis voluptatem voluptatibus incidunt quasi perspiciatis
                explicabo praesentium et, nostrum dolor numquam distinctio
                repellat tempore fugiat rerum veniam sunt minima?
              </section>

              <section className="footer my-1">
                <Text noCapitalize className="font-bold">
                  @emmysoft
                </Text>
              </section>
              <section className="button my-1 mt-2">
                <Button>view details</Button>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default AllReviews;
