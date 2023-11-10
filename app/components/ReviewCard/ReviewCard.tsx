"use client";
import React from "react";
import Text from "../Text";
import { LuTimer } from "react-icons/lu";
import Button from "../Button";
import moment from "moment";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReviewCardProps {
  className?: string;
  profilePicture: string;
  createdAt: Date;
  userType: "user" | "hospital";
  message?: string;
  username: string;
  _id: string;
}

const ReviewCard = ({
  className,
  profilePicture,
  createdAt,
  userType,
  message,
  username,
  _id,
}: ReviewCardProps) => {
  const router = useRouter();
  const reviewLink =
    userType === "user"
      ? `/user/profile/me/reviews/${_id}`
      : `/hospital/profile/me/reviews/${_id}`;

  const handleButtonClick = () => {
    router.push(reviewLink);
  };

  return (
    <section
      className={`review-one bg-slate-50 p-3 rounded w-full md:w-96 cursor-pointer my-5 ${className}`}
      onClick={handleButtonClick}
    >
      <section className="header flex items-center justify-between my-1">
        <section className="image w-10 rounded-full">
          <img src={profilePicture} alt="user image" />
        </section>

        <div className="text-[13px] font-bold capitalize flex items-center  gap-x-1">
          <LuTimer className="w-5 h-5" />{" "}
          {moment(new Date(createdAt)).startOf("seconds").fromNow()}
        </div>
      </section>

      <section className="body text-sm">{message}</section>

      <section className="footer my-1">
        <Text noCapitalize className="font-bold">
          @{username}
        </Text>
      </section>
      <section className="button my-1 mt-2">
        <Link href={reviewLink}>
          <Button>view details</Button>
        </Link>
      </section>
    </section>
  );
};

export default ReviewCard;
