import products from "./data/products.json";
import { Product } from "./interfaces";
import { from, Subject } from "rxjs";

let cart = new Subject();

const addProduct = (product: Product) => cart.next(product);

/* const removeProduct = (product: Product) =>
  products.filter((prdct) => prdct.name !== product.name);
 */

const updateProductAmount = (product: Product, newAmount: number) =>
  products.forEach((prdct) => {
    if (prdct.name === product.name) prdct.amount = newAmount;
  });

const checkout = () => (cart = new Subject());

const totalPrice = () =>
  products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    0
  );

const productsQuantity = () =>
  products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
