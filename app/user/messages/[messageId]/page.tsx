"use client";

import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetHospitalByIdQuery,
  hospitalProps,
  useGetRoomTokenQuery,
} from "@/app/store/slices/user.slice";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { useAppSelector } from "@/app/store/store";
import { socket } from "@/app/store/middlewares/socket";

const Messages = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hospitalId = searchParams.get("hospitalId");
  const {
    data: hospitalData,
    isLoading: hospitalDataLoading,
    isError,
  } = useGetHospitalByIdQuery(hospitalId);
  const [fetchedHospitalData, setFetchedHospitalData] =
    useState<hospitalProps>();
  const [roomIdToken, setRoomIdToken] = useState<string>();
  const { userDashboardInfo } = useAppSelector((state) => state.user);
  const { data: roomIdData, isLoading: roomIdLoading } = useGetRoomTokenQuery({
    userId: userDashboardInfo?._id,
    hospitalId: hospitalId,
  });

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (hospitalData) {
      setFetchedHospitalData(hospitalData?.data);
    }
    if (roomIdData) {
      setRoomIdToken(roomIdData?.data?.roomId);

      //Join the chat
      socket.emit("joinRoom", roomIdToken);

      socket.on("chatHistory", (data) => {
        //get the chat history
        console.log(data);
      });
    }
  }, [hospitalData, roomIdData]);



  const viewOnlineHospitals = () => {
    router.back();
  };


  return (
    <div className="w-screen h-screen bg-zinc-50">
      {hospitalDataLoading || roomIdLoading ? (
        <Loader />
      ) : isError ? (
        <section className="w-full flex items-center flex-col ">
          <Text className="my-5">Couldn't get hospital details 😥</Text>
          <section className="my-5">
            <Button onClick={viewOnlineHospitals}>Online Hospitals</Button>
          </section>
        </section>
      ) : (
        <SidebarLayout>
          <section className="my-5">
            <section className="messages-section my-5 w-full lg:w-1/2 lg:mx-auto">
              <section className="user-details flex items-center w-full gap-x-5 p-1">
                <div className="avatar online">
                  <div className="w-12 rounded-full">
                    <img
                      src={fetchedHospitalData?.profilePicture}
                      alt="hospital profile image"
                    />
                  </div>
                </div>

                <Text className="font-semibold">
                  {fetchedHospitalData?.clinicName}
                </Text>
              </section>
              <section className="status-tab w-full items-center justify-center my-5">
                <Text className="text-red-500 text-sm text-center">
                  no internet connection
                </Text>
              </section>
              <section className="h-screen w-full flex flex-col">
                <div className="flex-grow overflow-y-auto">
                  <div className="mb-4 receiver">
                    <div className="max-w-[70%] bg-slate-100 p-4 rounded-md text-sm">
                      Hi, emmanuel. How are you doing today?
                    </div>
                  </div>

                  <div className="mb-4 sender">
                    <div className="max-w-[70%] bg-purple-200  p-4 rounded-md ml-auto text-sm">
                      What's up chief? Am good.
                    </div>
                  </div>

                  <div className="mb-4 receiver">
                    <div className="max-w-[70%] bg-slate-100 p-4 rounded-md text-sm">
                      I dey my bro. How far with the project? Your babe nko?
                    </div>
                  </div>

                  <form className="w-full flex flex-col items-center justify-end">
                    <div className="relative w-full ">
                      <textarea
                        placeholder="Type a message..."
                        rows={1}
                        spellCheck="false"
                        className="w-full outline-none border-2 border-purple-300 focus:border-accent hover:border-accent transition-all duration-150 ease-in p-4 rounded-[30px] block"
                      />
                      <button
                        type="submit"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 px-5 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="text-accent"
                        >
                          <path
                            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </section>
        </SidebarLayout>
      )}
    </div>
  );
};

export default Messages;
