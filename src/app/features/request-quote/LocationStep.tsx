"use client";

import React, { useState, useEffect } from "react";
import TextInput from "../../components/forms/TextInput";
import ToggleSwitch from "../../components/forms/ToggleSwitch";
import ModernRadioInput from "../../components/forms/ModernRadioInput";

import { ExtraMaterial } from "../request-quote/utils/types"; // Import the type
import ExtraMaterialOption from "./components/ExtraMaterialOption";
import { defaultExtraMaterials, floorData } from "./utils/data";

interface LocationStepProps {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  setFieldValue,
}) => {
  useEffect(() => {
    if (!values.extraMaterials) {
      setFieldValue("extraMaterials", defaultExtraMaterials);
    }
  }, [setFieldValue, values.extraMaterials]);

  const handleIncrease = (index: number) => {
    const newMaterials = [...values.extraMaterials];
    newMaterials[index].quantity += 1;
    setFieldValue("extraMaterials", newMaterials);
  };

  const handleDecrease = (index: number) => {
    const newMaterials = [...values.extraMaterials];
    if (newMaterials[index].quantity > 0) {
      newMaterials[index].quantity -= 1;
    }
    setFieldValue("extraMaterials", newMaterials);
  };

  const handleTogglePackingMaterial = (e: React.ChangeEvent<any>) => {
    handleChange(e);
    if (!e.target.checked) {
      setFieldValue("extraMaterials", defaultExtraMaterials);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-bold mb-4">Loading Point</h3>
          <p>Floor</p>
          <div className="flex flex-wrap mb-4">
            {floorData.map((floor) => (
              <ModernRadioInput
                key={floor}
                label={`${floor}`}
                name="loadingFloor"
                value={floor}
                checked={Number(values.loadingFloor) === Number(floor)}
                onChange={handleChange}
              />
            ))}
          </div>
          <TextInput
            label="Street"
            name="loadingStreet"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.loadingStreet}
            error={touched.loadingStreet && errors.loadingStreet}
          />
          <ToggleSwitch
            label="Elevator?"
            name="loadingElevator"
            checked={values.loadingElevator}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Packaging?"
            name="loadingPackaging"
            checked={values.loadingPackaging}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-bold mb-4">Unloading Point</h3>
          <p>Floor</p>
          <div className="flex flex-wrap  mb-4">
            {floorData.map((floor) => (
              <ModernRadioInput
                key={floor}
                label={`${floor}`}
                name="unloadingFloor"
                value={floor}
                checked={Number(values.unloadingFloor) === Number(floor)}
                onChange={handleChange}
              />
            ))}
          </div>
          <TextInput
            label="Street"
            name="unloadingStreet"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unloadingStreet}
            error={touched.unloadingStreet && errors.unloadingStreet}
          />
          <ToggleSwitch
            label="Elevator?"
            name="unloadingElevator"
            checked={values.unloadingElevator}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Unpacking?"
            name="unloadingUnpacking"
            checked={values.unloadingUnpacking}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-bold mb-4">Manpower Selection</h3>
          <select
            name="manpower"
            value={values.manpower}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full border py-[16px] px-[10px] focus:outline-none focus:ring-1 focus:ring-primaryBlue"
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {`${number} Manpower`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-bold mb-4">Additional Information</h3>
        <ToggleSwitch
          label="Packing material from us?"
          name="additionalPackingMaterial"
          checked={values.additionalPackingMaterial}
          onChange={handleTogglePackingMaterial}
        />
        {values.additionalPackingMaterial && (
          <div className="space-y-4">
            {values.extraMaterials.map(
              (material: ExtraMaterial, index: number) => (
                <ExtraMaterialOption
                  key={material.name}
                  material={material}
                  handleIncrease={() => handleIncrease(index)}
                  handleDecrease={() => handleDecrease(index)}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationStep;
