import Button from "./components/Button";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <Layout>
        <Navbar />
        <section className="m-auto w-full">
          <div className="container mx-auto py-5 md:py-16 px-4  lg:flex lg:items-start overflow-x-hidden">
            <div className="lg:w-1/2 lg:ml-12 mt-8 lg:mt-28">
              <h1 className="md:text-4xl text-3xl  font-bold capitalize mb-4">
                transforming health care through innovation, technology and
                compassion.
              </h1>
              <p className="text-slate-600 py-5">
                Discover the profound synergy of technology and empathy
                seamlessly merging into a powerful force. Caresync stands as
                your unwavering partner in your journey towards unparalleled
                health and well-being
              </p>

              <section className="button-section w-full flex items-center justify-around gap-x-5 md:gap-x-10 md:justify-start">
                <Link
                  href="/auth/signup"
                  className="capitalize text-white w-3/12 rounded p-3 btn-secondary transition-colors text-center"
                >
                  Signup
                </Link>
                <Link href="/auth/signup" className="capitalize text-white text-center rounded p-3 btn-secondary transition-colors w-9/12 my-8 md:w-3/4 lg:w-2/4">
                  join as an hospital
                </Link>
              </section>
            </div>

            <div className="lg:w-1/2  flex items-center  justify-center">
              <img
                src="/doctor.png"
                alt="doctors in lab coat"
                className="transform scale-110"
              />
            </div>
          </div>
        </section>
      </Layout>
    </section>
  );
}
