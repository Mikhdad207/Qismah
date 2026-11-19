# Qismah – Luxury Fragrance Website

A small online perfume shop for Qismah, a fragrance house in Bangladesh.
Visitors can browse the fragrances, filter and sort them, save favourites to a wishlist,
add bottles to a bag and go through a demo checkout (no real payment is taken).

Built with plain HTML, CSS (Flexbox and Grid), Bootstrap 5 and JavaScript.
No install and no build step.

## How to run it

Double-click `index.html`. That's all.

Tip: the bag and wishlist are saved in the browser. If you open the files by double-clicking
and the bag doesn't carry from page to page (some browsers, such as Firefox, do this),
use a free local server such as the VS Code "Live Server" extension, or upload the
folder to any web host.
The fonts come from Google Fonts, so they need an internet connection.

## What each file does

```
index.html          Home page
shop.html           All fragrances, with filter and sort
collections.html    The three collections
product.html        One template for every product (?slug=oud-noir)
cart.html           The bag
checkout.html       Demo checkout
wishlist.html       Saved favourites
search.html         Search results
about.html          About the house
contact.html        Contact page (demo form)
faq.html            Questions and answers
privacy.html        Privacy policy (placeholder text)
terms.html          Terms (placeholder text)
404.html            Page not found
robots.txt          Tells search engines what to index

css/style.css       All my styles (colours at the top)
css/bootstrap.min.css   Bootstrap 5 (not edited)

js/products.js      Products, collections, delivery fees, contact details
js/cart.js          Bag and wishlist (saved in the browser)
js/site.js          Header, search, mobile menu, cart drawer, product cards
js/home.js, shop.js, collections.js, product.js,
cart-page.js, checkout.js, wishlist.js, search.js,
contact.js, faq.js  One small script for each page
js/bootstrap.bundle.min.js   Bootstrap's JavaScript (not edited)

images/             Photos, logo, mark and favicon
```

## How to change common things

**Products** – open `js/products.js` and edit the list called `products`.
Copy one product block to add a new one. Fields: name, slug (used in the web address),
collection, family, price, salePrice (optional), images, notes, stockStatus.
Set `featured: true` to show it on the home page, `bestSeller: true` for the bestsellers row,
`newArrival: true` for the "New" label.

**Prices and delivery fees** – in `js/products.js`, see `shippingConfig`.

**Phone, WhatsApp and email** – in `js/products.js`, see `contactDetails`.
Currently placeholders.

**Colours** – top of `css/style.css`, in the `:root { ... }` block.

**Menu links** – the `<nav>` in the header of each page (and the mobile menu just below it).
The same header and footer are repeated in every HTML file, so change them in each file.

**Images** – replace the files in `images/` using the same file names,
or point the product to a new file in `products.js`.

**Page title and description (SEO)** – the `<title>` and `<meta name="description">`
at the top of each HTML file. Product pages set theirs in `js/product.js`.
