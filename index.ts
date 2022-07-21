const products = require("./data/products.json");

interface Product {
  name: string;
  description: string;
  price: number;
  image: URL;
  limit: number;
  amount: number;
}

interface Cart {
  products: Product[];
}

const addProduct = (cart: Cart, product: Product) => {
  cart.products.push(product);
};

const removeProduct = (cart: Cart, productToRemove: Product) => {
  cart.products.forEach((product, i) => {
    if (product.name === productToRemove.name) cart.products.splice(i, 1);
  });
};

const updateProductAmount = (
  cart: Cart,
  productToChangeAmount: Product,
  amount: number
) => {
  cart.products.forEach((product, i) => {
    if (product.name === productToChangeAmount.name) product.amount = amount;
  });
};

const checkout = (cart: Cart) => {
  cart.products = [];
};

const totalPrice = (cart: Cart): number => {
  let sum: number = 0;
  cart.products.forEach((product, i) => {
    sum += product.amount * product.price;
  });
  return sum;
};

const productQuantity = (cart: Cart) => {
  return cart.products.length;
};

let cart: Cart = { products: [] };

const parsedProducts: Product[] = products;

for (let i = 0; i < parsedProducts.length; i++) {
  addProduct(cart, parsedProducts[i]);
}

console.log(totalPrice(cart));
