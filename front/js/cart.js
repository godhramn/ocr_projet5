let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

let arrayQuantity = [];
let prices = [];

for (let i = 0; i < cart.length; i++) {
 
  const apiFetch = fetch(`http://localhost:3000/api/products/${cart[i].id}`);
  
  apiFetch.then(async function(res) { 
    try{
      if (res.ok) {
      let products = await res.json();

      /*Afficher les produits*/
      function displayProducts() {

          /*créer mes éléments html de la section cart__items*/

          const items = document.querySelector("#cart__items");

          const article = document.createElement("article");
          article.className = "cart__item";
          article.dataset.id = cart[i].id;
          article.dataset.color = cart[i].color;
          items.appendChild(article);
          
          const itemImg = document.createElement("div");
          itemImg.className = `${article.className}` + "__img";
          article.appendChild(itemImg);
          
          const image = document.createElement("img");
          image.src = products.imageUrl;
          image.alt = products.altTxt;
          itemImg.appendChild(image);
          
          const itemContent = document.createElement("div");
          itemContent.className = `${article.className}`+"__content";
          article.appendChild(itemContent);

          const contentDescription = document.createElement("div");
          contentDescription.className = `${itemContent.className}`+"__description";
          itemContent.appendChild(contentDescription);
          
          const productName = document.createElement("h2");
          productName.textContent = products.name;
          const productColor = document.createElement("p");
          productColor.textContent = cart[i].color;
          const productPrice = document.createElement("p");
          productPrice.textContent = Number(products.price) + " €";
          contentDescription.appendChild(productName);
          contentDescription.appendChild(productColor);
          contentDescription.appendChild(productPrice);

          const contentSettings = document.createElement("div");
          contentSettings.className = `${itemContent.className}` + "__settings";
          itemContent.appendChild(contentSettings);

          const settingsQuantity = document.createElement("div");
          settingsQuantity.className = `${contentSettings.className}` + "__quantity";
          contentSettings.appendChild(settingsQuantity);

          const itemQuantity = document.createElement("p");
          itemQuantity.textContent = "Qté : ";
          settingsQuantity.appendChild(itemQuantity);

          const setQuantity = document.createElement("input");
          setQuantity.type = "number";
          setQuantity.className = "itemQuantity";
          setQuantity.name = "itemQuantity";
          setQuantity.min = "1";
          setQuantity.max = "100";
          setQuantity.value = cart[i].quantity;
          setQuantity.textContent = cart[i].quantity;
          settingsQuantity.appendChild(setQuantity);

          const settingsDelete = document.createElement("div");
          settingsDelete.className = `${contentSettings.className}` + "__delete";
          contentSettings.appendChild(settingsDelete);

          const itemDelete = document.createElement("p");
          itemDelete.className = "deleteItem";
          itemDelete.textContent = "Supprimer";
          settingsDelete.appendChild(itemDelete);

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
                cart[i].quantity = setQuantity.value;
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location.reload();
              }
            }
          }
          changeQuantity();

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

          deleteProduct()

          /*créer mes éléments html de la section cart__quantity*/
          /* == afficher le total d'articles */

          function displayQuantity() {
            arrayQuantity.push(cart[i].quantity);
            const sum = arrayQuantity.reduce((previousValue, currentValue)  => previousValue + currentValue, 0);

            const totalQuantity = document.querySelector("#totalQuantity");
            totalQuantity.textContent = parseInt(sum);
          }

          displayQuantity()

          /*créer mes éléments html de la section cart__price*/
          /* == afficher le prix total */

          function displayPrice() {
            prices.push(cart[i].quantity * products.price)
            const price = prices.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

            const totalPrice = document.querySelector("#totalPrice");
            totalPrice.textContent = price;
          }
          displayPrice()
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

const clientInfo = {
  firstName : document.querySelector("#firstName"),
  lastName : document.querySelector("#lastName"),
  address : document.querySelector("#address"),
  city : document.querySelector("#city"),
  email : document.querySelector("#email"),
}
let emailMsg = document.querySelector("#emailErrorMsg");








