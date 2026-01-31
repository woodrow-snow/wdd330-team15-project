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
    // ---------- Stopping default action ----------
    event.preventDefault();

    // ---------- validation of form data on client side ----------
    // getting from from DOM
    const form = document.forms[0];

    // checking if form is valid and storing returned bool in var
    const isFormValid = form.checkValidity();
    form.reportValidity();
    // using if to check if form is vaild and taking approiate action
    if (isFormValid) {
        checkout.checkout();
    }
    else {
        
    }
});