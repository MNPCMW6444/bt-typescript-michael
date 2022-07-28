import products from "./data/products.json";

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
  amount: number;
}

interface Cart {
  products: Product[];
}

const addProduct = (cart: Cart, product: Product) => {
  cart.products.push(product);
};

const removeProduct = (cart: Cart, productToRemove: Product) => {
  cart.products.filter((product) => product.name !== productToRemove.name);
};

const updateProductAmount = (cart: Cart, product: Product, amount: number) =>
  (cart.products = cart.products.map((oldProduct) =>
    oldProduct.name === product.name
      ? { ...oldProduct, amount: oldProduct.amount }
      : { ...oldProduct }
  ));
const checkout = (cart: Cart) => {
  cart.products = [];
};

const totalPrice = (cart: Cart): number => {
  let sum: number = 0;
  cart.products.forEach((product) => {
    sum += product.amount * product.price;
  });
  return sum;
};

const productQuantity = (cart: Cart) => {
  return cart.products.length;
};

let cart: Cart = { products: [] };

const parsedProducts: Product[] = products as Product[];

parsedProducts.forEach((product) => addProduct(cart, product));
