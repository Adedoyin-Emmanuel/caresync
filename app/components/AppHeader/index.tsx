import React from "react";
import { GoBell } from "react-icons/go";

interface AppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AppHeader = ({ className }: AppHeaderProps) => {
  return (
    <div className={`${className} flex items-center justify-between`}>
      <section className="user-name">
        <h2 className="font-bold capitalize text-2xl">hi, emmysoft 👋</h2>
      </section>

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
