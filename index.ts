import productsArray from "./data/products.json";
import { Product, Cart, CartProduct } from "./interfaces";
import { BehaviorSubject, of } from "rxjs";

const products = of(productsArray);
//make it record
const cart = new BehaviorSubject<CartProduct[]>([]);
//refactor all funcitons based on the new interface
const addProduct = (product: Product): void => {
  let tempCart = cart.getValue();
  // use spread operator, you don't have to save in 'tempCart'
  tempCart.push({
    name: product.name,
    price: product.price,
    amount: product.amount,
  });
  cart.next(tempCart);
};

const removeProduct = (name: String): void => {
  let tempCart = cart.getValue();
  //use delete instead of filter
  tempCart.filter((cartProduct: CartProduct) => cartProduct.name !== name);
  cart.next(tempCart);
};

const updateProductAmount = (name: String, newAmount: number): void => {
  let tempCart = cart.getValue();
  tempCart.find((cartProduct) => cartProduct.name === name).amount = newAmount;
  cart.next(tempCart);
};

const checkout = (): void => cart.next([]);
//return observable, use operators - dont create new Observable/behaviorSubject
const totalPrice$ = (): BehaviorSubject<number> => {
  let totalPrice = 0;
  cart.getValue().forEach((cartProduct) => {
    totalPrice += cartProduct.amount * cartProduct.price;
  });
  return new BehaviorSubject(totalPrice);
};
//returns observable
const productQuantity$ = (): BehaviorSubject<number> => {
  //use reduce
  let totalAmount = 0;
  cart.getValue().forEach((cartProduct) => {
    totalAmount += cartProduct.amount;
  });
  return new BehaviorSubject(totalAmount);
};
