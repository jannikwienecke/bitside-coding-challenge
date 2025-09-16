import { BasketInterface, ItemsMap, ProductCode } from "./types";

export class Basket implements BasketInterface {
  private readonly inventory: ItemsMap;
  private readonly basketItems: ItemsMap = new Map();

  constructor(inventory: ItemsMap) {
    this.inventory = inventory;
  }

  total() {
    const items = Array.from(this.basketItems.entries());
    const sum = items.reduce((sum, [code, count]) => {
      const price = this.inventory.get(code);
      if (price === undefined) return sum;

      return sum + price * count;
    }, 0);

    console.log(`Basket.Total: Total price is ${sum}`);
    return sum;
  }

  scan(productCode: ProductCode) {
    console.log(`Basket.Scan: Scanning product ${productCode}`);
    const product = this.inventory.get(productCode);
    if (!product) {
      throw new Error(`Basket.Scan: Product ${productCode} not found`);
    }

    const countInBasketOfProduct = this.basketItems.get(productCode) ?? 0;
    this.basketItems.set(productCode, countInBasketOfProduct + 1);

    console.log(`Basket.Scan: Product ${productCode} added to basket`);
  }
}
