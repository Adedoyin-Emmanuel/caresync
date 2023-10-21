import { formatDateTime } from "@/app/helpers";
import {
  useGetHospitalByIdMutation,
  useGetUserByIdMutation,
} from "@/app/store/slices/user.slice";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import Button from "../Button";
import Text from "../Text";

export interface AppointmentCardProps {
  className?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  _id: string;
  createdAt: Date;
}

interface AppointmentLabelProps {
  className?: string;
  attender: string;
  createdAt: Date;
  status: "pending" | "failed" | "success";
  _id: string;
  href: string;
  userType: "user" | "hospital";
}

const ApppointmentCard = ({
  className,
  title,
  startDate,
  description,
  endDate,
  _id,
  createdAt,
}: AppointmentCardProps) => {
  const startFormattedTime = formatDateTime(startDate);
  const endFormattedTime = formatDateTime(endDate);

  return (
    <section className="appointment-one bg-gray-100  rounded p-2 md:w-96">
      <h3 className="text-[18px] capitalize font-bold my-2 flex items-center justify-between">
        {title}{" "}
        <div className="text-[13px] lowercase flex items-center  gap-x-1">
          <LuTimer className="w-5 h-5" />
          {moment(new Date(createdAt)).startOf("seconds").fromNow()}
        </div>
      </h3>
      <Text className="text-sm text-slate-700">
        {startFormattedTime.dateMonthYear} ({startFormattedTime.hoursAndMinutes}
        {" - "} {endFormattedTime.hoursAndMinutes})
      </Text>

      <Text className="text-sm my-3 md:my-2">{description}</Text>
      <section className="button-container my-2 mt-3">
        <Link href={`/appointment/${_id}`}>
          {" "}
          <Button>start meeting</Button>
        </Link>
      </section>
    </section>
  );
};

const AppointmentLabel = ({
  className,
  status,
  createdAt,
  attender,
  href,
  userType,
}: AppointmentLabelProps) => {
  let defaultStatus = (
    <section className="status-badge text-black rounded bg-yellow-300 flex items-center justify-center h-5 w-20">
      <Text className="text-[12px] font-bold">pending</Text>
    </section>
  );

  const formattedDate = formatDateTime(createdAt);


  switch (status) {
    case "pending":
      defaultStatus = defaultStatus;
      break;
    case "success":
      defaultStatus = (
        <section className="status-badge text-black rounded bg-green-300 flex items-center justify-center h-5 w-20">
          <Text className="text-[12px] font-bold">success</Text>
        </section>
      );
      break;
    case "failed":
      defaultStatus = (
        <section className="status-badge  text-black rounded bg-red-400 flex items-center justify-center h-5 w-20">
          <Text className="text-[12px] font-bold">failed</Text>
        </section>
      );
      break;
    default:
      defaultStatus = defaultStatus;
  }

  const [getHospitalById] = useGetHospitalByIdMutation();
  const [getUserById] = useGetUserByIdMutation();

  const [attenderName, setAttenderName] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        const getUser = userType == "user" ? getUserById : getHospitalById;
        const response: any = await getUser(attender);
        setAttenderName(response.data.data.username);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request was aborted due to unmounting.");
        } else {
          console.error("Error:", error);
        }
      }
    };


    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Link href={href}>
      <section
        className={`appointment bg-gray-100 transition-colors ease-in hover:bg-purple-100 flex items-center justify-between p-4 rounded cursor-pointer my-4 ${className}`}
      >
        <section className="icon bg-accent text-white p-3 flex items-center justify-center rounded">
          <BsCameraVideo className="w-6 h-6" />
        </section>

        <section className="other-content w-11/12 flex items-center justify-around">
          <Text className="text-sm">14/09/2023</Text>
          <Text className="text-sm font-bold" noCapitalize={true}>
            @{attenderName}
          </Text>
          <section className="status-badge text-black rounded bg-green-300 flex items-center justify-center h-5 w-20">
            {defaultStatus}
          </section>
        </section>
      </section>
    </Link>
  );
};

export { AppointmentLabel, ApppointmentCard };
