import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // checking if cartItems is empty. Print message saying the cart is empty if it is.
  if (cartItems.length == 0) {
    document.querySelector('.product-list').innerHTML = `Theres nothing in your cart!`;
    const returnBtn = document.createElement('a');
    returnBtn.id = 'addToCart';
  }
  else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    displayTotal(cartItems);
  }
}

function displayTotal(items) {
  // ---------- getting total element from DOM and turning on ----------
  const totalDiv = document.querySelector('.cart-footer.hide');
  totalDiv.style.display = 'block';

  // ---------- calculating total and adding to DOM ----------
  // getting p element for total form DOM
  const totalP = document.querySelector('.cart-total');

  // going through each element and calculating the total
  let total = 0;
  items.forEach(item => {
    total += item.FinalPrice;
  });

  // adding total to page
  totalP.textContent += ` $${total}`;
}

export function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  const badge = document.getElementById('cart-count');
  
  if (badge) {
    badge.textContent = cartItems.length;
    // Optional: Hide badge if cart is empty
    badge.style.display = cartItems.length > 0 ? 'flex' : 'none';
  }
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
