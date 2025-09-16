import { ItemsMap } from "./types";

export const PRODUCTS = {
  A0001: {
    price: 12.99,
    name: "A0001",
  },
  A0002: {
    price: 3.99,
    name: "A0002",
  },
};

export const DEFAULT_INVENTORY: ItemsMap = new Map([
  [PRODUCTS.A0001.name, PRODUCTS.A0001.price],
  [PRODUCTS.A0002.name, PRODUCTS.A0002.price],
]);
