/* =====================================================================
   site.js - things every page needs:
   header (scroll, search bar, mobile menu), the cart drawer, wishlist
   hearts, product cards and the footer year.
   Needs products.js, cart.js and Bootstrap's JS to be loaded first.
   ===================================================================== */

/* ---------- Icons ---------- */
/* Small inline SVG icons. Use icon("heart", "icon-16") to get the HTML. */
const iconShapes = {
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>'
};

function icon(name, sizeClass) {
  return '<svg class="icon ' + sizeClass + '" viewBox="0 0 24 24" aria-hidden="true">' + iconShapes[name] + '</svg>';
}


/* ---------- Product card ---------- */
/* Builds the HTML for one product card (used on home, shop, search, wishlist...) */
function productCardHTML(product) {
  const price = currentPrice(product);
  const soldOut = product.stockStatus === "out_of_stock";

  let labels = "";
  if (product.salePrice) {
    labels += '<span class="label-offer">Offer</span>';
  }
  if (product.newArrival) {
    labels += '<span class="label-new">New</span>';
  }
  if (soldOut) {
    labels += '<span class="label-soldout">Sold out</span>';
  }

  let oldPrice = "";
  if (product.salePrice) {
    oldPrice = '<p class="old-price">' + formatPrice(product.price) + '</p>';
  }

  return '' +
    '<article class="product-card">' +
      '<div class="product-photo img-zoom">' +
        '<a href="product.html?slug=' + product.slug + '" aria-label="' + product.name + '">' +
          '<img src="' + product.images[0] + '" alt="' + product.name + '" loading="lazy" width="896" height="1152">' +
        '</a>' +
        '<div class="product-labels">' + labels + '</div>' +
        '<button class="heart-button" data-wish="' + product.slug + '" aria-label="Add to wishlist">' + icon("heart", "icon-16") + '</button>' +
        '<button class="button button-gold quick-add" data-quick-add="' + product.slug + '"' + (soldOut ? " disabled" : "") + '>' +
          (soldOut ? "Sold out" : "Add 50 ml to bag") +
        '</button>' +
      '</div>' +
      '<div class="product-info">' +
        '<div>' +
          '<a class="product-name" href="product.html?slug=' + product.slug + '">' + product.name + '</a>' +
          '<p class="product-short">' + product.shortDescription + '</p>' +
        '</div>' +
        '<div class="product-price">' +
          '<p>' + formatPrice(price) + '</p>' + oldPrice +
        '</div>' +
      '</div>' +
    '</article>';
}

/* Fill a container with a grid of product cards */
function showProducts(container, list) {
  container.innerHTML = list.map(productCardHTML).join("");
  updateHearts();
}


/* ---------- Header counts and wishlist hearts ---------- */
/* Show the small numbers on the heart and bag icons */
function updateHeaderCounts() {
  const wishlistBadge = document.getElementById("wishlistCount");
  const cartBadge = document.getElementById("cartCount");
  wishlistBadge.textContent = wishlist.length;
  wishlistBadge.hidden = wishlist.length === 0;
  cartBadge.textContent = cartCount();
  cartBadge.hidden = cartCount() === 0;
}

/* Make every heart button gold if its product is in the wishlist */
function updateHearts() {
  document.querySelectorAll("[data-wish]").forEach(function (button) {
    const liked = wishlist.includes(button.dataset.wish);
    button.classList.toggle("is-liked", liked);
    if (button.classList.contains("heart-button")) {
      button.setAttribute("aria-label", liked ? "Remove from wishlist" : "Add to wishlist");
    }
  });
}


/* ---------- Cart drawer ---------- */
/* Slide the bag in from the right (uses Bootstrap's offcanvas) */
function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
}

