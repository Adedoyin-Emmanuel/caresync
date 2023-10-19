import React from "react";
import { GoBell } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/app/store/slices/userApiSlice";

interface AppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  showWelcomeMessage?: boolean
}

const AppHeader = ({ className, showWelcomeMessage }: AppHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [logout, { isLoading }] = useLogoutMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const router = useRouter();

  return (
    <div
      className={`${className} flex items-center ${showWelcomeMessage ? "justify-between" : "justify-end"} p-2 md:p-0`}
    >
      {showWelcomeMessage && (
        <section className="user-name">
          <h2 className="font-bold capitalize text-2xl">hi, emmysoft 👋</h2>
        </section>
      )}

      <section className="user-profile flex items-center gap-x-4">
        <section className="notification">
          <GoBell className="h-6 w-6 transition-colors hover:text-accent cursor-pointer" />
        </section>
        <div className="avatar cursor-pointer">
          <div className="w-10 rounded-full">
            <img
              className=""
              src="https://api.dicebear.com/7.x/micah/svg?seed=micah"
              alt="user profile image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};



export const HospitalAppHeader = ({ className, showWelcomeMessage }: AppHeaderProps) => {
  return (
    <div
      className={`${className} flex items-center ${
        showWelcomeMessage ? "justify-between" : "justify-end"
      } p-2 md:p-0`}
    >
      {showWelcomeMessage && (
        <section className="user-name">
          <h2 className="font-bold capitalize text-2xl">hi, mayfair 👋</h2>
        </section>
      )}

      <section className="user-profile flex items-center gap-x-4">
        <section className="notification">
          <GoBell className="h-6 w-6 transition-colors hover:text-accent cursor-pointer" />
        </section>
        <div className="avatar cursor-pointer">
          <div className="w-10 rounded-full">
            <img
              className=""
              src="https://api.dicebear.com/7.x/micah/svg?seed=micah"
              alt="user profile image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppHeader;
