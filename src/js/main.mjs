import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartBadge } from "./utils.mjs";

// update cart badge on page load
updateCartBadge();

// load header and footer partials
loadHeaderFooter();

// creating new instance of product data
const products = new ProductData('tents');

// getting ul elements from DOM
const cardsUl = document.querySelector('.product-list');

const tentProducts = new ProductList('tent',products,cardsUl);

tentProducts.init();
