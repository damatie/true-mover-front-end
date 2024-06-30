"use client";
import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  hasMinDate?: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  error?: string | any;
  minDate?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  hasMinDate = false,
  onChange,
  onBlur,
  value,
  error,
  minDate,
}) => {
  // const today = new Date();
  // const tomorrow = new Date(today);
  // tomorrow.setDate(today.getDate() + 1);

  // // Format the date to YYYY-MM-DD
  // const formatDate = (date: Date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // const minDate = formatDate(tomorrow);
  return (
    <div className="flex-1">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        autoComplete="off"
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        min={type === "date" && hasMinDate ? minDate : ""}
        className={`block w-full border py-[14px] px-[20px] focus:outline-none focus:ring-1 focus:ring-primaryBlue ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default TextInput;
