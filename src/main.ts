import { Basket } from "./Basket";
import { ItemsMap } from "./types";

export const DEFAULT_INVENTORY: ItemsMap = new Map([
  ["A0001", 12.99],
  ["A0002", 3.99],
]);

export const main = () => {
  console.log("Main: Start Shopping Basket");
  const basket = new Basket(DEFAULT_INVENTORY);

  basket.scan("A0001");
  basket.scan("A0002");

  basket.total();
};

main();
