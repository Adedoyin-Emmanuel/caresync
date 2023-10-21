import { formatDateTime } from "@/app/helpers";
import moment from "moment";
import { LuTimer } from "react-icons/lu";
import Button from "../Button";
import Text from "../Text";

interface AppointmentCardProps {
  className?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  id: string;
  dateCreated: Date;
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
  console.log(startFormattedTime);
  console.log(endFormattedTime);

  const handleStartMeeting = () => {};
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
        {startFormattedTime.dateMonthYear} {" "} ({startFormattedTime.hoursAndMinutes}
        {" - "} {endFormattedTime.hoursAndMinutes})
      </Text>

      <Text className="text-sm my-3 md:my-2">{description}</Text>
      <section className="button-container my-2 mt-3">
        <Button>start meeting</Button>
      </section>
    </section>
  );
};

export default ApppointmentCard;
