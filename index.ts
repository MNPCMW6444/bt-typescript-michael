import productsArray from "./data/products.json";
import { Product } from "./interfaces";
import { BehaviorSubject, Observable, of, combineLatest, pipe } from "rxjs";
import { map, filter } from "rxjs/operators";

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
    let sum = 0;
    Object.keys(cartProduct).forEach((product) => {
      sum +=
        cartProduct[product] *
        dbProducts.filter((dbProduct) => dbProduct.name === product)[0].price;
    });
    return sum;
  });
};

//use rxjs, return only amount of keys in cart
const productQuantity$ = (): Observable<number> =>
  //cart.pipe(map((cartProducts): number => Object.keys(cartProducts).length));

  cart.pipe(
    map((cartProducts): number => {
      let sum = 0;
      Object.values(cartProducts).forEach((amount) => {
        sum += amount;
      });
      return sum;
    })
  );

//totalPrice$().subscribe((value) => console.log(value));
productQuantity$().subscribe((value) => console.log(value));

setTimeout(() => addProduct("Oatmeal"), 1000);
setTimeout(() => addProduct("Coconut"), 2000);
setTimeout(() => updateProductAmount("Coconut", 3), 3000);
setTimeout(() => updateProductAmount("Oatmeal", 5), 4000);
setTimeout(() => updateProductAmount("Oatmeal", 3), 4000);
