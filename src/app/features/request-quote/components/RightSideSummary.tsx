"use client";

import React, { useState } from "react";
import useKilometersToMiles from "@/app/hooks/useKilometersToMiles";
import { InventoryItemType, LocationData } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import useCalculateTotalCost from "@/app/hooks/useCalculateTotalCost";

interface RightSideSummaryProps {
  distance: string | number | null;
  timePeriod: string;
  pickupDate: string;
  source: string;
  destination: string;
  selectedItems: InventoryItemType[];
  locationData?: Partial<LocationData>; // Make locationData optional and partial
}

const RightSideSummary: React.FC<RightSideSummaryProps> = ({
  distance,
  timePeriod,
  pickupDate,
  source,
  destination,
  selectedItems,
  locationData = {}, // Default to an empty object
}) => {
  const [sections, setSections] = useState<{ [key: string]: boolean }>({
    items: true,
    location: true,
    extraMaterials: true,
  });

  // Distance in miles
  const miles = useKilometersToMiles(distance);

  const { totalVolume, handleFinalPrice } = useCalculateTotalCost(
    pickupDate,
    selectedItems,
    distance,
    locationData
  );

  const totalCost = handleFinalPrice();

  const toggleSection = (section: string) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  return (
    <div className="w-full lg:w-full bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h3 className="text-2xl font-bold mb-4">Estimated Cost</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Distance</span>
          <span>{miles} mil(s)</span>
        </div>
        <div className="flex justify-between">
          <span>Time Period</span>
          <span>{timePeriod}</span>
        </div>
        <div className="flex justify-between">
          <span>Pickup Date</span>
          <span>{pickupDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold uppercase text-[11px] text-primaryGray">
            Pickup
          </span>
          <span>{source}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold uppercase text-[11px] text-primaryGray">
            Destination
          </span>
          <span>{destination}</span>
        </div>

        <div>
          <button
            type="button"
            className="w-full text-left  font-semibold text-base py-2 flex items-center justify-between"
            onClick={() => toggleSection("items")}
          >
            Selected Items
            <FontAwesomeIcon icon={sections.items ? faMinus : faPlus} />
          </button>
          {sections.items && (
            <ul className="space-y-1 pl-4">
              {selectedItems.map((item) => (
                <li key={item.name} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.qty}</span>
                </li>
              ))}
              <div className="flex justify-between text-sm font-bold pt-4">
                <span>Total Volume (Cubic Meter)</span>
                <span>
                  {totalVolume.toFixed(2)} m<sup>3</sup>
                </span>
              </div>
            </ul>
          )}
        </div>

        {locationData && (
          <div>
            <button
              type="button"
              className="w-full text-left font-semibold text-base py-2 flex items-center justify-between"
              onClick={() => toggleSection("location")}
            >
              Location Details
              <FontAwesomeIcon icon={sections.location ? faMinus : faPlus} />
            </button>
            {sections.location && (
              <div className="space-y-2 pl-4">
                <div className="flex justify-between">
                  <span>Loading Floor</span>
                  <span>{locationData.loadingFloor ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loading Street</span>
                  <span>{locationData.loadingStreet ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loading Elevator</span>
                  <span>{locationData.loadingElevator ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loading Packaging</span>
                  <span>{locationData.loadingPackaging ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unloading Floor</span>
                  <span>{locationData.unloadingFloor ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unloading Street</span>
                  <span>{locationData.unloadingStreet ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unloading Elevator</span>
                  <span>{locationData.unloadingElevator ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unloading Unpacking</span>
                  <span>{locationData.unloadingUnpacking ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Manpower</span>
                  <span>{locationData.manpower ?? "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <button
            type="button"
            className="w-full text-left font-semibold text-base py-2 flex items-center justify-between"
            onClick={() => toggleSection("extraMaterials")}
          >
            Extra Materials
            <FontAwesomeIcon
              icon={sections.extraMaterials ? faMinus : faPlus}
            />
          </button>
          <>
            {sections.extraMaterials && locationData.extraMaterials && (
              <ul className="space-y-1 pl-4">
                {locationData.extraMaterials
                  .filter((material) => material.quantity > 0)
                  .map((material) => (
                    <li key={material.name} className="flex justify-between">
                      <span>
                        {material.name} x {material.quantity}
                      </span>
                      <span>
                        £{(material.price * material.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </>
        </div>

        <div className="flex justify-between text-[16px] font-bold mt-4 border-t pt-2">
          <span>Total Price</span>
          <span>£{totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default RightSideSummary;
