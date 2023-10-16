import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";

const Appointment = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="appointments my-5">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Scheduled appointments
          </h3>
          <Text className="text-sm">Your appointment with hospitals</Text>

          <section className="appointment-container items-center justify-center mx-auto gap-10 grid sm:grid-cols-2 xl:grid-cols-3 my-5">
            <section className="appointment-one bg-gray-100  rounded p-2 md:w-96">
              <h3 className="text-[18px] capitalize font-bold my-2">
                mayfair checkup
              </h3>
              <Text className="text-sm text-slate-700">
                october 16, 2023 [04:30AM - 4-21PM]
              </Text>

              <Text className="my-2 text-sm ">
                Your optician appointment with mayfair, we would be discussing
                about your eye issue and how better you can protect your eye.
              </Text>
              <section className="button-container my-2 mt-3">
                <Button>start meeting</Button>
              </section>
            </section>

            <section className="appointment-one bg-gray-100  rounded p-2 md:w-96">
              <h3 className="text-[18px] capitalize font-bold my-2">
                bloomcare checkup
              </h3>
              <Text className="text-sm text-slate-700">
                october 18, 2023 [06:30AM - 8-21PM]
              </Text>

              <Text className="my-2 text-sm ">
                Your optician appointment with mayfair, we would be discussing
                about your eye issue and how better you can protect your eye.
              </Text>
              <section className="button-container my-2 mt-3">
                <Button>start meeting</Button>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Appointment;
