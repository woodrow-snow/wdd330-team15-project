import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// getting params form url
const productType = getParam('category')

// creating new instance of product data
const dataSource = new ProductData();

// getting ul elements from DOM
const cardsUl = document.querySelector('.product-list');

const products = new ProductList(productType,dataSource,cardsUl);

products.init();