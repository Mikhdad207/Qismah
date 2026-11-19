/* =====================================================================
   products.js - all the shop data lives here.
   To add or edit a product, change the list called "products" below.
   Prices are in Bangladeshi Taka (BDT).
   ===================================================================== */

/* The three collections shown on the home page and the Collections page */
const collections = {
  signature: { name: "The Signature", tagline: "Defining compositions of the house.", image: "images/hero.jpg" },
  nocturne: { name: "Nocturne", tagline: "Deep, resinous, made for the evening.", image: "images/p-amber.jpg" },
  lumiere: { name: "Lumière", tagline: "Luminous florals and soft musks.", image: "images/p-rose.jpg" }
};

/* The fragrance families used by the shop filter buttons */
const fragranceFamilies = ["Oud", "Floral", "Amber", "Musk", "Fresh"];

/* Every bottle comes in 30, 50 and 100 ml.
   The 50 ml price is the base price; 30 ml is cheaper and 100 ml costs more. */
function makeSizes(basePrice) {
  return [
    { ml: 30, price: Math.round(basePrice * 0.55) },
    { ml: 50, price: basePrice },
    { ml: 100, price: Math.round(basePrice * 1.7) }
  ];
}

/* The products.
   - salePrice: optional, shows an "Offer" label and a crossed-out old price
   - featured / bestSeller / newArrival: decide where the product appears
   - stockStatus: "in_stock", "low_stock" or "out_of_stock" */
const products = [
  {
    id: "q01", name: "Oud Noir", slug: "oud-noir", collection: "signature", family: "Oud",
    shortDescription: "Smoked oud, saffron and dark amber.",
    description: "A slow, smouldering composition built around a heart of oud, lifted by saffron and settling into warm amber and musk. Demonstration description — replace with the official fragrance story.",
    price: 6500, images: ["images/hero.jpg", "images/p-oud.jpg", "images/p-amber.jpg"],
    notes: { top: ["Saffron", "Pink Pepper"], heart: ["Oud", "Rose"], base: ["Amber", "Musk"] },
    sizes: makeSizes(6500), featured: true, bestSeller: true, stockStatus: "in_stock"
  },
  {
    id: "q02", name: "Ambre Doré", slug: "ambre-dore", collection: "nocturne", family: "Amber",
    shortDescription: "Golden amber over sandalwood.",
    description: "Resin and wood in quiet balance — amber warmed by sandalwood and a trace of vanilla. Demonstration description.",
    price: 5800, salePrice: 4950, images: ["images/p-amber.jpg", "images/p-oud.jpg"],
    notes: { top: ["Bergamot"], heart: ["Labdanum", "Jasmine"], base: ["Sandalwood", "Amber", "Vanilla"] },
    sizes: makeSizes(5800), featured: true, bestSeller: true, stockStatus: "low_stock"
  },
  {
    id: "q03", name: "Rose de Minuit", slug: "rose-de-minuit", collection: "lumiere", family: "Floral",
    shortDescription: "Velvet rose, softened with musk.",
    description: "A rose seen by candlelight: dewy petals, a soft spice, and a powdery musk trail. Demonstration description.",
    price: 5200, images: ["images/p-rose.jpg", "images/p-musk.jpg"],
    notes: { top: ["Lychee", "Pink Pepper"], heart: ["Rose", "Peony"], base: ["Musk", "Cashmere Wood"] },
    sizes: makeSizes(5200), featured: true, newArrival: true, stockStatus: "in_stock"
  },
  {
    id: "q04", name: "Musc Blanc", slug: "musc-blanc", collection: "lumiere", family: "Musk",
    shortDescription: "Clean white musk and jasmine.",
    description: "Skin-close and luminous — white musk wrapped in jasmine sambac and a whisper of iris. Demonstration description.",
    price: 4500, images: ["images/p-musk.jpg", "images/p-rose.jpg"],
    notes: { top: ["Neroli"], heart: ["Jasmine", "Iris"], base: ["White Musk", "Ambrette"] },
    sizes: makeSizes(4500), bestSeller: true, stockStatus: "in_stock"
  },
  {
    id: "q05", name: "Safran Bleu", slug: "safran-bleu", collection: "signature", family: "Fresh",
    shortDescription: "Bergamot brightness, saffron depth.",
    description: "Sparkling bergamot meets the warmth of saffron, grounded in vetiver and soft woods. Demonstration description.",
    price: 5500, images: ["images/p-saffron.jpg", "images/hero.jpg"],
    notes: { top: ["Bergamot", "Saffron"], heart: ["Lavender", "Geranium"], base: ["Vetiver", "Cedar"] },
    sizes: makeSizes(5500), featured: true, newArrival: true, stockStatus: "in_stock"
  },
  {
    id: "q06", name: "Bois Sacré", slug: "bois-sacre", collection: "nocturne", family: "Oud",
    shortDescription: "Sacred woods and incense.",
    description: "A meditative blend of agarwood, frankincense and cedar — quiet, deep, lasting. Demonstration description.",
    price: 7200, images: ["images/p-oud.jpg", "images/p-amber.jpg"],
    notes: { top: ["Elemi", "Cardamom"], heart: ["Frankincense", "Oud"], base: ["Cedar", "Sandalwood"] },
    sizes: makeSizes(7200), newArrival: true, stockStatus: "out_of_stock"
  }
];

/* Delivery settings (demonstration values - change the real fees here) */
const shippingConfig = {
  insideDhaka: { label: "Inside Dhaka", fee: 80, eta: "1–2 working days" },
  outsideDhaka: { label: "Outside Dhaka", fee: 150, eta: "3–5 working days" },
  freeThreshold: 8000
};

/* Contact details (placeholders until the real ones are added) */
const contactDetails = {
  whatsapp: "8801XXXXXXXXX",
  phoneDisplay: "+880 1XXX-XXXXXX",
  email: "hello@qismah.example"
};

/* Divisions shown in the checkout address form */
const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"];


/* ---------- Small helper functions ---------- */

/* Find one product by its slug, e.g. "oud-noir". Returns undefined if not found. */
function findProduct(slug) {
  return products.find(function (product) {
    return product.slug === slug;
  });
}

/* The price a customer really pays for a product (sale price if there is one) */
function currentPrice(product) {
  return product.salePrice || product.price;
}

/* Turn 6500 into "৳6,500" */
function formatPrice(amount) {
  return "৳" + amount.toLocaleString("en-IN");
}

/* Check a Bangladeshi mobile number, e.g. 01712345678 or +8801712345678 */
function isValidPhone(text) {
  return /^(?:\+?880|0)1[3-9]\d{8}$/.test(text.replace(/[\s-]/g, ""));
}

/* Make text safe before putting it into HTML (used for the search text) */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Read one value from the page address, e.g. getQueryValue("family") on shop.html?family=Oud */
function getQueryValue(name) {
  return new URLSearchParams(window.location.search).get(name);
}
