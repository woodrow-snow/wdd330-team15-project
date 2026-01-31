import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubTotal() {
        this.list.forEach(item => {
            this.itemTotal += item.FinalPrice;
        });

        const subTotal = document.querySelector(`${this.outputSelector} .subAmount`);
        subTotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // tax calcuation
        this.tax = (this.item * 0.06);

        // shipping calculation
        for (let i = 0; i < this.list.length; i++) {
            if (i === 0) {
                this.shipping += 10;
            }
            else {
                this.shipping += 2
            }
            
        }

        // order total calcuation
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // displaying the totals
        displayOrderTotals();
    }

    displayOrderTotals() {
        // once totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} .taxAmount`);
        const shipping = document.querySelector(`${this.outputSelector} .shippingEstiamte`);
        const total = document.querySelector(`${this.outputSelector} .orderTotal`);
        
        tax.textContent = `$${this.tax.toFixed(2)}`;
        shipping.textContent = `$${this.shipping.toFixed(2)}`;
        tax.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
};




