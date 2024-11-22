import { Category, Product } from "../entities";

export const Products: Product[] = [
  {
    id: 1,
    name: "product1",
    price: 10,
    categoryId: 1,
  },
  {
    id: 2,
    name: "product2",
    price: 20,
    categoryId: 1,
  },
];

export const Categories: Category[] = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
]