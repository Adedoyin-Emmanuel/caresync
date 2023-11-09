"use client";

import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetHospitalByIdQuery,
  hospitalProps,
  useGetRoomTokenQuery,
  saveRoomToken,
  saveCurrentTypingMessage,
  currentTypingMessaageProps,
} from "@/app/store/slices/user.slice";
import React, { useEffect, useState, useRef } from "react";
import Loader from "@/app/components/Loader";
import { useAppSelector } from "@/app/store/store";
import { socket } from "@/app/store/middlewares/socket";
import NetworkStatus from "@/app/components/NetworkStatus/NetworkStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { currentTime } from "@/app/helpers";

const Messages = () => {
  const searchParams = useSearchParams();
  const messageInputRef = useRef<HTMLDivElement | any>(null);
  const router = useRouter();
  const hospitalId = searchParams.get("hospitalId");
  const {
    data: hospitalData,
    isLoading: hospitalDataLoading,
    isError,
  } = useGetHospitalByIdQuery(hospitalId);
  const [fetchedHospitalData, setFetchedHospitalData] =
    useState<hospitalProps>();
  const { userDashboardInfo } = useAppSelector((state) => state.user);
  const { data: roomIdData, isLoading: roomIdLoading } = useGetRoomTokenQuery({
    userId: userDashboardInfo?._id,
    hospitalId: hospitalId,
  });

  const { roomToken, currentTypingMessage } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (hospitalData) {
      setFetchedHospitalData(hospitalData?.data);
    }
    if (roomIdData) {
      dispatch(saveRoomToken(roomIdData.data.roomId));

      //Join the chat
      socket.emit("joinRoom", roomToken);

      socket.on("chatHistory", (data) => {
        //get the chat history
        console.log(data);
      });
    }
  }, [hospitalData, roomIdData]);

  const [messages, setMessages] = useState<currentTypingMessaageProps[]>([]);
  const [formData, setFormData] = useState({
    typedMessage: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const data = {
      roomId: roomToken,
      sender: userDashboardInfo?._id,
      receiver: hospitalId,
    };
    socket.emit("typing", data);

    let typingTimer: any;

    socket.on("responseTyping", (data) => {
      dispatch(saveCurrentTypingMessage(data));
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        dispatch(saveCurrentTypingMessage(""));
      }, 2000);
    });
  };

  const viewOnlineHospitals = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const data = {
      roomId: roomToken,
      sender: userDashboardInfo?._id,
      receiver: hospitalId,
      message: formData.typedMessage,
    };

    if (formData.typedMessage == "") return;

    //send the message
    socket.emit("sendMessage", data);

    //listen for new message
    socket.on("newMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      socket.off("newMessage");
    });

    setFormData({ typedMessage: "" });
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    const containerRef = messageInputRef.current;
    if (containerRef) {
      containerRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent | any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Submit the form when Enter is pressed (without Shift key)
      handleSubmit(event);
    }
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
              <section className="user-details flex contacurrentitems-center w-full justify-between p-1">
                <section className="first-section flex items-center gap-x-5">
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

                <section className="second-section px-4">
                  <NetworkStatus />
                </section>
              </section>
              <section className="status-tab w-full items-center justify-center my-5">
                <Text className="text-[13px] text-center text-accent font-bold">
                  {currentTypingMessage?.message}
                </Text>
              </section>
              <section className="h-screen w-full flex flex-col">
                <div className="flex-grow">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message?.sender === userDashboardInfo?._id
                          ? "sender"
                          : "receiver"
                      }`}
                      ref={messageInputRef}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message?.sender === userDashboardInfo?._id
                            ? "bg-purple-200"
                            : "bg-slate-100"
                        } p-2 rounded-md ml-${
                          message?.sender === userDashboardInfo?._id
                            ? "auto"
                            : "0"
                        } break-words`}
                      >
                        {message?.message}
                        <Text className="block text-[12px] text-right p-0 m-0">
                          {currentTime()}
                        </Text>
                      </div>
                    </div>
                  ))}

                  <div className="breaker my-5"></div>

                  <form
                    className="w-full my-8 flex flex-col items-center justify-center p-1 mb-10"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative w-full ">
                      <textarea
                        placeholder="Type a message..."
                        rows={1}
                        spellCheck="false"
                        name="typedMessage"
                        value={formData.typedMessage}
                        onChange={handleInputChange}
                        tabIndex={0}
                        onKeyDown={handleKeyPress}
                        className="w-full outline-none border-2 border-purple-300 focus:border-accent hover:border-accent transition-all duration-150 ease-in p-4 rounded-[30px] block"
                      />
                      <button className="absolute top-1/2 right-3 transform -translate-y-1/2 px-5 rounded-full">
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
                  <br />
                  <br />
                  <br />
                  <br />
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
