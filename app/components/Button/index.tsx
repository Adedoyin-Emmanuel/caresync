import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ className, children, disabled, ...others }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`capitalize text-white ${className} w-full rounded p-3 btn-secondary transition-colors `}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
