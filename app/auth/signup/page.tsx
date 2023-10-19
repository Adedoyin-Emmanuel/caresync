"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Text from "@/app/components/Text";
import {
  useRegisterHospitalMutation,
  useRegisterUserMutation,
} from "@/app/store/slices/userApiSlice";
import { AppDispatch } from "@/app/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
const Signup = () => {
  const formRef = useRef<HTMLFormElement | any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    signupAs: "user",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [registerUser, { isLoading: userLoading }] = useRegisterUserMutation();
  const [registerHospital, { isLoading: hospitalLoading }] =
    useRegisterHospitalMutation();

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { signupAs, ...rest } = formData;

    if (signupAs === "user") {
      try {
        console.log(rest)
        const response = await registerUser(rest).unwrap();
        console.log(response);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.data?.message || error.error || error?.data);
      }
    } else if (signupAs === "hospital") {
      try {
        const { name, email, username, password } = rest;
        const response = await registerHospital(rest).unwrap();
        console.log(response);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.data?.message || error.error || error?.data);
      }
    } else {
      toast.error("Not a valid user type!");
    }
  };

  return (
    <>
      <section className="w-screen h-screen flex items-center justify-center">
        <form
          className="w-11/12 md:w-1/2 xl:w-1/4"
          onSubmit={(e) => {handleSubmit(e)}}
          ref={formRef}
        >
          <section className="header-section my-8">
            <h3 className="text-4xl capitalize font-bold text-secondary">
              Signup
            </h3>
            <Text>bridging health with technology</Text>
          </section>

          <section className="my-4 mb-5">
            <label htmlFor="name" className="text-md block my-2">
              Fullname
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your fullname"
              value={formData.name}
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
              <option value="user">User</option>
              <option value="hospital">Hospital</option>
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
    </>
  );
};

export default Signup;
