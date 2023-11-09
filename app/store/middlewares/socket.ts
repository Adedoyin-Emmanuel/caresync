import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { io } from "socket.io-client";
import {
  resetUser,
  saveAppointmentInfo,
  saveOnlineHospitalsInfo,
  saveOnlineUsersInfo,
  saveUserSpecificAppointmentInfo,
  userAppointment,
} from "../slices/user.slice";
import store from "../store";
import { logoutUser } from "../slices/auth.slice";

const user:any = JSON.parse(localStorage.getItem("userDashboardInfo")!);


export const socket = io("http://localhost:2800", {
  withCredentials: true,
  query: user,
});

function handleAppointmentChange(
  store: ToolkitStore,
  changeType: string,
  appointmentData: userAppointment
) {
  const existingAppointments = store.getState().user.userAppointmentInfo || [];

  let updatedAppointments = [...existingAppointments];

  if (
    changeType === "update" ||
    changeType === "cancel" ||
    changeType === "approve"
  ) {
    // For updates, cancel, or approve, update the corresponding appointment data
    const indexOfUpdatedAppointment = existingAppointments.findIndex(
      (appointment: userAppointment) => appointment._id === appointmentData._id
    );

    if (indexOfUpdatedAppointment !== -1) {
      updatedAppointments[indexOfUpdatedAppointment] = appointmentData;
    }
    console.log(appointmentData);
    store.dispatch(saveUserSpecificAppointmentInfo(appointmentData));
  } else if (changeType === "delete") {
    // For deletions, remove the appointment
    updatedAppointments = existingAppointments.filter(
      (appointment: userAppointment) => appointment._id !== appointmentData._id
    );

    store.dispatch(saveUserSpecificAppointmentInfo(appointmentData));
  }

  console.log(updatedAppointments);

  store.dispatch(saveAppointmentInfo(updatedAppointments));
}

/* listens for a newAppointment event from the server,
triggers a reducer action that causes an update on the UI 
*/
socket.on("newAppointment", (newAppointment) => {
  const hospitalId = store.getState().auth.userInfo?._id;

  if (
    newAppointment.hospitalId === hospitalId ||
    newAppointment.userId === hospitalId
  ) {
    const existingAppointments =
      store.getState().user.userAppointmentInfo || [];
    const updatedAppointment = [newAppointment, ...existingAppointments];
    store.dispatch(saveAppointmentInfo(updatedAppointment));
  }
});

/* listens for an updateAppointment event from the server,
triggers a reducer acdtion that causes an update on the UI 
*/
socket.on("updateAppointment", (updatedAppointment) => {
  handleAppointmentChange(store, "update", updatedAppointment);
});

//cancelAppointment event
socket.on("cancelAppointment", (canceledAppointment) => {
  handleAppointmentChange(store, "cancel", canceledAppointment);
});

//deleteAppointment event
socket.on("deleteAppointment", (deletedAppointment) => {
  handleAppointmentChange(store, "delete", deletedAppointment);
});

socket.on("approveAppointment", (approvedAppointment) => {
  handleAppointmentChange(store, "approve", approvedAppointment);
});

//Chat events

socket.on("userLogin", (userData) => {
  console.log(userData);
});

socket.on("userLogout", (data) => {
  store.dispatch(logoutUser());
  store.dispatch(resetUser());
});

socket.on("onlineUsers", (onlineUsers) => {
  console.log(onlineUsers);
  store.dispatch(saveOnlineUsersInfo(onlineUsers));
});

socket.on("onlineHospitals", (onlineHospitals) => {
  console.log(onlineHospitals);
  store.dispatch(saveOnlineHospitalsInfo(onlineHospitals));
});

const socketMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    return next(action);
  };

export default socketMiddleware;
