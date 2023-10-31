import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { saveAppointmentInfo } from "../slices/user.slice";
import store from "../store";

const socket = io("http://localhost:2800", {
  withCredentials: true,
});

/* listens for a newAppointment event from the server,
triggers a reducer action that causes an update on the UI 
*/
socket.on("newAppointment", (newAppointment) => {
  const existingAppointments = store.getState().user.userAppointmentInfo || [];
  const updatedAppointment = [newAppointment, ...existingAppointments];
  store.dispatch(saveAppointmentInfo(updatedAppointment));
});

/* listens for an updateAppointment event from the server,
triggers a reducer action that causes an update on the UI 
*/
socket.on("updateAppointment", (updatedAppointment) => {
  const existingAppointments = store.getState().user.userAppointmentInfo || [];

  // Find the index of the appointment to update in the existing array
  const indexOfUpdatedAppointment = existingAppointments.findIndex(appointment => appointment._id === updatedAppointment._id);

  if (indexOfUpdatedAppointment !== -1) {
    // Create a new array with the updated appointment
    const updatedAppointments = [
      ...existingAppointments.slice(0, indexOfUpdatedAppointment), 
      updatedAppointment,
      ...existingAppointments.slice(indexOfUpdatedAppointment + 1)
    ];

    // update the appointment information in the store
    store.dispatch(saveAppointmentInfo(updatedAppointments));
  }
});


const socketMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    return next(action);
  };

export default socketMiddleware;
