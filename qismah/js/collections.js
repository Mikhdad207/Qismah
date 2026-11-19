/* collections.js - the Collections page: one block per collection with its products */

const collectionList = document.getElementById("collectionList");
let blocks = "";

Object.keys(collections).forEach(function (key, index) {
  const collection = collections[key];
  /* Every second collection has the photo on the right */
  const flipClass = index % 2 ? " flip" : "";
  blocks +=
    '<section class="collection-block' + flipClass + '" id="' + key + '">' +
      '<div class="collection-intro">' +
        '<img src="' + collection.image + '" alt="' + collection.name + '" loading="lazy">' +
        '<div>' +
          '<p class="eyebrow">Collection 0' + (index + 1) + '</p>' +
          '<h2>' + collection.name + '</h2>' +
          '<p class="muted">' + collection.tagline + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="product-grid three-columns" data-collection="' + key + '"></div>' +
    '</section>';
});
collectionList.innerHTML = blocks;

/* Put the products of each collection into its grid */
document.querySelectorAll("[data-collection]").forEach(function (grid) {
  const list = products.filter(function (product) {
    return product.collection === grid.dataset.collection;
  });
  showProducts(grid, list);
});

/* Links like collections.html#nocturne jump to that collection */
if (window.location.hash) {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target) {
    target.scrollIntoView();
  }
}
