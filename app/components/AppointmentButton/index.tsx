import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface AppointmentButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  others?: React.Attributes;
}

const AppointmentButton = ({
  className,
  ...others
}: AppointmentButtonProps): JSX.Element => {
  return (
    <Link href={"/user/appointments/new"}>
      <section className="fixed bottom-20 right-10">
        <section
          className={`w-16 h-16 flex items-center justify-center  bg-accent rounded-full shadow cursor-pointer relative transform-gpu transition-transform duration-200 scale-100 hover:scale-110 ${className}`}
          {...others}
        >
          <AiOutlinePlus className="h-10 w-10 text-white" />
        </section>
      </section>
    </Link>
  );
};

export default AppointmentButton;
