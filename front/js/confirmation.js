let params = new URLSearchParams(window.location.search);
let id = params.get("id");

let orderId = document.querySelector("#orderId");
orderId.textContent = id;