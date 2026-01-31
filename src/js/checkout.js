import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// creating new checkoutprocess object
const checkout = new CheckoutProcess('so-cart', document.querySelector('#orderInfo'));

// running init in checkout
checkout.init();

const zipField = document.querySelector('#zip');
zipField.addEventListener('blur', () => {
    checkout.calculateOrderTotal();
});


// ---------- adding event listener to submit button ----------\
const checkoutBtn = document.querySelector('#checkout');

checkoutBtn.addEventListener('click', event => {
    event.preventDefault();
    checkout.checkout();
});