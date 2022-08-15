import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
  amount: number;
}

//remove price and limit. If you need to find them, search in the products observable
export interface CartProduct {
  name: string;
  price: number;
  amount: number;
  limit?: number;
}

export type Cart = BehaviorSubject<CartProduct[]>;
