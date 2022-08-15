import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
  amount: number;
}

export interface CartProduct {
  name: string;
  price: number;
  amount: number;
  limit?: number;
}

export type Cart = BehaviorSubject<CartProduct[]>;
