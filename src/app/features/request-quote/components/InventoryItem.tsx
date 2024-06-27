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
      <h3 className="text-2xl font-bold text-center mb-6">{category}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="border rounded-lg shadow-lg p-4 bg-white text-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-24 object-cover rounded-t-lg mb-2"
            />
            <div className="text-lg font-semibold mb-2">{item.name}</div>
            <div className="text-gray-500 mb-4">
              {item.volume} {item.SIunit}
            </div>
            <div className="flex justify-center items-center space-x-2">
              <button
                type="button"
                className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => decrementCount(item.name, item.qty)}
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.qty}</span>
              <button
                type="button"
                className={`bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center ${
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
