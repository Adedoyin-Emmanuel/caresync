"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Navbar: React.FC = (): JSX.Element => {
  const mobileLinksRef = useRef<HTMLElement>(null);
  const [navToggled, setNavToggled] = useState<boolean>(false);

  useEffect(() => {
    if (navToggled) {
      mobileLinksRef.current!.style.maxHeight = `${
        mobileLinksRef.current!.scrollHeight
      }px`;
    } else {
      mobileLinksRef.current!.style.maxHeight = "0";
    }
  }, [navToggled]);

  const handleHamburgerClick = () => {
    setNavToggled(!navToggled);
  };

  return (
    <nav className="w-screen flex items-center md:justify-center justify-between md:flex-row flex-col  py-5 overflow-x-hidden z-10">
      <h2 className="font-extrabold text-4xl text-secondary  mx-5 md:flex items-center  hidden cursor-pointer ">
        <Link href="/">Caresync</Link>
      </h2>

      <section className="hidden md:flex items-end justify-end w-4/6 overflow-x-hidden">
        <Link
          href="/auth?login=true"
          className="capitalize inline-block text-center border-transparent border-solid border-2 border-spacing-3  mx-5 p-3 bg-secondary text-white w-40 rounded-sm hover:bg-transparent hover:border-secondary hover:text-black transition-all duration-150 ease-in-out"
        >
          login
        </Link>
      </section>

      <section className="md:hidden flex w-full flex-col">
        <section className="header flex w-full items-center justify-between">
          <h2 className="font-extrabold text-secondary text-2xl  mx-5">
            <Link href="/">Caresync</Link>
          </h2>

          <section
            className={`hamburger mx-5 transform transition-transform duration-300 ease-in-out  ${
              navToggled ? "-rotate-90 text-secondary" : "rotate-0"
            }`}
            onClick={handleHamburgerClick}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="font-bold"
              height="35"
              width="35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path>
            </svg>
          </section>
        </section>

        <section
          ref={mobileLinksRef}
          className="mx-5 my-11 overflow-hidden transition-max-h duration-500 ease-in-out"
        >
          <Link href="/" className="capitalize block  my-6">
            login
          </Link>
          <Link href="about" className="capitalize block  my-6">
            signup
          </Link>
          <Link href="contact" className="capitalize block  my-6">
            star project
          </Link>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
