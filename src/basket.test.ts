import { describe, it, expect } from "vitest";
import { Basket } from "./Basket";
import { DEFAULT_INVENTORY } from "./constants";
import { SalesRule } from "./types";
import { BuyOneGetOneFree } from "./basket.sales";

describe("Basket", () => {
  it("can add products to the basket and calculate the total price", () => {
    const basket = new Basket(DEFAULT_INVENTORY);
    basket.scan("A0001");
    expect(basket.total()).toBe(12.99);

    basket.scan("A0002");
    expect(basket.total()).toBe(16.98);
  });

  it("throws an error when scanning a product that is not in the inventory", () => {
    const basket = new Basket(DEFAULT_INVENTORY);
    expect(() => basket.scan("A0003")).toThrow(
      "Basket.Scan: Product A0003 not found"
    );
  });

  it("can apply the buy1get1free rule to the basket", () => {
    const salesRules: SalesRule[] = [new BuyOneGetOneFree("A0002")];
    const basket = new Basket(DEFAULT_INVENTORY, salesRules);

    basket.scan("A0001");
    expect(basket.total()).toBe(12.99);

    basket.scan("A0002");
    expect(basket.total()).toBe(16.98);

    basket.scan("A0002");
    // second A0002 should be free -> price remains 16.98
    expect(basket.total()).toBe(16.98);
  });
});
