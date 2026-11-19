/* search.js - the Search page. The words come from the address, e.g. search.html?q=oud */

const searchText = (getQueryValue("q") || "");
const searchWords = searchText.trim().toLowerCase();

/* Find products whose name, family, description or notes contain the words */
let results = [];
if (searchWords) {
  results = products.filter(function (product) {
    const searchable = [product.name, product.family, product.shortDescription]
      .concat(product.notes.top, product.notes.heart, product.notes.base)
      .join(" ")
      .toLowerCase();
    return searchable.includes(searchWords);
  });
}

/* Title and result count (textContent keeps the typed words safe) */
document.getElementById("searchTitle").textContent = searchText ? "“" + searchText + "”" : "Search";
document.getElementById("searchCount").textContent = results.length + " result" + (results.length !== 1 ? "s" : "");

const searchResults = document.getElementById("searchResults");
if (results.length > 0) {
  searchResults.innerHTML = '<div class="product-grid three-columns" id="searchGrid"></div>';
  showProducts(document.getElementById("searchGrid"), results);
} else {
  searchResults.innerHTML =
    '<div class="empty-state">' +
      '<p class="big medium">Nothing matched. Try “oud”, “rose” or “amber”.</p>' +
      '<a href="shop.html" class="button button-outline">Browse all</a>' +
    '</div>';
}
