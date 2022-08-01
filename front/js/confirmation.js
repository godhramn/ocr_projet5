let getCart = JSON.parse(localStorage.getItem("cart"));
localStorage.clear("cart");

let params = new URLSearchParams(window.location.search);
let orderNumber = params.get("id");
let orderId = document.querySelector("#orderId");
orderId.textContent = orderNumber;