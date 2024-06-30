"use client";

import React, { useState } from "react";
import InventoryItem from "./components/InventoryItem";

interface InventoryItemType {
  img: string;
  name: string;
  qty: number;
  maxQty: number;
  SIunit: string;
  volume: number;
}

interface InventoryData {
  [key: string]: InventoryItemType[];
}

interface InventoriesStepProps {
  inventoryData: InventoryData;
  handleInventoryChange: (category: string, name: string, qty: number) => void;
}

const InventoriesStep: React.FC<InventoriesStepProps> = ({
  inventoryData,
  handleInventoryChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Livingroom");

  const incrementCount = (
    category: string,
    name: string,
    qty: number,
    maxQty: number
  ) => {
    if (qty < maxQty) {
      handleInventoryChange(category, name, qty + 1);
    }
  };

  const decrementCount = (category: string, name: string, qty: number) => {
    if (qty > 0) {
      handleInventoryChange(category, name, qty - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1">
        <div className="flex flex-wrap md:justify-start  gap-[10px] mb-[20px]">
          {Object.keys(inventoryData).map((category) => (
            <button
              type="button"
              key={category}
              className={`w-auto py-3 px-4 text-sm font-semibold rounded-lg transition duration-300 ${
                activeTab === category
                  ? "bg-primaryBlue text-white shadow-lg"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <InventoryItem
          category={activeTab}
          items={inventoryData[activeTab]}
          incrementCount={(name: string, qty: number, maxQty: number) =>
            incrementCount(activeTab, name, qty, maxQty)
          }
          decrementCount={(name: string, qty: number) =>
            decrementCount(activeTab, name, qty)
          }
        />
      </div>
    </div>
  );
};

export default InventoriesStep;
