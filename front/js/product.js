let url = new URL(window.location.href);
let searchParams = new URLSearchParams(url.search);
let productId = searchParams.get("id");

const apiFetch = fetch(`http://localhost:3000/api/products/${productId}`);

apiFetch.then(async function(res) {
  try {
    if (res.ok) {
      let product = await res.json();

      function displayProduct() {

        const itemImage = document.querySelector(".item__img");
        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.altTxt;
        itemImage.appendChild(image);

        const itemName = document.querySelector("#title");
        itemName.textContent = product.name;

        const itemPrice = document.querySelector("#price");
        itemPrice.textContent = product.price;

        const itemDescription = document.querySelector("#description");
        itemDescription.textContent = product.description;

       
        let options = document.querySelector("#colors");
        for (let i = 0; i < product.colors.length; i++) {
          let option = document.createElement("option");
          options.appendChild(option);
          option.value = product.colors[i];
          option.textContent = product.colors[i];
         
        }
        
      }
      displayProduct();
    }
  } catch (e) {
    console.log(e);
  }
})
