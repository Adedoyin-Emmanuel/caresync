"use client";

import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetUserByIdQuery,
  userDashboardInfoProps,
  useGetRoomTokenQuery,
  saveRoomToken,
  saveCurrentTypingMessage,
} from "@/app/store/slices/user.slice";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { useAppSelector } from "@/app/store/store";
import { socket } from "@/app/store/middlewares/socket";
import NetworkStatus from "@/app/components/NetworkStatus/NetworkStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";

const Messages = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");
  const {
    data: userData,
    isLoading: userDataLoading,
    isError,
  } = useGetUserByIdQuery(userId);
  const [fetchedUserData, setFetchedUserData] =
    useState<userDashboardInfoProps>();
  const { userDashboardInfo } = useAppSelector((state) => state.user);
  const { data: roomIdData, isLoading: roomIdLoading } = useGetRoomTokenQuery({
    hospitalId: userDashboardInfo?._id,
    userId: userId,
  });

  const { roomToken, currentTypingMessage } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userData) {
      setFetchedUserData(userData?.data);
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
  }, [userData, roomIdData]);

  const [messages, setMessages] = useState<string[]>([]);
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    typedMessage: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const data = {
      roomId: roomToken,
      sender: userDashboardInfo?._id,
      receiver: userId,
    };
    socket.emit("typing", data);

    let typingTimer: any;

    socket.on("responseTyping", (data) => {
      console.log(data.message);
      dispatch(saveCurrentTypingMessage(data));
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        dispatch(saveCurrentTypingMessage(""));
      }, 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const data = {
      roomId: roomToken,
      sender: userDashboardInfo?._id,
      receiver: userId,
      message: formData.typedMessage,
    };

    if (formData.typedMessage == "") return;

    //send the message
    socket.emit("sendMessage", data);

    //listen for new message
    socket.on("newMessage", (data) => {
       setMessages((prevMessages) => [...prevMessages, data]);
    });
    setFormData({ typedMessage: "" });
  };

  const handleKeyPress = (event: React.KeyboardEvent | any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Submit the form when Enter is pressed (without Shift key)
      handleSubmit(event);
    }
  };

  const viewOnlineHospitals = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      {userDataLoading || roomIdLoading ? (
        <Loader />
      ) : isError ? (
        <section className="w-full flex items-center flex-col ">
          <Text className="my-5">Couldn't get hospital details 😥</Text>
          <section className="my-5">
            <Button onClick={viewOnlineHospitals}>Online Users</Button>
          </section>
        </section>
      ) : (
        <SidebarLayout>
          <section className="my-5">
            <section className="messages-section my-5 w-full lg:w-1/2 lg:mx-auto">
              <section className="user-details flex items-center w-full justify-between p-1">
                <section className="first-section flex items-center gap-x-5">
                  <div className="avatar online">
                    <div className="w-12 rounded-full">
                      <img
                        src={fetchedUserData?.profilePicture}
                        alt="user profile image"
                      />
                    </div>
                  </div>

                  <Text className="font-semibold">{fetchedUserData?.name}</Text>
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

                  <form
                    className="w-full flex flex-col items-center justify-end p-1"
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
                        onKeyDown={handleKeyPress}
                        tabIndex={0}
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
