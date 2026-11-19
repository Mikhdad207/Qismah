/* product.js - the single product page.
   The product comes from the address, e.g. product.html?slug=oud-noir */

const product = findProduct(getQueryValue("slug"));

/* What the visitor has picked on this page */
let imageNumber = 0;   /* which photo is showing */
let sizeNumber = 1;    /* 0 = 30 ml, 1 = 50 ml, 2 = 100 ml */
let quantity = 1;

/* Change the browser tab title and the search-engine description */
function setPageInfo(title, description) {
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
}

/* The size button that is currently chosen */
function chosenSize() {
  return product.sizes[sizeNumber] || product.sizes[0];
}

/* Price of the chosen size. The sale discount only applies to 50 ml. */
function chosenPrice() {
  const size = chosenSize();
  let discount = 0;
  if (product.salePrice && size.ml === 50) {
    discount = product.price - product.salePrice;
  }
  return size.price - discount;
}

/* Draw the small photos on the side */
function drawThumbnails() {
  let html = "";
  product.images.forEach(function (src, index) {
    const active = index === imageNumber ? " active" : "";
    html += '<button class="thumbnail' + active + '" data-image="' + index + '" aria-label="View image ' + (index + 1) + '"><img src="' + src + '" alt=""></button>';
  });
  document.getElementById("thumbnails").innerHTML = html;
}

/* Show the big photo (and replay the fade-in) */
function drawMainPhoto() {
  const photo = document.getElementById("mainPhoto");
  photo.src = product.images[imageNumber];
  photo.classList.remove("fade-up");
  void photo.offsetWidth;
  photo.classList.add("fade-up");
}

/* Draw the 30 / 50 / 100 ml buttons */
function drawSizeButtons() {
  let html = "";
  product.sizes.forEach(function (size, index) {
    const active = index === sizeNumber ? ' class="active"' : "";
    html += '<button data-size="' + index + '"' + active + '>' + size.ml + ' ml</button>';
  });
  document.getElementById("sizeButtons").innerHTML = html;
}

/* Draw the price, and the WhatsApp link for the chosen size */
function drawPrice() {
  const size = chosenSize();
  const price = chosenPrice();
  document.getElementById("currentPrice").textContent = formatPrice(price);
  const oldPrice = document.getElementById("oldPrice");
  oldPrice.hidden = !(price < size.price);
  oldPrice.textContent = formatPrice(size.price);

  const message = "Hello Qismah, I'd like to order " + product.name + " (" + size.ml + " ml).";
  document.getElementById("whatsappLink").href = "https://wa.me/" + contactDetails.whatsapp + "?text=" + encodeURIComponent(message);
}

/* Fill the whole page with this product's details */
function setupProductPage() {
  setPageInfo(
    product.name + " Eau de Parfum — Qismah",
    product.name + ": " + product.shortDescription + " Shop in Bangladesh with cash on delivery."
  );

  document.getElementById("productFamily").textContent = product.family;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("mainPhoto").alt = product.name;
  document.getElementById("lowStock").hidden = product.stockStatus !== "low_stock";
  document.getElementById("wishlistButton").dataset.wish = product.slug;

  const soldOut = product.stockStatus === "out_of_stock";
  const addButton = document.getElementById("addButton");
  addButton.disabled = soldOut;
  addButton.textContent = soldOut ? "Sold out" : "Add to bag";

  document.getElementById("topNotes").textContent = product.notes.top.join(", ");
  document.getElementById("heartNotes").textContent = product.notes.heart.join(", ");
  document.getElementById("baseNotes").textContent = product.notes.base.join(", ");

  document.getElementById("insideDhakaLine").textContent = shippingConfig.insideDhaka.label + ": " + shippingConfig.insideDhaka.eta;
  document.getElementById("outsideDhakaLine").textContent = shippingConfig.outsideDhaka.label + ": " + shippingConfig.outsideDhaka.eta;

  drawThumbnails();
  drawMainPhoto();
  drawSizeButtons();
  drawPrice();

  /* "You may also love": up to three products from the same family or collection */
  const related = products.filter(function (other) {
    return other.slug !== product.slug && (other.family === product.family || other.collection === product.collection);
  }).slice(0, 3);
  if (related.length > 0) {
    document.getElementById("relatedSection").hidden = false;
    showProducts(document.getElementById("relatedProducts"), related);
  }
  updateHearts();
}

/* Shown when the address has no product, or a product that does not exist */
function showNotFound() {
  setPageInfo("Fragrance not found — Qismah", "This fragrance could not be found in the Qismah collection.");
  document.getElementById("productView").hidden = true;
  document.getElementById("notFoundHeading").innerHTML = "<h1>Fragrance not found</h1>";
  document.getElementById("notFoundView").hidden = false;
}

if (product) {
  setupProductPage();
} else {
  showNotFound();
}

/* Clicks on the photos, sizes, quantity and Add to bag */
document.getElementById("thumbnails").addEventListener("click", function (event) {
  const button = event.target.closest("[data-image]");
  if (button) {
    imageNumber = Number(button.dataset.image);
    drawThumbnails();
    drawMainPhoto();
  }
});

document.getElementById("sizeButtons").addEventListener("click", function (event) {
  const button = event.target.closest("[data-size]");
  if (button) {
    sizeNumber = Number(button.dataset.size);
    drawSizeButtons();
    drawPrice();
  }
});

document.getElementById("lessButton").addEventListener("click", function () {
  quantity = Math.max(1, quantity - 1);
  document.getElementById("quantityValue").textContent = quantity;
});

document.getElementById("moreButton").addEventListener("click", function () {
  quantity = quantity + 1;
  document.getElementById("quantityValue").textContent = quantity;
});

document.getElementById("addButton").addEventListener("click", function () {
  addToCart(product.slug, chosenSize().ml, chosenPrice(), quantity);
});
