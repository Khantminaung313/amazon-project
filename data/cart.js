export let cart = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            deliveryOptionId: "1",
            quantity: 2,
            keywords: [
              "socks",
              "sports",
              "apparel"
            ]
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            deliveryOptionId: "2",
            quantity: 1,
            keywords: [
              "sports",
              "basketballs"
            ]
          },
	  ];

export const updateCart = () => {
	let cartQuantity = 0;
	cart.forEach((cartItem) => {
		cartQuantity += cartItem.quantity;
	});
	document.querySelector(".cart-quantity").innerHTML = cartQuantity;
};
// updateCart();
export let addingToCart = (productId, matchingItem) => {
	cart.forEach((cartItem) => {
		if (cartItem.productId === productId) {
			matchingItem = cartItem;
		}
	});
	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productId: productId,
			quantity: 1,
            deliveryOptionId: 1
		});
	}
	saveToLocalStorage();
};

export const saveToLocalStorage = () => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
	cart = cart.filter((item) => item.productId !== productId);
	saveToLocalStorage();
};
