import { loadHeaderFooter } from './utils.mjs';



loadHeaderFooter();

const checkoutButton = document.querySelector('#checkout-btn');

// Add the click event listener
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}
