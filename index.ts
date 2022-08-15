import productsArray from "./data/products.json";
import { Product } from "./interfaces";
import { BehaviorSubject, Observable, of, switchMap, map } from "rxjs";

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
  products.subscribe((array: Product[]) => {
    if (newAmount <= array.find((product) => product.name === name).limit)
      tempCart[name] = newAmount;
  });
  cart.next(tempCart);
};

const checkout = (): void => cart.next({});

//use rxjs  - combineLatest/withLatestfrom /switchMap
const totalPrice$ = (): Observable<number> =>
  products
    .pipe(
      switchMap((productDB) =>
        cart.pipe(
          map(
            (cartAmount) =>
              cartAmount *
              productDB.find((prdct) => prdct.name === productDB.name)
          )
        )
      )
    )
    .subscribe();

//use rxjs, return only amount of keys in cart
const productQuantity$ = (): Observable<number> => {
  let totalPrice = 0;
  Object.keys(cart.getValue()).forEach((name) => {
    products.subscribe(
      (array: Product[]) =>
        (totalPrice += array.find((product) => product.name === name).amount)
    );
  });
  return new Observable((observer) => observer.next(totalPrice));
};
