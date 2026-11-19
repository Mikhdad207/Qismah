/* contact.js - the Contact page. This is a demo form: nothing is sent anywhere. */

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("contactForm").hidden = true;
  document.getElementById("contactThanks").hidden = false;
});
