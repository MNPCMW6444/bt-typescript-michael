import products from "./data/products.json";
import { Cart, Product } from "./interfaces";

const addProduct = (cart: Cart, product: Product) => {
  cart.products.push(product);
};

const removeProduct = (cart: Cart, productToRemove: Product) => {
  cart.products.filter((product) => product.name !== productToRemove.name);
};

const updateProductAmount = (cart: Cart, productName: string, amount: number) =>
  amount > 0 &&
  (cart.products = cart.products.map((oldProduct) =>
    oldProduct.name === productName
      ? { ...oldProduct, amount: amount }
      : { ...oldProduct }
  ));
const checkout = (cart: Cart) => {
  cart.products = [];
};

const totalPrice = (cart: Cart): number => {
  const sum = cart.products.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    0
  );
  return sum;
};

const productQuantity = (cart: Cart) => {
  const totalAmount = cart.products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
  return totalAmount;
};

let cart: Cart = { products: [] };

products.forEach((product: Product) => addProduct(cart, product));
