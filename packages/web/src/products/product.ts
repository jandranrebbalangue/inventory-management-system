export type Product = {
  productId: string;
  quantity: number;
  productName: string;
};

export const products: Product[] = [
  {
    productId: "728ed52f",
    quantity: 100,
    productName: "Test item 1",
  },
  {
    productId: "489e1d42",
    quantity: 125,
    productName: "Test item 2",
  },
];
