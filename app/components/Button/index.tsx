import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={`capitalize text-white w-48 rounded w p-3 btn-secondary ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
