import { useState, useEffect } from "react";
import useKilometersToMiles from "./useKilometersToMiles"; // Import your existing hook
import {
  FLoorCost,
  LandingCost,
  ManpowerCost,
  MillagePrice,
  PackagingPrice,
  UnpackagingPrice,
  UrgentPickupPrice,
} from "../features/request-quote/utils/data";

interface Item {
  volume: number;
  qty: number;
}

interface ExtraMaterial {
  price: number;
  quantity: number;
}

interface LocationData {
  loadingFloor?: number;
  unloadingFloor?: number;
  manpower?: number;
  extraMaterials?: ExtraMaterial[];
  loadingPackaging?: boolean;
  unloadingUnpacking?: boolean;
}

const useCalculateTotalCost = (
  pickupDate: string,
  selectedItems: Item[],
  distance: any,
  locationData: LocationData
) => {
  const [urgentPickup, setUrgentPickup] = useState(false);

  useEffect(() => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    const pickupDateObj = new Date(pickupDate);
    if (pickupDateObj >= today && pickupDateObj <= twoDaysLater) {
      setUrgentPickup(true);
    } else {
      setUrgentPickup(false);
    }
  }, [pickupDate]);

  const totalVolume = selectedItems.reduce(
    (total, item) => total + item.volume * item.qty,
    0
  );

  const miles = useKilometersToMiles(distance);
  const calculateExtraMaterialsCost = () => {
    if (locationData.extraMaterials) {
      return locationData.extraMaterials.reduce(
        (total, material) => total + material.price * material.quantity,
        0
      );
    }
    return 0;
  };
  const handleFinalPrice = () => {
    const HighFloorCost =
      (locationData.loadingFloor && Number(locationData.loadingFloor) > 1) ||
      (locationData.unloadingFloor && Number(locationData.unloadingFloor) > 1)
        ? FLoorCost
        : 0;
    const UrgentPickupCost = urgentPickup ? UrgentPickupPrice : 0;
    const MillageCost = Number(miles) * MillagePrice;
    const ManPower =
      Number(locationData.manpower) > 1
        ? Number(locationData.manpower) * Number(ManpowerCost) -
          Number(ManpowerCost)
        : 0;
    const ExtraMaterialsCost = calculateExtraMaterialsCost();
    const PackagingCost = locationData.loadingPackaging ? PackagingPrice : 0;
    const UnpackagingCost = locationData.unloadingUnpacking
      ? UnpackagingPrice
      : 0;

    return (
      totalVolume +
      ExtraMaterialsCost +
      HighFloorCost +
      LandingCost +
      UrgentPickupCost +
      ManPower +
      PackagingCost +
      UnpackagingCost +
      MillageCost
    );
  };

  return { totalVolume, handleFinalPrice };
};

export default useCalculateTotalCost;
