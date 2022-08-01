let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

let arrayQuantity = [];
let prices = [];
let productsId = [];

for (let i = 0; i < cart.length; i++) {
 
  const apiFetch = fetch("http://localhost:3000/api/products/"+`${cart[i].id}`);
  
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

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

let textRegExp = new RegExp("^[A-Za-zÀ-ÿ'-]+[^0-9_!¿/+=@#$%&(){}|~<>;:]$");
let addressRegExp = new RegExp("^[0-9a-zA-ZÀ-ÿ\s,-. ]+$");
let emailRegExp = new RegExp("[A-Za-z0-9]+@[A-Za-z.-]+.[A-Za-z]{2,3}$");

/* Tester la saisie du formulaire */

function checkInput() {

  let tests = [
  textRegExp.test(firstName.value),
  textRegExp.test(lastName.value),
  addressRegExp.test(address.value),
  textRegExp.test(city.value),
  emailRegExp.test(email.value)
  ]

  let clientForm = [
    firstName,
    lastName,
    address,
    city,
    email
  ]

  let errorMsg = [
    document.querySelector("#firstNameErrorMsg"),
    document.querySelector("#lastNameErrorMsg"),
    document.querySelector("#addressErrorMsg"),
    document.querySelector("#cityErrorMsg"),
    document.querySelector("#emailErrorMsg")
  ]

  /* Signaler les saisies valides ou erronées */

  for (let i = 0; i < tests.length; i++) {
    let validInput = "solid green";
    let invalidInput = "solid red";

    if (tests[i] == true){
      clientForm[i].style.border = validInput;
    } else {
      clientForm[i].style.border = invalidInput;
      errorMsg[i].textContent = "Erreur de saisie"
    }
  } 
}

/* Valider le formulaire */

function validateForm () {
  if (textRegExp.test(firstName.value) == true &&
      textRegExp.test(lastName.value) == true &&
      addressRegExp.test(address.value) == true &&
      textRegExp.test(city.value) == true &&
      emailRegExp.test(email.value) == true) {
        return true
      } else {
        return false
      }
}

/* Commander */

function placeOrder() {
  const orderClick = document.querySelector("#order");

  orderClick.addEventListener("click", sendOrder, false);

  function sendOrder(submit) {
    
    submit.preventDefault();

    /* Valider la commande */
    
    if (cart.length == 0){
      alert("Vous n'avez aucun article dans le panier")
    } else {

      checkInput()
      validateForm ()

      if (validateForm() == true) {

        const contact = {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        }

        const data = {
          products : productsId,
          contact : contact
        }
        
        const orderPost = fetch("http://localhost:3000/api/products/order", {
          method : "POST",
          headers : {
            'Accept': 'application/json',
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        orderPost.then(async function (res) {
          const order = await res.json();
          window.location.href = `../html/confirmation.html?id=${order.orderId}`;
        });
      } else {
        alert("Veuillez vérifier le formulaire")
      }
    }
  }
}

placeOrder()
