let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

let prices = [];

for (let i = 0; i < cart.length; i++) {
 
  const apiFetch = fetch(`http://localhost:3000/api/products/${cart[i].id}`);
  
  apiFetch.then(async function(res) { 
    try{
      if (res.ok) {
      let products = await res.json();

      /*Intégrer le html de la section items*/
      function displayProducts() {

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

          /* input permettant de changer la quantité */

          const setQuantity = document.createElement("input");
          setQuantity.type = "number";
          setQuantity.className = "itemQuantity";
          setQuantity.name = "itemQuantity";
          setQuantity.min = "1";
          setQuantity.max = "100";
          setQuantity.value = cart[i].quantity;
          setQuantity.textContent = cart[i].quantity;
          settingsQuantity.appendChild(setQuantity);


          /* bouton Supprimer */

          const settingsDelete = document.createElement("div");
          settingsDelete.className = `${contentSettings.className}` + "__delete";
          contentSettings.appendChild(settingsDelete);

          const itemDelete = document.createElement("p");
          itemDelete.className = "deleteItem";
          itemDelete.textContent = "Supprimer";
          settingsDelete.appendChild(itemDelete);

          
          /* total quantité */
          const totalQuantity = document.querySelector("#totalQuantity");
          const sum = cart.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0);
          console.log(sum);
          totalQuantity.textContent = `${sum}`;


          /* total prix */
          
          prices.push(products.price)

        }
      }
      /*Afficher les produits*/
      displayProducts();
    } catch (e) {
      console.log(e);
    }
  })
}






