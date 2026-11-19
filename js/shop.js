/* shop.js - the Shop page: family filter buttons, sorting and the product grid.
   The filter and sort are kept in the address, e.g. shop.html?family=Oud&sort=price-asc */

const sortOptions = ["featured", "price-asc", "price-desc", "new"];

/* Read the chosen family and sort from the address (ignore anything unknown) */
let chosenFamily = getQueryValue("family");
if (!fragranceFamilies.includes(chosenFamily)) {
  chosenFamily = null;
}
let chosenSort = getQueryValue("sort");
if (!sortOptions.includes(chosenSort)) {
  chosenSort = "featured";
}

/* Build a shop address for a family + sort choice */
function shopAddress(family, sort) {
  let address = "shop.html?";
  if (family) {
    address += "family=" + encodeURIComponent(family) + "&";
  }
  return address + "sort=" + sort;
}

/* Draw the "All / Oud / Floral..." buttons */
function drawFilterButtons() {
  let html = '<a href="' + shopAddress(null, chosenSort) + '"' + (chosenFamily ? "" : ' class="active"') + '>All</a>';
  fragranceFamilies.forEach(function (family) {
    const active = family === chosenFamily ? ' class="active"' : "";
    html += '<a href="' + shopAddress(family, chosenSort) + '"' + active + '>' + family + '</a>';
  });
  document.getElementById("filterChips").innerHTML = html;
}

/* Get the products for the chosen family, in the chosen order */
function getShopList() {
  const list = products.filter(function (product) {
    return !chosenFamily || product.family === chosenFamily;
  });
  if (chosenSort === "price-asc") {
    list.sort(function (a, b) { return currentPrice(a) - currentPrice(b); });
  }
  if (chosenSort === "price-desc") {
    list.sort(function (a, b) { return currentPrice(b) - currentPrice(a); });
  }
  if (chosenSort === "new") {
    list.sort(function (a, b) { return Number(!!b.newArrival) - Number(!!a.newArrival); });
  }
  return list;
}

/* Draw the count and the product grid */
function drawShopList() {
  const list = getShopList();
  const grid = document.getElementById("shopGrid");
  document.getElementById("resultCount").textContent = list.length + " fragrance" + (list.length !== 1 ? "s" : "");

  if (list.length === 0) {
    grid.className = "";
    grid.innerHTML = '<p class="empty-message">No fragrances in this family yet.</p>';
    return;
  }
  grid.className = "product-grid three-columns wide-rows";
  showProducts(grid, list);
}

/* Changing the sort menu reloads the page with the new sort */
const sortMenu = document.getElementById("sortMenu");
sortMenu.value = chosenSort;
sortMenu.addEventListener("change", function () {
  window.location.href = shopAddress(chosenFamily, sortMenu.value);
});

drawFilterButtons();
drawShopList();
