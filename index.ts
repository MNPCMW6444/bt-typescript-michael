import products from "./data/products.json";
import { Product, Cart, CartProduct } from "./interfaces";
import { BehaviorSubject } from "rxjs";

const iaddProduct = (
  iCart: Cart,
  productName: string,
  productDetails: CartProduct
) => {
  iCart[productName] = productDetails;
};

const iremoveProduct = (iCart: Cart, productNameToRemove: string) =>
  delete iCart[productNameToRemove];

const iupdateProductAmount = (
  iCart: Cart,
  productName: string,
  amount: number
) =>
  (amount > 0 && !iCart[productName].limit) ||
  (amount <= iCart[productName].limit && (iCart[productName].amount = amount));

const icheckout = (iCart: Cart) => {
  iCart = {};
};

const itotalPrice = (iCart: Cart): number => {
  const sum = Object.keys(iCart).reduce(
    (previousPrice: number, currentProductName: string) =>
      previousPrice +
      iCart[currentProductName].price * iCart[currentProductName].amount,
    0
  );
  return sum;
};

const iproductQuantity = (iCart: Cart) => {
  return Object.keys(iCart).length;
};

let iCart: Cart = {};

products.forEach((product: Product) =>
  iaddProduct(iCart, product.name, {
    price: product.price,
    amount: product.amount,
    limit: product.limit,
  })
);

const cart = new BehaviorSubject(iCart);

const addProduct = (product: Product): void => {
  let oldCart: Cart = cart.getValue();
  iaddProduct(oldCart, product.name, {
    price: product.price,
    amount: product.amount,
  });
  cart.next(oldCart);
};

const removeProduct = (product: Product): void => {
  let oldCart: Cart = cart.getValue();
  iremoveProduct(oldCart, product.name);
  cart.next(oldCart);
};

const updateProductAmount = (productName: string, amount: number): void => {
  let oldCart: Cart = cart.getValue();
  iupdateProductAmount(oldCart, productName, amount);
  cart.next(oldCart);
};

const checkout = (): void => cart.next({});

const totalPrice = (): number => itotalPrice(cart.getValue());

const productQuantity = (): number => iproductQuantity(cart.getValue());
