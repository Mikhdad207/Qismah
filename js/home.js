/* home.js - the home page: free-delivery text, featured products and bestsellers */

/* "Free delivery over ৳8,000" comes from the delivery settings in products.js */
document.getElementById("freeDeliveryText").textContent = "Free delivery over " + formatPrice(shippingConfig.freeThreshold);

/* Featured: the first four products marked featured */
const featuredProducts = products.filter(function (product) {
  return product.featured;
}).slice(0, 4);
showProducts(document.getElementById("featuredProducts"), featuredProducts);

/* Bestsellers: every product marked bestSeller */
const bestSellers = products.filter(function (product) {
  return product.bestSeller;
});
showProducts(document.getElementById("bestSellers"), bestSellers);

/* Three collection photos, built from the "collections" list in products.js */
let tiles = "";
Object.keys(collections).forEach(function (key) {
  const collection = collections[key];
  tiles +=
    '<a href="collections.html#' + key + '" class="collection-tile img-zoom">' +
      '<img src="' + collection.image + '" alt="' + collection.name + '" loading="lazy">' +
      '<div class="collection-tile-shade"></div>' +
      '<div class="collection-tile-text">' +
        '<p class="eyebrow">Collection</p>' +
        '<h3>' + collection.name + '</h3>' +
        '<p class="muted">' + collection.tagline + '</p>' +
      '</div>' +
    '</a>';
});
document.getElementById("collectionStrip").innerHTML = tiles;

/* One button for each fragrance family, linking to the filtered shop */
let familyButtons = "";
fragranceFamilies.forEach(function (family) {
  familyButtons += '<a href="shop.html?family=' + family + '" class="button button-outline">' + family + '</a>';
});
document.getElementById("familyButtons").innerHTML = familyButtons;
