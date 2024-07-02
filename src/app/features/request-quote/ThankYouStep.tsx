"use client";

import Button from "@/app/components/forms/Button";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ThankYouStep = () => {
  return (
    <div className="flex flex-col h-[450px] items-center justify-center mt-[50px] md:mt-[100px] space-y-6 p-8 bg-white rounded-lg shadow-sm border-[1px]">
      <FaCheckCircle className="text-green-500 text-6xl" />
      <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
      <p className="text-gray-600 text-lg text-center">
        Your request has been successfully submitted.
      </p>
      <Button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-primaryBlue text-white md:py-[15px] w-full md:w-[200px]"
      >
        Done
      </Button>
    </div>
  );
};

export default ThankYouStep;
