import products from "./data/products.json";
import { Cart, cartProduct, Product } from "./interfaces";

const addProduct = (
  cart: Cart,
  productName: string,
  productDetails: cartProduct
) => {
  cart[productName] = productDetails;
  //can be immutable
};

const removeProduct = (cart: Cart, productNameToRemove: string) =>
  delete cart[productNameToRemove];
// no need to check if exists - because this won't throw error if isn't

const updateProductAmount = (cart: Cart, productName: string, amount: number) =>
  (amount > 0 && !cart[productName].limit) ||
  (amount <= cart[productName].limit && (cart[productName].amount = amount));

const checkout = (cart: Cart) => {
  cart = {};
};

const totalPrice = (cart: Cart): number => {
  const sum = Object.keys(cart).reduce(
    (previousPrice: number, currentProductName: string) =>
      previousPrice +
      cart[currentProductName].price * cart[currentProductName].amount,
    0
  );
  return sum;
};

const productQuantity = (cart: Cart) => {
  return Object.keys(cart).length;
};

let cart: Cart = {};

products.forEach((product: Product) => addProduct(cart, product.name, product));
