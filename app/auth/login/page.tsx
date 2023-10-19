"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Text from "@/app/components/Text";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginAs: "user",
  });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { loginAs, ...rest } = formData;
    console.log(loginAs);
    console.log(rest);
  };
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <form
        className="w-11/12 md:w-1/2 xl:w-1/4"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <section className="header-section my-8">
          <h3 className="text-4xl capitalize font-bold text-secondary">
            Login
          </h3>
          <Text>bridging health with technology</Text>
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
          <label htmlFor="loginAs" className="text-md block my-2">
            Login As
          </label>
          <select
            className="select border-2 border-gray-300 focus:outline-none rounded-md w-full h-16"
            name="loginAs"
            value={formData.loginAs}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>
        </section>

        <section className="my-4 mb-5 w-full">
          <Button> Login</Button>
        </section>

        <section>
          <Text className="inline">
            don't have an account?
            <Link
              className="capitalize text-secondary px-1"
              href={"/auth/signup"}
            >
              create account
            </Link>
          </Text>
        </section>
      </form>
    </section>
  );
};

export default Login;
