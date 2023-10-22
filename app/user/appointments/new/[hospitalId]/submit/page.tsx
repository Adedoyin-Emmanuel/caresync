"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useState } from "react";

const SubmitAppointment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="new-appointment w-full">
          <section className="w-11/12 md:w-3/4 xl:w-2/4 mx-auto my-8">
            <form className="w-full">
              <section className="form-header my-5">
                <h3 className="font-bold text-2xl capitalize text-accent">
                  Create appointment
                </h3>
                <Text className="text-sm">
                  submitting appointment request to
                  <span className="text-accent">Mayfair</span>
                </Text>
              </section>
              <section className="my-4 mb-5">
                <label htmlFor="name" className="text-md block my-2">
                  Appointment title
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter appointment title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </section>

              <section className="my-4 mb-5">
                <label htmlFor="description" className="text-md block my-2">
                  Appointment description
                </label>
                <textarea
                  className="textarea border-2 border-gray-300 focus:outline-none rounded-md w-full textarea-md"
                  name="description"
                  placeholder="Enter appointment description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                ></textarea>
              </section>

              <section className="my-4 mb-5">
                <label htmlFor="startDate" className="text-md block my-2">
                  Start date and time
                </label>
                <Input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </section>

              <section className="my-4 mb-5">
                <label htmlFor="email" className="text-md block my-2">
                  End date and time
                </label>
                <Input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </section>

              <section className="my-4 mb-5 w-full">
                <Button>create appointment</Button>
              </section>
            </form>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default SubmitAppointment;
