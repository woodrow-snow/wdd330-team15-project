import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import CartList from "./ShoppingCart.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];

//   // checking if cartItems is empty. Print message saying the cart is empty if it is.
//   if (cartItems.length == 0) {
//     document.querySelector('.product-list').innerHTML = `Theres nothing in your cart!`;
//     const returnBtn = document.createElement('a');
//     returnBtn.id = 'addToCart';
//   }
//   else {
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");

//     document.querySelectorAll('.remove').forEach(b => createDeleteEventListener(b));

//     displayTotal(cartItems);
//   };
// }

export function displayTotal(items) {
  const totalDiv = document.querySelector(".cart-footer.hide");

  if (!items || items.length === 0) {
    totalDiv.style.display = "none";
  } else {
    // ---------- getting total element from DOM and turning on ----------
    totalDiv.style.display = "block";

    // ---------- calculating total and adding to DOM ----------
    // getting p element for total form DOM
    const totalP = document.querySelector(".cart-total");

    // clearing any previous totals
    const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
    totalP.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// function cartItemTemplate(item) {
//   console.log(item);
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
//   <button class='remove' title="Remove ${item.Name} from cart" data-id="${item.cartId}">X</button>
// </li>`;

//   return newItem;
// }

function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  cartList.updateCartIds(cartItems);
  cartList.init();
}

export function createDeleteEventListener(element) {
  element.addEventListener("click", () => {
    removeItemFromCart(element.dataset.id);
  });
}

loadHeaderFooter();
const cartList = new CartList(
  document.querySelector(".product-list"),
  "so-cart",
);
cartList.init();

export function updateCartCount(count) {
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "block" : "none";
  }
}
