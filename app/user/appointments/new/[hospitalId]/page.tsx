"use client";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import { useState } from "react";

const CreateAppointment = ({ params }: { params: { hospitalId: string } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    signupAs: "user",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="new-appointment">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Create appointment
          </h3>
          <Text className="text-sm">
            create a new appointment with {params.hospitalId}
            <span className="text-accent">Mayfair</span>
          </Text>

          <section className="hospital-profile w-full flex flex-col items-center justify-center">
            <section className="profile-header">
              <div className="avatar cursor-pointer">
                <div className="w-24 rounded-full">
                  <img
                    className=""
                    src="https://api.dicebear.com/7.x/micah/svg?seed=mango"
                    alt="user profile image"
                  />
                </div>
                          </div>
                          
                          <section className="profile-title">
                              <h3>Mayfair</h3>
                          </section>
            </section>
            
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default CreateAppointment;
