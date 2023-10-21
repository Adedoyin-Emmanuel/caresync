import { formatDateTime } from "@/app/helpers";
import moment from "moment";
import Link from "next/link";
import { BsCameraVideo } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import Button from "../Button";
import Text from "../Text";
import { userAppointmentInfoProps } from "@/app/store/slices/user.slice";

interface AppointmentCardProps {
  className?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  id: string;
  dateCreated: Date;
}

interface AppointmentLabelProps {
  className?: string;
  attender: string;
  dateCreated: Date;
  status: "pending" | "failed" | "success";
  id: string;
  href: string;
}

const ApppointmentCard = ({
  className,
  title,
  startDate,
  description,
  endDate,
  id,
  dateCreated,
}: AppointmentCardProps) => {
  const startFormattedTime = formatDateTime(startDate);
  const endFormattedTime = formatDateTime(endDate);

  return (
    <section className="appointment-one bg-gray-100  rounded p-2 md:w-96">
      <h3 className="text-[18px] capitalize font-bold my-2 flex items-center justify-between">
        {title}{" "}
        <div className="text-[13px] lowercase flex items-center  gap-x-1">
          <LuTimer className="w-5 h-5" />
          {moment(new Date(dateCreated)).startOf("hour").fromNow()}
        </div>
      </h3>
      <Text className="text-sm text-slate-700">
        {startFormattedTime.dateMonthYear} ({startFormattedTime.hoursAndMinutes}
        {" - "} {endFormattedTime.hoursAndMinutes})
      </Text>

      <Text className="text-sm my-3 md:my-2">{description}</Text>
      <section className="button-container my-2 mt-3">
        <Link href={`/appointment/${id}`}>
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
  dateCreated,
  attender,
  href,
}: AppointmentLabelProps ) => {
  let defaultStatus = (
    <section className="status-badge text-black rounded bg-yellow-300 flex items-center justify-center h-5 w-20">
      <Text className="text-[12px] font-bold">pending</Text>
    </section>
  );

  const formattedDate = formatDateTime(dateCreated);
  console.log(formattedDate);

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
          <Text className="text-sm font-bold">@{attender}</Text>
          <section className="status-badge text-black rounded bg-green-300 flex items-center justify-center h-5 w-20">
            {defaultStatus}
          </section>
        </section>
      </section>
    </Link>
  );
};

export { AppointmentLabel, ApppointmentCard };
