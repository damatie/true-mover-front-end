"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTruckMoving } from "@fortawesome/free-solid-svg-icons";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Move Info", "Inventories", "Location", "Done"];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="relative w-full flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="relative flex-1 flex flex-col items-center">
          <div className={`step-icon ${index <= currentStep ? "active" : ""}`}>
            {index < currentStep ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : index === currentStep ? (
              <FontAwesomeIcon icon={faTruckMoving} />
            ) : (
              index + 1
            )}
          </div>
          <div className="mt-2 text-center text-xs md:text-[14px]">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
