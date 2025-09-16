import { Basket } from "./Basket";
import { BuyOneGetOneFree, PercentOff } from "./basket.sales";
import { DEFAULT_INVENTORY, PRODUCTS } from "./constants";

export const main = () => {
  console.log("Main: Start Shopping Basket");

  const basket = new Basket(DEFAULT_INVENTORY, [
    new PercentOff(PRODUCTS.A0001.name, 10),
    new BuyOneGetOneFree(PRODUCTS.A0002.name),
  ]);

  basket.scan(PRODUCTS.A0001.name);
  basket.scan(PRODUCTS.A0002.name);
  basket.scan(PRODUCTS.A0002.name);

  basket.total();
};

main();
