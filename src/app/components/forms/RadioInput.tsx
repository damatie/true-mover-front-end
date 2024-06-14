"use client";
import React from "react";

interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => (
  <label className="mr-4">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    {label}
  </label>
);

export default RadioInput;
