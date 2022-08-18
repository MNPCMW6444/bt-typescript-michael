import productsArray from "./data/products.json";
import { Product } from "./interfaces";
import {
  BehaviorSubject,
  Observable,
  of,
  combineLatest,
  switchMap,
} from "rxjs";

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
  cart.pipe(switchMap((cartProducts) => of(Object.keys(cartProducts).length)));

//totalPrice$().subscribe((value) => console.log(value));
productQuantity$().subscribe((value) => console.log(value));

setTimeout(() => addProduct("Oatmeal"), 1000);
setTimeout(() => addProduct("Coconut"), 2000);
setTimeout(() => updateProductAmount("Coconut", 3), 3000);
setTimeout(() => updateProductAmount("Oatmeal", 5), 4000);
setTimeout(() => updateProductAmount("Oatmeal", 3), 4000);
