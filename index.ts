import products from "./data/products.json";
import { Product } from "./interfaces";
import { from } from "rxjs";

let cart = from(products);

const addProduct = (product: Product) => products.push(product as any);

const removeProduct = (product: Product) =>
  products.filter((prdct) => prdct.name !== product.name);

const updateProductAmount = (product: Product, newAmount: number) =>
  products.forEach((prdct) => {
    if (prdct.name === product.name) prdct.amount = newAmount;
  });

const checkout = () => (cart = from([]));

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
