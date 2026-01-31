import { setLocalStorage, getLocalStorage, alertMesssage } from "./utils.mjs";
import { addToCartHandler } from "./product";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        
        
        // completing steps
        this.product = this.dataSource.findProductById(this.productId)
            .then(data => {
                this.renderProductDetails(data); 
                                
                document.getElementById('addToCart')
                    .addEventListener('click', addToCartHandler);
            });
    }

    addProductToCart(product) {
        // getting cart items from localStorage
        const cartItems = getLocalStorage("so-cart") || [];

        // adding cart id to product
        product.cartId = -1;

        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);

        alertMesssage('Item has been added to cart', true);
    }

    renderProductDetails(data) {
        // ---------- getting title from DOM and setting textContent ----------
        // This is what the orignial title looked like: "Sleep Outside | North Face Talus 4-person tent

        const title = document.querySelector('title');
        const tName = data.Name;

        // setting title content
        title.textContent = `Sleep Outside | ${tName}`;

        // ---------- getting template from DOM and cloneing ----------
        const template = document.getElementById('product-details-page');
        const clone = template.content.cloneNode(true);

        // getting elements from clone
        const [h3, h2, img, price, color, descript, btn] = clone.querySelectorAll("h3, h2, img, .product-card__price, .product__color, .product__description, #addToCart");

        // adding information to selected elements
        h3.textContent = data.Brand.Name;
        h2.textContent = data.NameWithoutBrand;
        img.src = data.Images.PrimaryMedium;
        img.alt = data.NameWithoutBrand;
        price.textContent = data.ListPrice;
        color.textContent = data.Colors.ColorName;
        descript.innerHTML = data.DescriptionHtmlSimple;
        btn.dataset.id = data.Id;

        // getting other elements of picture tag
        const [imgM, imgL] = clone.querySelectorAll("#picture-medium, #picture-large");

        // const imgL = clone.querySelector("#picture-large");
        imgM.srcset = data.Images.PrimaryLarge;
        imgL.srcset = data.Images.PrimaryExtraLarge;

        // ---------- adding template clone to page ----------
        document.querySelector('main').appendChild(clone);
    }
}