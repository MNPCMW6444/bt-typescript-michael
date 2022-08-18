import productsArray from "./data/products.json";
import { Product } from "./interfaces";
import {
  BehaviorSubject,
  Observable,
  of,
  combineLatest,
  reduce,
  map,
} from "rxjs";
import { create } from "ts-node";

const productsDB = of(productsArray);

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
  productsDB.subscribe((array: Product[]) => {
    if (newAmount <= array.find((product) => product.name === name).limit)
      tempCart[name] = newAmount;
  });
  cart.next(tempCart);
};

const checkout = (): void => cart.next({});

//use rxjs  - combineLatest/withLatestfrom /switchMap
const totalPrice$ = (): Observable<number> => {
  return combineLatest([cart, productsDB], (cartProduct, dbProducts) => {
    console.log(cart);
    return (
      cartProduct.amount *
      (
        dbProducts.filter(
          (dbProduct) => dbProduct.name === Object.keys(cartProduct)[0]
        ) as unknown as Product
      ).price
    );
  });
};

//use rxjs, return only amount of keys in cart
const productQuantity$ = (): Observable<number> =>
  Observable.create((observer) => {
    observer.next(Object(cart.getValue()).length);
  });
