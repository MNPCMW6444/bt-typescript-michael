export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
  amount: number;
}

export interface Cart {
  products: { name: string; price: number; amount: number }[];
}
