import { ProductCode, SalesData, SalesRule } from "./types";

// # Buy1Get1Free A0002
// basket.scan("A0002")
// basket.scan("A0001")
// basket.scan("A0002") -> this is free (2nd, 4th and so on)
// basket.total
// => 16.98
export class BuyOneGetOneFree implements SalesRule {
  private readonly code: ProductCode;

  constructor(code: ProductCode) {
    this.code = code;
  }

  getDiscount({ basketItems, inventoryItems }: SalesData) {
    const count = basketItems.get(this.code) ?? 0;
    if (count <= 1) return 0;
    const price = inventoryItems.get(this.code);
    if (price === undefined) return 0;

    // all items with even index are free
    const freeItems = Math.floor(count / 2);
    return freeItems * price;
  }
}

// - 10% off a given article
// ```
// # 10Percent A0001
// basket.scan("A0002")
// basket.scan("A0001")
// basket.scan("A0002")
// basket.total
// => 19.67
// ```
export class PercentOff implements SalesRule {
  private readonly code: ProductCode;
  private readonly percent: number;

  constructor(code: ProductCode, percent: number) {
    if (percent <= 0 || percent >= 100) {
      throw new Error("percent must be between 0 and 100");
    }
    this.code = code;
    this.percent = percent;
  }

  getDiscount({ basketItems, inventoryItems }: SalesData) {
    const count = basketItems.get(this.code) ?? 0;
    if (count === 0) return 0;

    const price = inventoryItems.get(this.code);
    if (price === undefined) return 0;

    const discountPerItem = (this.percent / 100) * price;
    return discountPerItem * count;
  }
}
