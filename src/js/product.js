import { getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const fullProduct = new ProductDetails(productId, dataSource);
fullProduct.init();

// add to cart button event handler
export async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  fullProduct.addProductToCart(product);
}

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
