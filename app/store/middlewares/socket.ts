import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { saveAppointmentInfo } from "../slices/user.slice";
import store from "../store";

const socket = io("http://localhost:2800", {
  withCredentials: true,
});

socket.on("newAppointment", (newAppointment) => {
  console.log(`New appointment is ${newAppointment}`);
  const existingAppointments = store.getState().user.userAppointmentInfo || [];
  console.log(`Existing appointment is ${existingAppointments}`);

  const updatedAppointment = [newAppointment, ...existingAppointments];
  console.log(`Updated appointment is ${updatedAppointment}`);

  store.dispatch(saveAppointmentInfo(updatedAppointment));
});

const socketMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    return next(action);
  };

export default socketMiddleware;
