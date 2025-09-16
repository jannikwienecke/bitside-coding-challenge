import { BasketInterface, ItemsMap, ProductCode, SalesRule } from "./types";

export class Basket implements BasketInterface {
  private readonly inventory: ItemsMap;
  private readonly basketItems: ItemsMap = new Map();
  private readonly salesRules: SalesRule[] = [];

  constructor(inventory: ItemsMap, salesRules: SalesRule[] = []) {
    this.inventory = inventory;
    this.salesRules = salesRules;
  }

  total() {
    const items = Array.from(this.basketItems.entries());
    const sum = items.reduce((sum, [code, count]) => {
      const price = this.inventory.get(code);
      if (price === undefined) return sum;

      return sum + price * count;
    }, 0);

    const discount = this.salesRules.reduce((totalDiscount, rule) => {
      const discount = rule.getDiscount({
        inventoryItems: this.inventory,
        basketItems: this.basketItems,
      });

      return totalDiscount + discount;
    }, 0);

    const sumAfterDiscount = sum - discount;
    console.log(`Basket.Total: Total price is ${sumAfterDiscount}`);
    return sumAfterDiscount;
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