/* Redraw what is inside the drawer: either "empty" or the list of bottles */
function drawCartDrawer() {
  const body = document.getElementById("drawerBody");

  if (cart.length === 0) {
    body.innerHTML =
      '<div class="drawer-empty">' +
        '<p>Your bag is empty.</p>' +
        '<a href="shop.html" class="button button-outline">Discover fragrances</a>' +
      '</div>';
    return;
  }

  const remaining = shippingConfig.freeThreshold - cartSubtotal();
  let note = '<span class="gold">You qualify for complimentary delivery.</span>';
  if (remaining > 0) {
    note = "Add " + formatPrice(remaining) + " more for complimentary delivery.";
  }

  let lines = "";
  cart.forEach(function (item) {
    const product = findProduct(item.slug);
    if (!product) {
      return;
    }
    lines +=
      '<li class="bag-item">' +
        '<img src="' + product.images[0] + '" alt="' + product.name + '">' +
        '<div class="bag-item-info">' +
          '<div class="bag-item-top">' +
            '<p class="bag-item-name">' + product.name + '</p>' +
            '<button class="remove-button" data-remove data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Remove">' + icon("close", "icon-16 icon-bold") + '</button>' +
          '</div>' +
          '<p class="bag-item-size">' + item.ml + ' ml · Eau de Parfum</p>' +
          '<div class="bag-item-bottom">' +
            '<div class="quantity-box">' +
              '<button data-change-qty="-1" data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Decrease">' + icon("minus", "icon-12 icon-bold") + '</button>' +
              '<span>' + item.qty + '</span>' +
              '<button data-change-qty="1" data-slug="' + item.slug + '" data-ml="' + item.ml + '" aria-label="Increase">' + icon("plus", "icon-12 icon-bold") + '</button>' +
            '</div>' +
            '<p class="bag-item-price">' + formatPrice(item.price * item.qty) + '</p>' +
          '</div>' +
        '</div>' +
      '</li>';
  });

  body.innerHTML =
    '<div class="drawer-note">' + note + '</div>' +
    '<ul class="drawer-items">' + lines + '</ul>' +
    '<div class="drawer-footer">' +
      '<div class="subtotal-row"><span class="muted">Subtotal</span><span>' + formatPrice(cartSubtotal()) + '</span></div>' +
      '<a href="checkout.html" class="button button-gold button-full">Checkout</a>' +
      '<a href="cart.html" class="button button-outline button-full">View bag</a>' +
    '</div>';
}


/* ---------- Clicks on buttons that are created by JavaScript ---------- */
/* One listener for the whole page: heart buttons, quick-add buttons,
   quantity buttons and remove buttons (in the drawer and on the cart page). */
document.addEventListener("click", function (event) {
  const heart = event.target.closest("[data-wish]");
  if (heart) {
    toggleWishlist(heart.dataset.wish);
    return;
  }

  const quickAdd = event.target.closest("[data-quick-add]");
  if (quickAdd) {
    const product = findProduct(quickAdd.dataset.quickAdd);
    addToCart(product.slug, 50, currentPrice(product), 1);
    return;
  }

  const remove = event.target.closest("[data-remove]");
  if (remove) {
    removeFromCart(remove.dataset.slug, Number(remove.dataset.ml));
    return;
  }

  const changeQty = event.target.closest("[data-change-qty]");
  if (changeQty) {
    const ml = Number(changeQty.dataset.ml);
    const line = cart.find(function (item) {
      return item.slug === changeQty.dataset.slug && item.ml === ml;
    });
    if (line) {
      setQuantity(line.slug, ml, line.qty + Number(changeQty.dataset.changeQty));
    }
  }
});


/* ---------- Header behaviour ---------- */
/* Give the header a soft background once the page has been scrolled a little */
function updateHeaderOnScroll() {
  document.getElementById("siteHeader").classList.toggle("is-scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateHeaderOnScroll);

/* Search bar: the magnifier button shows and hides it */
const searchBar = document.getElementById("searchBar");
document.getElementById("searchToggle").addEventListener("click", function () {
  searchBar.hidden = !searchBar.hidden;
  if (!searchBar.hidden) {
    searchBar.querySelector("input").focus();
  }
});

/* Mobile menu: the burger button opens it, the X closes it */
const mobileMenu = document.getElementById("mobileMenu");
document.getElementById("openMenu").addEventListener("click", function () {
  mobileMenu.hidden = false;
});
document.getElementById("closeMenu").addEventListener("click", function () {
  mobileMenu.hidden = true;
});

/* Both search forms (desktop and mobile) send the visitor to the search page */
document.querySelectorAll(".search-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = form.querySelector("input").value;
    window.location.href = "search.html?q=" + encodeURIComponent(text);
  });
});

/* Bag icon in the header opens the drawer */
document.getElementById("openCart").addEventListener("click", openCartDrawer);


/* ---------- Start-up ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
updateHeaderOnScroll();
updateHeaderCounts();
drawCartDrawer();

/* Fill in the phone, email and WhatsApp link from products.js, so the
   contact details only have to be changed in one place */
document.querySelectorAll("[data-contact]").forEach(function (element) {
  const kind = element.dataset.contact;
  if (kind === "whatsapp") {
    element.href = "https://wa.me/" + contactDetails.whatsapp;
  } else if (kind === "phone") {
    element.textContent = contactDetails.phoneDisplay;
  } else if (kind === "email") {
    element.textContent = contactDetails.email;
  }
});
