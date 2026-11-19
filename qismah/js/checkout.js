/* checkout.js - the checkout page.
   This is a demo checkout: no real payment is taken and nothing is sent. */

const paymentChoices = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "card", label: "Card" }
];

let chosenZone = "insideDhaka";   /* or "outsideDhaka" */
let chosenPayment = "cod";
let orderNumber = "";             /* filled in once the order is placed */

const checkoutMain = document.getElementById("checkoutMain");
const checkoutMessage = document.getElementById("checkoutMessage");

/* Fill the Division drop-down */
function fillDivisions() {
  let html = '<option value="" disabled selected>Division</option>';
  divisions.forEach(function (name) {
    html += "<option>" + name + "</option>";
  });
  document.getElementById("divisionMenu").innerHTML = html;
}

/* Draw the two delivery choices (Inside / Outside Dhaka) */
function drawZoneChoices() {
  let html = "";
  ["insideDhaka", "outsideDhaka"].forEach(function (zone) {
    const info = shippingConfig[zone];
    html +=
      '<label class="choice-box" data-zone="' + zone + '">' +
        '<input type="radio" name="zone" class="visually-hidden"' + (zone === chosenZone ? " checked" : "") + '>' +
        '<p class="zone-name">' + info.label + '</p>' +
        '<p class="zone-info muted">' + info.eta + ' · ' + formatPrice(info.fee) + '</p>' +
      '</label>';
  });
  document.getElementById("zoneChoices").innerHTML = html;
}

/* Draw the four payment choices */
function drawPaymentChoices() {
  let html = "";
  paymentChoices.forEach(function (choice) {
    html +=
      '<label class="choice-box payment-box" data-payment="' + choice.id + '">' +
        '<input type="radio" name="pay" class="visually-hidden"' + (choice.id === chosenPayment ? " checked" : "") + '>' +
        choice.label +
      '</label>';
  });
  document.getElementById("paymentChoices").innerHTML = html;
}

/* Highlight the selected delivery and payment boxes */
function markSelectedChoices() {
  document.querySelectorAll("[data-zone]").forEach(function (box) {
    box.classList.toggle("selected", box.dataset.zone === chosenZone);
  });
  document.querySelectorAll("[data-payment]").forEach(function (box) {
    box.classList.toggle("selected", box.dataset.payment === chosenPayment);
  });
}

/* Delivery fee: free above the threshold, otherwise depends on the zone */
function deliveryFee() {
  if (cartSubtotal() >= shippingConfig.freeThreshold) {
    return 0;
  }
  return shippingConfig[chosenZone].fee;
}

/* Draw the "Your order" box on the right */
function drawOrderSummary() {
  let lines = "";
  cart.forEach(function (item) {
    const product = findProduct(item.slug);
    if (!product) {
      return;
    }
    lines +=
      '<li class="order-line">' +
        '<img src="' + product.images[0] + '" alt="">' +
        '<div><p>' + product.name + '</p><p class="help-text">' + item.ml + ' ml × ' + item.qty + '</p></div>' +
        '<p>' + formatPrice(item.price * item.qty) + '</p>' +
      '</li>';
  });
  document.getElementById("orderLines").innerHTML = lines;

  const fee = deliveryFee();
  document.getElementById("orderSubtotal").textContent = formatPrice(cartSubtotal());
  document.getElementById("orderDelivery").textContent = fee ? formatPrice(fee) : "Complimentary";
  document.getElementById("orderTotal").textContent = formatPrice(cartSubtotal() + fee);
}

/* Show a message instead of the form (empty bag, or order placed) */
function showMessage(html) {
  checkoutMain.hidden = true;
  checkoutMessage.innerHTML = html;
}

/* Called by cart.js whenever the bag changes */
function refreshPage() {
  if (orderNumber) {
    showMessage(
      '<div class="thank-you fade-up">' +
        '<p class="eyebrow">Order ' + orderNumber + '</p>' +
        '<h1>Thank you for choosing Qismah.</h1>' +
        '<p class="muted">Demo order — no real payment has been processed.</p>' +
        '<a href="shop.html" class="button button-outline">Continue shopping</a>' +
      '</div>'
    );
    return;
  }
  if (cart.length === 0) {
    showMessage(
      '<div class="empty-state tall">' +
        '<p class="big">Your bag is empty.</p>' +
        '<a href="shop.html" class="button button-gold">Shop fragrances</a>' +
      '</div>'
    );
    return;
  }
  drawOrderSummary();
}

/* Clicking a delivery or payment box */
document.getElementById("zoneChoices").addEventListener("change", function (event) {
  const box = event.target.closest("[data-zone]");
  if (box) {
    chosenZone = box.dataset.zone;
    markSelectedChoices();
    drawOrderSummary();
  }
});
document.getElementById("paymentChoices").addEventListener("change", function (event) {
  const box = event.target.closest("[data-payment]");
  if (box) {
    chosenPayment = box.dataset.payment;
    markSelectedChoices();
  }
});

/* Placing the order: check the phone number, make an order number, empty the bag */
document.getElementById("checkoutForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const phoneField = document.getElementById("phoneField");
  const errorText = document.getElementById("phoneError");

  if (!isValidPhone(phoneField.value)) {
    errorText.textContent = "Please enter a valid Bangladeshi mobile number, e.g. 01712345678.";
    errorText.hidden = false;
    phoneField.setAttribute("aria-invalid", "true");
    return;
  }
  errorText.hidden = true;
  phoneField.removeAttribute("aria-invalid");

  orderNumber = "QSM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  clearCart();
});

fillDivisions();
drawZoneChoices();
drawPaymentChoices();
markSelectedChoices();
refreshPage();
