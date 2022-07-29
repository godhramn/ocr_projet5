let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

let arrayQuantity = [];
let prices = [];
let productsId = [];

for (let i = 0; i < cart.length; i++) {
 
  const apiFetch = fetch(`http://localhost:3000/api/products/${cart[i].id}`);
  
  apiFetch.then(async function(res) { 
    try{
      if (res.ok) {
      let products = await res.json();

      /*Afficher les produits*/
      function displayProducts() {

          /*créer les éléments html de la section cart__items*/

          const items = document.querySelector("#cart__items");

          const article = document.createElement("article");
          article.className = "cart__item";
          article.dataset.id = cart[i].id;
          article.dataset.color = cart[i].color;
          
          const itemImg = document.createElement("div");
          itemImg.className = `${article.className}` + "__img";
          
          const image = document.createElement("img");
          image.src = products.imageUrl;
          image.alt = products.altTxt;
          
          const itemContent = document.createElement("div");
          itemContent.className = `${article.className}`+"__content";

          const contentDescription = document.createElement("div");
          contentDescription.className = `${itemContent.className}`+"__description";
          
          const productName = document.createElement("h2");
          productName.textContent = products.name;
          const productColor = document.createElement("p");
          productColor.textContent = cart[i].color;
          const productPrice = document.createElement("p");
          productPrice.textContent = Number(products.price) + " €";

          const contentSettings = document.createElement("div");
          contentSettings.className = `${itemContent.className}` + "__settings";

          const settingsQuantity = document.createElement("div");
          settingsQuantity.className = `${contentSettings.className}` + "__quantity";

          const itemQuantity = document.createElement("p");
          itemQuantity.textContent = "Qté : ";

          const setQuantity = document.createElement("input");
          setQuantity.type = "number";
          setQuantity.className = "itemQuantity";
          setQuantity.name = "itemQuantity";
          setQuantity.min = "1";
          setQuantity.max = "100";
          setQuantity.value = cart[i].quantity;
          setQuantity.textContent = cart[i].quantity;

          const settingsDelete = document.createElement("div");
          settingsDelete.className = `${contentSettings.className}` + "__delete";

          const itemDelete = document.createElement("p");
          itemDelete.className = "deleteItem";
          itemDelete.textContent = "Supprimer";

          function createHTML(){
            items.appendChild(article);
            article.appendChild(itemImg);
            itemImg.appendChild(image);
            article.appendChild(itemContent);
            itemContent.appendChild(contentDescription);
            contentDescription.appendChild(productName);
            contentDescription.appendChild(productColor);
            contentDescription.appendChild(productPrice);
            itemContent.appendChild(contentSettings);
            contentSettings.appendChild(settingsQuantity);
            settingsQuantity.appendChild(itemQuantity);
            settingsQuantity.appendChild(setQuantity);
            contentSettings.appendChild(settingsDelete);
            settingsDelete.appendChild(itemDelete);
          }

          /* Modification de la quantité du produit */

          function changeQuantity(){
            setQuantity.addEventListener("change", updateQuantity);

            function updateQuantity() {
              if (parseInt(setQuantity.value, 10) > 100) {
                alert("Vous ne pouvez pas commander plus de 100 produits de même type")
              } else if (parseInt(setQuantity.value, 10) < 1) {
                alert("Quantité minimum de 1 produit, ou bien veuillez supprimer le produit du panier")
              } else {
                let cart = JSON.parse(localStorage.getItem("cart"));
                cart[i].quantity = Math.floor(setQuantity.value);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location.reload();
              }
            }
          }

          /* Suppression du produit */

          function deleteProduct(){
            itemDelete.addEventListener("click", updateProducts);

            function updateProducts(){
              let cart = JSON.parse(localStorage.getItem("cart"));
              cart.splice(i, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
              window.location.reload();
            }
          }

          /*créer mes éléments html de la section cart__quantity*/
          /* == afficher le total d'articles */

          function displayQuantity() {
            arrayQuantity.push(parseInt(cart[i].quantity));
            const sum = arrayQuantity.reduce((previousValue, currentValue)  => previousValue + currentValue, 0);

            const totalQuantity = document.querySelector("#totalQuantity");
            totalQuantity.textContent = sum;
          }

          /*créer mes éléments html de la section cart__price*/
          /* == afficher le prix total */

          function displayPrice() {
            prices.push(cart[i].quantity * products.price)
            const price = prices.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

            const totalPrice = document.querySelector("#totalPrice");
            totalPrice.textContent = price;
          }

          /* Exécuter les fonctions */
          createHTML();
          changeQuantity();
          deleteProduct();
          displayQuantity();
          displayPrice();
          productsId.push(cart[i].id);
        }
      }
      
      displayProducts();

    } catch (e) {
      console.log(e);
    }
  })
}

/* PASSER LA COMMANDE */

/* vérifier le formulaire */

const clientForm = {
  firstName : document.querySelector("#firstName"),
  lastName : document.querySelector("#lastName"),
  address : document.querySelector("#address"),
  city : document.querySelector("#city"),
  email : document.querySelector("#email")
}

let contact = {
  firstName : clientForm.firstName.value,
  lastName : clientForm.lastName.value,
  address : clientForm.address.value,
  city : clientForm.city.value,
  email : clientForm.email.value
}

const errorMsg = {
  firstName : document.querySelector("#firstNameErrorMsg"),
  lastName : document.querySelector("#lastNameErrorMsg"),
  address : document.querySelector("#addressErrorMsg"),
  city : document.querySelector("#cityErrorMsg"),
  email : document.querySelector("#emailErrorMsg")
}

let textRegExp = new RegExp("^[A-Za-zÀ-ÿ]+$");
let addressRegExp = new RegExp("[A-Za-zÀ-ÿ0-9]+$-'")
let emailRegExp = new RegExp("^\\w+@\\w+.[A-Za-z]+$");


/* Commander */

function placeOrder() {
  const orderClick = document.querySelector("#order");

  orderClick.addEventListener("click", sendOrder)

  function sendOrder() {

    /* Renvoyer des erreurs de saisie ou valider la commande */

    if (cart.length == 0){
      alert("Vous n'avez aucun article dans le panier")
    } else {
      const orderPost = fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(contact, productsId)
        })

        console.log(contact)
        console.log(productsId)
      
      orderPost.then(async function (res) {
        try {
          let order = await res.json();
          console.log(order);
          
          /*localStorage.clear("cart");*/
          /*window.location.href = `../html/confirmation.html?id=${order.orderId}`;*/
          
        } catch (e) {
          console.log(e);
        }
      })
    }
  }
}

placeOrder()
