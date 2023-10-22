import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import Text from "../Text";
import Verified from "../Verified";

interface HospitalCardProps {
  className?: string;
  clinicName: string;
  address: string;
  isVerified: boolean;
  rating: number;
}

const HospitalCard = ({
  className,
  clinicName,
  address,
  isVerified,
  rating,
}: HospitalCardProps) => {
  const stars = Array(5).fill(null);

  // Map the stars based on the rating
  const starElements = stars.map((_, index) => (
    <React.Fragment key={index}>
      {index < rating ? (
        <BsStarFill className="h-5 w-5 text-yellow-500" />
      ) : (
        <BsStar className="h-5 w-5" />
      )}
    </React.Fragment>
  ));

  return (
    <section
      className={`hospital bg-gray-100 transition-colors duration-100 ease-in hover:bg-purple-100 p-3 rounded md:w-96 cursor-pointer ${className}`}
    >
      <h2 className="font-bold capitalize flex items-center gap-x-1">
        {clinicName}
        <span>{isVerified && <Verified />}</span>
      </h2>
      <Text className="text-sm">{address}</Text>
      <section className="rating flex gap-x-1 my-2">{starElements}</section>
    </section>
  );
};

export default HospitalCard;
