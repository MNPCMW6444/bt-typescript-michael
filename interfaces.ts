export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
  amount: number;
}

export interface cartProduct {
  price: number;
  amount: number;
  limit?: number;
}

export type Cart = Record<string, cartProduct>;
