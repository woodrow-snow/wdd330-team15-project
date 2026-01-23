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
    const totalDiv = document.querySelector('.cart-footer.hide');

  if (items.length == 0) {
    totalDiv.style.display = 'none';
  }
  else {
    // ---------- getting total element from DOM and turning on ----------
    totalDiv.style.display = 'block';

    // ---------- calculating total and adding to DOM ----------
    // getting p element for total form DOM
    const totalP = document.querySelector('.cart-total');

    // clearing any previous totals
    totalP.textContent = '';

    // going through each element and calculating the total
    let total = 0;
    items.forEach(item => {
      total += item.FinalPrice;
    });

    // adding total to page
    totalP.textContent += ` $${total}`;
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

function removeItemFromCart(id) {
  // testing
  console.log(`Id provided: ${id}`);

  // getting cart items
  const cartItems = getLocalStorage("so-cart")
  console.log(`Item at provided ID: ` + cartItems[id]); //testing

  // removing from list
  cartItems.splice(id, 1);
  
  // updating ids
  cartList.updateCartIds(cartItems)

  // re-rendering cart
  cartList.init();
}

export function createDeleteEventListener(element) {
  // adding event listener to delete button
  
  element.addEventListener('click', () => { 
    removeItemFromCart(element.dataset.id);
  });
  console.log('Btn Event listener added');
}

loadHeaderFooter();

const cartList = new CartList(document.querySelector('.product-list'), 'so-cart');

cartList.init();