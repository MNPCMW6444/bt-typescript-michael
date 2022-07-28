import products from "./data/products.json";
import { Cart, Product } from "./interfaces";

const addProduct = (cart: Cart, product: Product) => {
  cart[product.name] = { ...product };
};

const removeProduct = (cart: Cart, productToRemove: Product) => {
  Object.keys(cart).filter(
    (productName) => productName !== productToRemove.name
  );
};

const updateProductAmount = (cart: Cart, productName: string, amount: number) =>
  (amount > 0 && !cart[productName].limit) ||
  (amount <= cart[productName].limit && (cart[productName].amount = amount));

const checkout = (cart: Cart) => {
  cart = {};
};

const totalPrice = (cart: Cart): number => {
  const sum = Object.keys(cart).reduce(
    (previousValue, currentValue) =>
      previousValue + cart[currentValue].price * cart[currentValue].amount,
    0
  );
  return sum;
};

const productQuantity = (cart: Cart) => {
  return Object.keys(cart).length;
};

let cart: Cart = {};

products.forEach((product: Product) => addProduct(cart, product));
