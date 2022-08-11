import products from "./data/products.json";
import { Cart, cartProduct, Product } from "./interfaces";
import Rxjs, { Observable } from "rxjs";

/* const addProduct = (
  cart: Cart,
  productName: string,
  productDetails: cartProduct
) => {
  cart[productName] = productDetails;
  //can be immutable
}; */

const removeProduct = (
  cart: Observable<Product>,
  productNameToRemove: string
) => delete cart[productNameToRemove];

const updateProductAmount = (
  cart: Observable<Product>,
  productName: string,
  amount: number
) =>
  (amount > 0 && !cart[productName].limit) ||
  (amount <= cart[productName].limit && (cart[productName].amount = amount));

/* const checkout = (cart: Observable<Product>) => {
  cart = {};
}; */

const totalPrice = (cart: Observable<Product>): number => {
  const sum = Object.keys(cart).reduce(
    (previousPrice: number, currentProductName: string) =>
      previousPrice +
      cart[currentProductName].price * cart[currentProductName].amount,
    0
  );
  return sum;
};

const productQuantity = (cart: Observable<Product>) => {
  return Object.keys(cart).length;
};

let cart = new Rxjs.Observable((observer) => {
  products.forEach((product: Product) => observer.next(product));
});

console.log(totalPrice(cart));
