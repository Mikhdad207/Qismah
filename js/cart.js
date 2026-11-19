/* =====================================================================
   cart.js - the shopping bag and the wishlist.
   Both are saved in the visitor's browser (localStorage), so they are
   still there when the visitor moves to another page.
   Needs products.js to be loaded first.
   ===================================================================== */

/* The bag: a list of { slug, ml, qty, price }. The wishlist: a list of slugs. */
let cart = [];
let wishlist = [];

/* Read the saved bag and wishlist when a page opens */
function loadSavedData() {
  try {
    cart = JSON.parse(localStorage.getItem("qismah-cart") || "[]");
    wishlist = JSON.parse(localStorage.getItem("qismah-wishlist") || "[]");
  } catch (error) {
    cart = [];
    wishlist = [];
  }
}

/* Save the bag and wishlist, then update everything on screen */
function saveAndRefresh() {
  try {
    localStorage.setItem("qismah-cart", JSON.stringify(cart));
    localStorage.setItem("qismah-wishlist", JSON.stringify(wishlist));
  } catch (error) {
    /* If the browser blocks saving, the bag still works until the page is closed */
  }
  /* These functions are defined in site.js and in the page scripts */
  updateHeaderCounts();
  updateHearts();
  drawCartDrawer();
  if (typeof refreshPage === "function") {
    refreshPage();
  }
}

/* Add a product to the bag. If the same size is already there, add to its quantity. */
function addToCart(slug, ml, price, qty) {
  const amount = qty || 1;
  const existing = cart.find(function (item) {
    return item.slug === slug && item.ml === ml;
  });
  if (existing) {
    existing.qty += amount;
  } else {
    cart.push({ slug: slug, ml: ml, price: price, qty: amount });
  }
  saveAndRefresh();
  openCartDrawer();
}

/* Change the quantity of one bag line (never lower than 1) */
function setQuantity(slug, ml, qty) {
  const line = cart.find(function (item) {
    return item.slug === slug && item.ml === ml;
  });
  if (line) {
    line.qty = Math.max(1, qty);
    saveAndRefresh();
  }
}

/* Remove one line from the bag */
function removeFromCart(slug, ml) {
  cart = cart.filter(function (item) {
    return !(item.slug === slug && item.ml === ml);
  });
  saveAndRefresh();
}

/* Empty the bag (used after an order is placed) */
function clearCart() {
  cart = [];
  saveAndRefresh();
}

/* Add the product to the wishlist, or take it out if it is already there */
function toggleWishlist(slug) {
  if (wishlist.includes(slug)) {
    wishlist = wishlist.filter(function (item) {
      return item !== slug;
    });
  } else {
    wishlist.push(slug);
  }
  saveAndRefresh();
}

/* Total price of everything in the bag */
function cartSubtotal() {
  return cart.reduce(function (total, item) {
    return total + item.price * item.qty;
  }, 0);
}

/* Total number of bottles in the bag */
function cartCount() {
  return cart.reduce(function (total, item) {
    return total + item.qty;
  }, 0);
}

loadSavedData();
