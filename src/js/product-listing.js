import { getParam, loadHeaderFooter, toTitleCase } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

// getting params form url
const productType = getParam('category');

// ---------- Updating title ----------
// getting title from DOM
const titleSpan = document.getElementById('product-type');

titleSpan.textContent = toTitleCase(productType);

// ---------- creating product list ----------
// creating new instance of product data
const dataSource = new ProductData();

// getting ul elements from DOM
const cardsUl = document.querySelector('.product-list');

const products = new ProductList(productType, dataSource, cardsUl);

products.init();
