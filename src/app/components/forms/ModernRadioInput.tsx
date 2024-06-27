import React from "react";

interface ModernRadioInputProps {
  label: string;
  name: string;
  value: number | string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModernRadioInput: React.FC<ModernRadioInputProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center px-3 py-2 mr-2 mb-2 border rounded-lg cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 bg-white hover:bg-gray-100">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`flex items-center justify-center w-6 h-6 mr-2 border-2 rounded-full ${
          checked ? "border-blue-500" : "border-gray-300"
        }`}
      >
        {checked && <span className="w-3 h-3 bg-blue-500 rounded-full"></span>}
      </span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default ModernRadioInput;
