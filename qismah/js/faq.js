/* faq.js - fills the delivery answers on the FAQ page from the settings in products.js */

const inside = shippingConfig.insideDhaka;
const outside = shippingConfig.outsideDhaka;

document.getElementById("deliveryAnswer").textContent =
  inside.label + ": " + inside.eta + ". " + outside.label + ": " + outside.eta + ". (Demonstration estimates.)";

document.getElementById("freeDeliveryAnswer").textContent =
  "Orders above " + formatPrice(shippingConfig.freeThreshold) + " receive complimentary delivery (demonstration value).";
