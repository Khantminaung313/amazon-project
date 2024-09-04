import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { cart, removeFromCart, saveToLocalStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import formatPrice from "./Utils/money.js";
import { deliveryOptions } from "./deliveryOption.js";

let cartSummary = "";

const deliveryDateRender = (matchingItem, cartItem) => {
	let deliHtml = "";
	deliveryOptions.forEach((deliveryOption) => {
		let priceString =
			deliveryOption.priceCents === 0
				? "Free"
				: "$" + formatPrice(deliveryOption.priceCents) + " - ";
		let dateString = dayjs()
			.add(deliveryOption.day, "days")
			.format("dddd, MMMM DD");
    let deliveryId = deliveryOption.id;
		let isChecked = deliveryId === cartItem.deliveryOptionId;
		deliHtml += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? "checked" : ""}
          data-delivery-id="${deliveryId}"
          data-cart-item="${cartItem.deliveryOptionId}"
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
	});
	return deliHtml;
};

cart.forEach((cartItem) => {
	let matchingItem;
	products.forEach((product) => {
		if (product.id == cartItem.productId) {
			matchingItem = product;
		}
	});

  let selectedOption;
  deliveryOptions.forEach(option => {
    if(option.id === cartItem.deliveryOptionId){
      selectedOption = option;
    }
  })
  if(selectedOption) {
    selectedOption = dayjs()
    .add(selectedOption.day, "days")
    .format("dddd, MMMM DD");
  }

	if (matchingItem) {
		cartSummary += `
    <div class="cart-item-container-${matchingItem.id}">
        <div class="delivery-date display-date-${matchingItem.id}">
            ${displayDate(cartItem, matchingItem)};
            </div>
  
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">
  
              <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                $ ${formatPrice(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
						cartItem.quantity
					}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
						matchingItem.id
					}">
                    Delete
                  </span>
                </div>
              </div>
  
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryDateRender(matchingItem, cartItem)}
              </div>
            </div>
        </div>
    `;
	}
});
document.querySelector(".order-summary").innerHTML = cartSummary;
const deleteButtons = document.querySelectorAll(".delete-quantity-link");
document.querySelectorAll(".delivery-option-input").forEach(radio => {
  radio.addEventListener("click", () => {
    cart.forEach(item => {
      if(item.deliveryOptionId === radio.dataset.cartItem) {
        item.deliveryOptionId = radio.dataset.deliveryId
      }
    })
    saveToLocalStorage(cart);
    deliveryOptions.forEach(option => {
      if(option.id === radio.dataset.deliveryId) {
        let dateString = dayjs().add(option.day, "days").format("dddd, MMMM DD");
        document.querySelector(".delivery-date").innerHTML = "Delivery Date: " + dateString;
      }
    })
  })
})

function displayDate(cartItem, matchingItem) {
  let displayString;
  deliveryOptions.forEach(option => {
    if(option.id === cartItem.deliveryOptionId) {
      let dateString = dayjs().add(option.day, "days").format("dddd, MMMM DD");
      displayString = "Delivery Date: " + dateString;
    }
  })
  // return displayString;
  let itemId = matchingItem.id;
  let text = document.querySelector(`.display-date-${matchingItem.id}`);
  console.log(document.querySelector(`.display-date-${itemId}`));
  console.log("display-date-" + itemId);
}

deleteButtons.forEach((button) => {
	button.addEventListener("click", () => {
		let productId = button.dataset.productId;
		removeFromCart(productId);
		document.querySelector(`.cart-item-container-${productId}`).remove();
	});
});
