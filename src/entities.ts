export type User = {
  id: number;
  name: string;
  isAdmin?: boolean;
};

export type Category = string

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: Category;
};