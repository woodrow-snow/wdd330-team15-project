import { renderListWithTemplate, setLocalStorage } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import { createDeleteEventListener, displayTotal  } from './cart';


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class='remove' title="Remove ${item.Name} from cart" data-id="${item.cartId}">X</button>
    </li>`;

  return newItem;
}

export default class CartList {
    constructor(parentElement, dataLSName) {
        this.dataName = dataLSName;
        this.dataSource = getLocalStorage(this.dataName) || [];
        this.updateCartIds(this.dataSource);
        this.parentElement = parentElement;
    }

    async init() {
        this.dataSource = getLocalStorage(this.dataName) || [];
        this.updateCartIds(this.dataSource)
        this.renderItems(this.dataSource);
    }

    renderItems(itemList) {
        if (itemList.length == 0) {
            document.querySelector('.product-list').innerHTML = `Theres nothing in your cart!`;
            displayTotal(this.dataSource)
        }
        else {
            renderListWithTemplate(cartItemTemplate, this.parentElement, this.dataSource, undefined, true);
            
            document.querySelectorAll('.remove').forEach(b => createDeleteEventListener(b));

            displayTotal(this.dataSource);
        }
    }

    updateCartIds(items) {
        for (let i = 0; i < items.length; i++){
            items[i].cartId = i;
        }

        setLocalStorage(this.dataName, items);
    }
}
