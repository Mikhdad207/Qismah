/* wishlist.js - the Wishlist page: shows the products the visitor has hearted */

function refreshPage() {
  const list = products.filter(function (product) {
    return wishlist.includes(product.slug);
  });
  const content = document.getElementById("wishlistContent");

  if (list.length === 0) {
    content.innerHTML =
      '<div class="empty-state">' +
        '<p class="big">Nothing saved yet.</p>' +
        '<a href="shop.html" class="button button-outline">Explore fragrances</a>' +
      '</div>';
    return;
  }
  content.innerHTML = '<div class="product-grid three-columns" id="wishlistGrid"></div>';
  showProducts(document.getElementById("wishlistGrid"), list);
}

refreshPage();
