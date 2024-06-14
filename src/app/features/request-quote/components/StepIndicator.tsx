"use client";

import React from "react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Move Info", "Inventories", "Location", "Done"];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={index} className="step">
          <div
            className={`step-circle ${
              index < currentStep
                ? "completed"
                : index === currentStep
                ? "active"
                : ""
            }`}
          >
            {index + 1}
          </div>
          <div className="step-label">{step}</div>
          {index < steps.length - 1 && (
            <div
              className={`step-line ${
                index < currentStep
                  ? "completed"
                  : index === currentStep - 1
                  ? "active"
                  : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
