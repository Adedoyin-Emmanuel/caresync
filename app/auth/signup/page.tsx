"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Text from "@/app/components/Text";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import Loader from "@/app/components/Loader";

const Signup = () => {
  const formRef = useRef<HTMLFormElement | any>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    signupAs: "User",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { signupAs, ...rest } = formData;
    toast.success("Successfully login");
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <Loader/>
      <form
        className="w-11/12 md:w-1/2 xl:w-1/4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <section className="header-section my-8">
          <h3 className="text-4xl capitalize font-bold text-secondary">
            Signup
          </h3>
          <Text>bridging health with technology</Text>
        </section>

        <section className="my-4 mb-5">
          <label htmlFor="fullname" className="text-md block my-2">
            Fullname
          </label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            value={formData.fullname}
            onChange={handleInputChange}
          />
        </section>

        <section className="my-4 mb-5">
          <label htmlFor="email" className="text-md block my-2">
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </section>

        <section className="my-4 mb-5">
          <label htmlFor="username" className="text-md block my-2">
            Username
          </label>
          <Input
            type="text"
            name="username"
            placeholder="Enter a unique username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </section>

        <section className="my-4 mb-5">
          <label htmlFor="email" className="text-md block my-2">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </section>

        <section className="my-4 mb-5">
          <label htmlFor="email" className="text-md block my-2">
            Signup As
          </label>
          <select
            className="select border-2 border-gray-300 focus:outline-none rounded-md w-full h-16"
            name="signupAs"
            value={formData.signupAs}
            onChange={handleInputChange}
          >
            <option value="User">User</option>
            <option value="Hospital">Hospital</option>
          </select>
        </section>

        <section className="my-4 mb-5 w-full">
          <Button>Sign up</Button>
        </section>

        <section>
          <Text className="inline">
            have an account?
            <Link
              className="capitalize text-secondary px-1"
              href={"/auth/login"}
            >
              login
            </Link>
          </Text>
        </section>
      </form>
    </section>
  );
};

export default Signup;
