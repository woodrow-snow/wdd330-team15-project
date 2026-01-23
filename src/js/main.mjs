import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// creating new instance of product data
const products = new ProductData('tents');

// getting ul elements from DOM
const cardsUl = document.querySelector('.product-list');

const tentProducts = new ProductList('tent',products,cardsUl);

tentProducts.init();

loadHeaderFooter();