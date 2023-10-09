import React from "react";

interface TextProps {
  className?: string;
  children: React.ReactNode;
}

const Text = ({ className, children }: TextProps) => {
  return <p className={`text-md capitalize ${className}`}>{children}</p>;
};

export default Text;
