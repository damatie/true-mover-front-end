import React from "react";
import { ExtraMaterial } from "../utils/types"; // Adjust the path as necessary

interface ExtraMaterialOptionProps {
  material: ExtraMaterial;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const ExtraMaterialOption: React.FC<ExtraMaterialOptionProps> = ({
  material,
  handleIncrease,
  handleDecrease,
}) => {
  if (!material) {
    return null; // Render nothing if material is not provided
  }

  const { name, quantity, price } = material;

  return (
    <div className="flex  justify-between mb-2">
      <span className="flex  w-2/4">{name}</span>
      <div className="flex flex-row w-1/4  space-x-2">
        <button
          type="button"
          onClick={handleDecrease}
          className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          -
        </button>
        <span>{quantity ?? 0}</span>
        <button
          type="button"
          onClick={handleIncrease}
          className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          +
        </button>
      </div>
      <span className="flex justify-end w-1/4">
        £{(price * (quantity ?? 0)).toFixed(2)}
      </span>
    </div>
  );
};

export default ExtraMaterialOption;
