import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { cart, removeFromCart, saveToLocalStorage } from "../data/cart.js";
import formatPrice from "./Utils/money.js";
import { deliveryOptions } from "./deliveryOption.js";

let cartSummary = "";

function renderCart() {
	function deliveryDateRender (cartItem)  {
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
            data-cart-item="${cartItem.productId}"
            class="delivery-option-input"
            name="delivery-option-input-${cartItem.productId}">
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
    let deliHtml = deliveryDateRender(cartItem)
    let selectedOption;
		deliveryOptions.forEach((option) => {
			if (option.id === cartItem.deliveryOptionId) {
				selectedOption = option;
			}
		});
		if (selectedOption) {
      selectedOption = dayjs()
      .add(selectedOption.day, "days")
      .format("dddd, MMMM DD");
		}
    console.log(selectedOption);

			cartSummary += `
      <div class="cart-item-container-${cartItem.productId} border">
              <div class="delivery-date">
                ${selectedOption}
              </div>
    
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${cartItem.image}">
    
                <div class="cart-item-details">
                  <div class="product-name">
                  ${cartItem.name}
                  </div>
                  <div class="product-price">
                  $ ${formatPrice(cartItem.priceCents)}
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
						cartItem.productId
					}">
                      Delete
                    </span>
                  </div>
                </div>
    
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliHtml}
                </div>
              </div>
          </div>
      `;    
	});
}
renderCart();

document.querySelector(".order-summary").innerHTML = cartSummary;
const deleteButtons = document.querySelectorAll(".delete-quantity-link");
document.querySelectorAll(".delivery-option-input").forEach((radio) => {
	radio.addEventListener("click", () => {
		cart.forEach((item) => {
      if(item.productId === radio.dataset.cartItem) {
				item.deliveryOptionId = radio.dataset.deliveryId;
      }
		});
		saveToLocalStorage(cart);
		renderCart();
    // console.log(cart);
	});
});

deleteButtons.forEach((button) => {
	button.addEventListener("click", () => {
		let productId = button.dataset.productId;
		removeFromCart(productId);
		document.querySelector(`.cart-item-container-${productId}`).remove();
	});
});
