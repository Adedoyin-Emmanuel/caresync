"use client";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface DashboardCardProps {
  className?: string;
  appointments: number | string;
}

const DashboardCard = ({
  className,
  appointments,
  ...others
}: DashboardCardProps) => {
  const [currentIcon, setCurrentIcon] = useState(AiOutlineEye);
  const [toggler, setToggler] = useState(true);
  const [totalAppointment, setTotalAppointment] = useState(appointments);

  const handleIconClick = () => {
    setToggler(!toggler);
  };

  useEffect(() => {
    setCurrentIcon(toggler ? AiOutlineEye : AiOutlineEyeInvisible);
    setTotalAppointment(toggler ? appointments : "****");
  }, [toggler]);
  return (
    <section
          className={`rounded-lg md:hidden bg-purple-200 gap-y-2 p-4 w-full ${className}`}
      {...others}
    >
      <section className="header flex items-center justify-between">
        <section className="first flex items-center gap-x-1">
          <p className="capitalize text-[12px]">total appoinments</p>
          <section className="icon-container" onClick={handleIconClick}>
            {currentIcon}
          </section>
        </section>
        <section className="end flex items-center gap-x-1">
          <p className="capitalize text-[12px]">healthcare history</p>

          <MdOutlineKeyboardArrowRight />
        </section>
      </section>
      <h3 className="text-[18px] font-bold my-2">{totalAppointment}</h3>
      <section className="w-full flex items-end justify-end">
        <section className="new-appointment bg-accent rounded-[30px] capitalize w-28 text-[12px] text-center p-1  text-white">
          appointment
        </section>
      </section>
    </section>
  );
};

export default DashboardCard;
