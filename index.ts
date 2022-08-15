import productsArray from "./data/products.json";
import { Product } from "./interfaces";
import { BehaviorSubject, Observable, of } from "rxjs";

const products = of(productsArray);

const cart = new BehaviorSubject<Record<string, number>>({});

const addProduct = (name: string): void =>
  cart.next({
    ...cart.getValue(),
    [name]: 1,
  });

const removeProduct = (name: string): void => {
  let tempCart = cart.getValue();
  delete tempCart[name];
  cart.next(tempCart);
};

const updateProductAmount = (name: string, newAmount: number): void => {
  let tempCart = cart.getValue();
  tempCart[name] = newAmount;
  cart.next(tempCart);
};

const checkout = (): void => cart.next({});

const totalPrice$ = (): Observable<number> => {
  let totalPrice = 0;
  Object.keys(cart.getValue()).forEach((name) => {
    products.subscribe(
      (array) =>
        (totalPrice +=
          array.find((product) => product.name === name).amount *
          array.find((product) => product.name === name).price)
    );
  });
  return new Observable((observer) => observer.next(totalPrice));
};

const productQuantity$ = (): Observable<number> => {
  let totalPrice = 0;
  Object.keys(cart.getValue()).forEach((name) => {
    products.subscribe(
      (array) =>
        (totalPrice += array.find((product) => product.name === name).amount)
    );
  });
  return new Observable((observer) => observer.next(totalPrice));
};
