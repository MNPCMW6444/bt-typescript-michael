export interface Product extends cartProduct {
  name: string;
  description: string;
  image: string;
}

export interface cartProduct {
  price: number;
  amount: number;
  limit?: number;
}

export type Cart = Record<string, cartProduct>;
