import { MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:2800");

const socketMiddleware =
  () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    if (action.type === "LISTEN_TO_APPOINTMENTS") {
      socket.on("newAppointment", (newAppointment) => {
        next({
          type: "saveUserSpecificAppointmentInfo",
          payload: newAppointment,
        });
          
          console.log(newAppointment);
      });
    }

    return next(action);
  };

export default socketMiddleware;
