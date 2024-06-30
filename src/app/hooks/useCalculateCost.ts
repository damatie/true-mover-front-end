import { useMemo } from "react";

interface Item {
  volume: number;
  qty: number;
}

interface ExtraMaterial {
  price: number;
  quantity: number;
}

interface LocationData {
  loadingFloor: number;
  date: string;
  extraMaterials: ExtraMaterial[];
}

const useCalculateCost = (
  inventoryData: any,
  distance: string | number | null
) => {
  const filterSelectedItems = (data: { [category: string]: Item[] }) => {
    const filteredData: Item[] = [];
    for (const category in data) {
      const filteredItems = data[category].filter((item) => item.qty > 0);
      if (filteredItems.length > 0) {
        filteredData.push(...filteredItems);
      }
    }
    return filteredData;
  };

  const calculateTotalVolume = (selectedItems: Item[]) => {
    return selectedItems.reduce(
      (total, item) => total + item.volume * item.qty,
      0
    );
  };

  const calculateTotalPrice = (selectedItems: Item[], values: LocationData) => {
    const volumeCost = calculateTotalVolume(selectedItems);
    const loadingFloorCost = values.loadingFloor > 1 ? 20 : 0;
    const landingCost = 20;
    const urgentPickupCost =
      new Date(values.date) <=
      new Date(new Date().setDate(new Date().getDate() + 2))
        ? 40
        : 0;
    const millageCost = ((distance as number) / 1609.34) * 1;
    const extraMaterialsCost = values.extraMaterials.reduce(
      (total, material) => total + material.price * material.quantity,
      0
    );

    return (
      volumeCost +
      extraMaterialsCost +
      loadingFloorCost +
      landingCost +
      urgentPickupCost +
      millageCost
    );
  };

  return useMemo(() => {
    const selectedItems = filterSelectedItems(inventoryData);
    return {
      selectedItems,
      calculateTotalVolume: () => calculateTotalVolume(selectedItems),
      calculateTotalPrice: (values: LocationData) =>
        calculateTotalPrice(selectedItems, values),
    };
  }, [inventoryData, distance]);
};

export default useCalculateCost;
