"use client";

import React from "react";

interface InventoryItemProps {
  category: string;
  items: {
    img: string;
    name: string;
    qty: number;
    maxQty: number;
    SIunit: string;
    volume: number;
  }[];
  incrementCount: (name: string, qty: number, maxQty: number) => void;
  decrementCount: (name: string, qty: number) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  category,
  items,
  incrementCount,
  decrementCount,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-left mb-6">{category}</h3>
      <div className="flex flex-col gap-y-[10px]">
        {items?.map((item) => (
          <div
            key={item.name}
            className=" flex  flex-row items-center justify-between rounded-lg border-[1px] py-[10px] px-[12px] bg-white text-center"
          >
            <div className="text-sm font-semibold mb-2 text-left  pt-[5px] flex w-2/3">
              {item.name}
              {/* {item.volume} {item.SIunit} */}
            </div>
            <div className="flex justify-center items-center space-x-2">
              <button
                type="button"
                className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => decrementCount(item.name, item.qty)}
              >
                -
              </button>
              <span className="text-sm font-semibold">{item.qty}</span>
              <button
                type="button"
                className={`bg-gray-500 text-white rounded-full w-5 h-5 flex items-center pt-[3px] justify-center ${
                  item.qty >= item.maxQty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => incrementCount(item.name, item.qty, item.maxQty)}
                disabled={item.qty >= item.maxQty}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryItem;
