export type ProductCode = string;

export type BasketInterface = {
  total: () => number;
  scan: (item: ProductCode) => void;
};

export type ItemsMap = Map<ProductCode, number>;
