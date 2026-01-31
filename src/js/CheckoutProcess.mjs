import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

function PackageItems(items) {
    // ---------- adding items to the return data ----------
    const returnData = items.map(item => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1
        };
    });

    return returnData;
}
    
function formDataToJSON(form) {
    const formData = new FormData(form);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}


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
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.list.forEach(item => {
            this.itemTotal += item.FinalPrice;
        });

        const subTotal = this.outputSelector.querySelector(`.subAmount`);
        subTotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // tax calcuation
        this.tax = (this.itemTotal * 0.06);

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
        this.orderTotal += this.itemTotal + this.tax + this.shipping;
        console.log(this.orderTotal);

        // displaying the totals
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once totals are all calculated display them in the order summary page
        const tax = this.outputSelector.querySelector(`.taxAmount`);
        const shipping = this.outputSelector.querySelector(`.shippingEstiamte`);
        const total = this.outputSelector.querySelector(`.orderTotal`);
        
        tax.textContent = `$${this.tax.toFixed(2)}`;
        shipping.textContent = `$${this.shipping.toFixed(2)}`;
        total.textContent = `$${this.orderTotal.toFixed(2)}`;
    }


    async checkout() {
        const formElement = document.forms["checkoutFrom"];
        const order = formDataToJSON(formElement);

        //  ---------- adding orderTotal, shipping, and tax to order data ----------
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.shipping = this.shipping.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.items = PackageItems(this.list);

        try {
            const response = await services.checkout(order);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
}




