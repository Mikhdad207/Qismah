/* cart-page.js - the full "Your Bag" page.
   refreshPage() is called by cart.js every time the bag changes. */

function refreshPage() {
  const content = document.getElementById("cartContent");

  /* Empty bag */
  if (cart.length === 0) {
    content.innerHTML =
      '<div class="empty-state">' +
        '<p class="big">Your bag is empty.</p>' +
        '<a href="shop.html" class="button button-gold">Discover fragrances</a>' +
      '</div>';
    return;
  }

  /* One row for each bottle in the bag */
  let rows = "";
  cart.forEach(function (item) {
    const product = findProduct(item.slug);
    if (!product) {
      return;
    }
    rows +=
      '<li class="cart-row">' +
        '<img src="' + product.images[0] + '" alt="' + product.name + '">' +
        '<div class="cart-row-info">' +
          '<div class="cart-row-top">' +
            '<a class="cart-row-name" href="product.html?slug=' + product.slug + '">' + product.name + '</a>' +
            '<button data-remove data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Remove">' + icon("close", "icon-16 icon-bold") + '</button>' +
          '</div>' +
          '<p class="cart-row-size muted">' + item.ml + ' ml · ' + formatPrice(item.price) + '</p>' +
          '<div class="bag-item-bottom">' +
            '<div class="quantity-box">' +
              '<button data-change-qty="-1" data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Decrease">' + icon("minus", "icon-12 icon-bold") + '</button>' +
              '<span>' + item.qty + '</span>' +
              '<button data-change-qty="1" data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Increase">' + icon("plus", "icon-12 icon-bold") + '</button>' +
            '</div>' +
            '<p>' + formatPrice(item.price * item.qty) + '</p>' +
          '</div>' +
        '</div>' +
      '</li>';
  });

  content.innerHTML =
    '<div class="cart-layout">' +
      '<ul class="cart-list">' + rows + '</ul>' +
      '<aside class="summary-box">' +
        '<h2>Summary</h2>' +
        '<div class="summary-row"><span class="muted">Subtotal</span><span>' + formatPrice(cartSubtotal()) + '</span></div>' +
        '<p class="summary-note muted">Delivery calculated at checkout. Free over ' + formatPrice(shippingConfig.freeThreshold) + '.</p>' +
        '<a href="checkout.html" class="button button-gold button-full">Checkout</a>' +
      '</aside>' +
    '</div>';
}

refreshPage();
