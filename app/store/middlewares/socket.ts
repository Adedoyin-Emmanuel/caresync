import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:2800");

const socketMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (action.type === "LISTEN_TO_APPOINTMENTS") {
      socket.on("newAppointment", (newAppointment) => {
        console.log(`New appointment is ${newAppointment}`);
        const existingAppointments =
          store.getState().user.userAppointmentInfo || [];
        console.log(`Existing appointment is ${existingAppointments}`);

        const updatedAppointment = [...existingAppointments, newAppointment];
        console.log(`Updated appointment is ${updatedAppointment}`);

        next({
          type: "userAppointmentInfo",
          payload: updatedAppointment,
        });
      });
    }

    return next(action);
  };

export default socketMiddleware;
