"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { useGetOnlineHospitalsQuery, saveOnlineHospitalsInfo } from "@/app/store/slices/user.slice";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/store/store";
import Text from "../Text";
import { LoaderSmall } from "../Loader";


interface ActiveHospitalsProps {
    className?: string;
}

const ActiveHospitals = ({className}: ActiveHospitalsProps)=> {

    const {data, isLoading, refetch} = useGetOnlineHospitalsQuery({});
    const {onlineHospitals} = useAppSelector((state)=> state.user);
    const dispatch = useDispatch<AppDispatch>();



    useEffect(()=>{
        if(data){
            console.log(data);
            dispatch(saveOnlineHospitalsInfo(data.data));
        }
    }, [data]);

    return (
           <section className="active-hospitals flex items-center justify-center">
                <section className={`hospital w-full flex md:justify-start ${isLoading || onlineHospitals?.length === 0 ? "items-center justify-center md:justify-center" : "items-start justify-start"}  md:gap-x-5 p-2 gap-x-4`}>
                    {isLoading ? <LoaderSmall/> : onlineHospitals?.length === 0 ? <Text className="text-sm text-center">No hospital online</Text> : onlineHospitals && onlineHospitals?.map!((hospital)=>{
                        return  (<div className="avatar cursor-pointer online">
                        <div className="w-14 rounded-full">
                          <img src={hospital?.profilePicture} />
                        </div>
                      </div>
                        )
                    })}
                </section>
              </section>
    );  
}

export default ActiveHospitals;
    