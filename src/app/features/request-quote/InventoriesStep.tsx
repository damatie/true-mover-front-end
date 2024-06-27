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
  const [activeTab, setActiveTab] = useState<string>("Bedroom");

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
        <div className="flex flex-wrap md:justify-center  gap-[10px] mb-4">
          {Object.keys(inventoryData).map((category) => (
            <button
              type="button"
              key={category}
              className={`py-2 px-4 rounded-lg transition duration-300 ${
                activeTab === category
                  ? "bg-blue-900 text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
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
