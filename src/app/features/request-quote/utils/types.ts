// types.ts

export interface InventoryItemType {
  img: string;
  name: string;
  qty: number;
  maxQty: number;
  SIunit: string;
  volume: number;
}

export interface InventoryData {
  [key: string]: InventoryItemType[];
}

export interface ExtraMaterial {
  name: string;
  quantity: number;
  price: number;
}

export interface LocationData {
  period: string;
  date: string;
  name: string;
  email: string;
  phone: any;
  userType: string;
  source: string;
  destination: string;
  loadingFloor: number;
  loadingStreet: string;
  loadingElevator: boolean;
  loadingPackaging: boolean;
  unloadingFloor: number;
  unloadingStreet: string;
  unloadingElevator: boolean;
  unloadingUnpacking: boolean;
  manpower: number;
  additionalPackingMaterial: boolean;
  extraMaterials: ExtraMaterial[];
}
