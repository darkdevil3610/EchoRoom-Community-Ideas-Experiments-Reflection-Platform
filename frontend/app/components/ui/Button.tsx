import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}: ButtonProps) {
  
  const baseStyle =
    "px-6 py-3 rounded-lg font-medium transition duration-200";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800",

    secondary:
      "bg-gray-200 text-black hover:bg-gray-300",

    outline:
      "border border-black text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
