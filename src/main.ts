import { Basket } from "./Basket";
import { BuyOneGetOneFree } from "./basket.sales";
import { DEFAULT_INVENTORY } from "./constants";

export const main = () => {
  console.log("Main: Start Shopping Basket");
  const salesRules = [new BuyOneGetOneFree("A0002")];
  const basket = new Basket(DEFAULT_INVENTORY, salesRules);

  basket.scan("A0001");
  basket.scan("A0002");
  basket.scan("A0002");

  basket.total();
};

main();
