export type User = {
  id: number;
  name: string;
  isAdmin?: boolean;
};

export type Category = string;

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: Category;
  description: string;
  rating: Rating;
};

export type Rating = {
  rate: number;
  count: number;
};
