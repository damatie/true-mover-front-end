import { ExtraMaterial } from "./types";

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
// Inventory data
export const Inventory: InventoryData = {
  Bedroom: [
    {
      img: "/img/SingleBed.jpg",
      name: "Single Bed",
      qty: 0,
      maxQty: 5,
      SIunit: "cubic meter",
      volume: 1.5,
    },
    {
      img: "/img/DoubleBed.jpg",
      name: "Double Bed",
      qty: 0,
      maxQty: 3,
      SIunit: "cubic meter",
      volume: 2.0,
    },
    {
      img: "/img/Table.jpg",
      name: "Table",
      qty: 0,
      maxQty: 10,
      SIunit: "cubic meter",
      volume: 0.75,
    },
  ],
  Livingroom: [
    {
      img: "/img/Sofa.jpg",
      name: "Sofa",
      qty: 0,
      maxQty: 2,
      SIunit: "cubic meter",
      volume: 2.5,
    },
    {
      img: "/img/CoffeeTable.jpg",
      name: "Coffee Table",
      qty: 0,
      maxQty: 4,
      SIunit: "cubic meter",
      volume: 0.5,
    },
  ],
  Kitchen: [
    {
      img: "/img/Refrigerator.jpg",
      name: "Refrigerator",
      qty: 0,
      maxQty: 2,
      SIunit: "cubic meter",
      volume: 1.0,
    },
    {
      img: "/img/Microwave.jpg",
      name: "Microwave",
      qty: 0,
      maxQty: 6,
      SIunit: "cubic meter",
      volume: 0.1,
    },
  ],
  Vehicles: [
    {
      img: "/img/Car.jpg",
      name: "Car",
      qty: 0,
      maxQty: 1,
      SIunit: "cubic meter",
      volume: 10.0,
    },
    {
      img: "/img/Bike.jpg",
      name: "Bike",
      qty: 0,
      maxQty: 3,
      SIunit: "cubic meter",
      volume: 1.2,
    },
  ],
  Custom: [
    {
      img: "/img/CustomItem1.jpg",
      name: "Custom Item 1",
      qty: 0,
      maxQty: 10,
      SIunit: "cubic meter",
      volume: 1.0,
    },
    {
      img: "/img/CustomItem2.jpg",
      name: "Custom Item 2",
      qty: 0,
      maxQty: 8,
      SIunit: "cubic meter",
      volume: 1.5,
    },
  ],
};

// Extra materials data
export const defaultExtraMaterials: ExtraMaterial[] = [
  { name: "Small Box", quantity: 0, price: 10 },
  { name: "Medium Box", quantity: 0, price: 15 },
  { name: "Large Box", quantity: 0, price: 20 },
];

// Floors
export const floorData = [0, 1, 2, 3, 4, 5];

// Prices in pounds
export const FLoorCost = 20; /*floor above 1*/
export const ManpowerCost = 20; /* above 1*/
export const PackagingPrice = 20;
export const UnpackagingPrice = 20;
export const LandingCost = 20;
export const UrgentPickupPrice = 40;
export const MillagePrice = 1;
