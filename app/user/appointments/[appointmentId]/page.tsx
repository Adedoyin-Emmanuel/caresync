"use client";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useGetAppointmentByIdQuery } from "@/app/store/slices/user.slice";
import { useRouter } from "next/navigation";

const Appointment = ({ params }: { params: { appointmentId: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAppointmentByIdQuery(
    params.appointmentId
  );

  const viewAllAppointments = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <section className="w-full flex items-center flex-col ">
            <Text className="my-5">Couldn't get appointment details 😥</Text>
            <section className="my-5">
              <Button onClick={viewAllAppointments}>All appointments</Button>
            </section>
          </section>
        ) : (
          <h3 className="font-bold text-2xl  capitalize">
            hello {params.appointmentId}
          </h3>
        )}
      </SidebarLayout>
    </div>
  );
};

export default Appointment;
