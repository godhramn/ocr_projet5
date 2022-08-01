/*Récupérer l'ID dans l'URL*/
let url = new URL(window.location.href);
let searchParams = new URLSearchParams(url.search);
let productId = searchParams.get("id");

/*Récupérer les informations dans l'API*/
const apiFetch = fetch("http://localhost:3000/api/products/"+`${productId}`);

/*Intégrer le html dans la section item*/
apiFetch.then(async function(res) {
  try {
    if (res.ok) {
      let product = await res.json();

      /* Créer le contenu HTML dans la section .item */

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
      displayProduct(); /* Afficher les informations du produit */
    }
  } catch (e) {
    console.log(e);
  }
})

/* Stocker les produits ajoutés dans le Panier */

let getCart = JSON.parse(localStorage.getItem("cart"));
console.log(getCart);

function saveInCart() {

  let cart = JSON.parse(localStorage.getItem("cart"));
  const click = document.querySelector("#addToCart");
  click.addEventListener("click", saveValues);

  function saveValues() {
    const option = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    const productInfo = {
      id: productId,
      color : option,
      quantity: parseInt(quantity, 10)
    }

    if (cart == null) {
      cart = [];
    }
  
    if (option === "" || parseInt(quantity, 10) < 1) {
      alert("Veuillez renseigner la couleur et la quantité souhaitées");
    } else if (parseInt(quantity, 10) > 100){
      alert("Vous ne pouvez pas commander plus de 100 articles identiques");
    } else if (quantity != parseInt(quantity, 10)) {
      alert("Quantité renseignée incorrecte");
    } else {
      let productInCart = cart.find (element => element.id == productInfo.id && element.color == productInfo.color);
      if (productInCart != undefined && productInCart.quantity + productInfo.quantity <= 100) {
        productInCart.quantity = productInCart.quantity + productInfo.quantity;
      } else if (productInCart != undefined && productInCart.quantity + productInfo.quantity > 100){
        alert("Maximum de 100 articles identiques atteinte");
        productInCart.quantity = "100";
      } else {
        cart.push(productInfo);
      }
      alert(`${quantity} `+"article(s) ajouté(s) au panier");
      window.location.reload()
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }
}

saveInCart();
