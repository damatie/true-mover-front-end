"use client";
import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  onChange,
  value,
  error,
}) => (
  <div className="flex-1">
    <label htmlFor={name} className="block mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      className={`block w-full border p-2 rounded ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

export default TextInput;
