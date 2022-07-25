let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

for (let i = 0; i < cart.length; i++) {
 
  const apiFetch = fetch(`http://localhost:3000/api/products/${cart[i].id}`);
  
  apiFetch.then(async function(res) { 
    try{
      if (res.ok) {
      let products = await res.json();

      /*Intégrer le html de la section items*/
      function displayProducts() {

          const items = document.querySelector(".cart__items");

          const article = document.createElement("article");
          article.className = "cart__item";
          article.dataset.id = cart[i].id;
          article.dataset.color = cart[i].color;
          items.appendChild(article);
          
          const itemImg = document.createElement("div");
          itemImg.className = `${article.className}` + "__img";
          
          const image = document.createElement("img");
          image.src = cart[i].imageUrl;
          image.alt = cart[i].altTxt;
          itemImg.appendChild(image);
          
          const itemContent = document.createElement("div");
          itemContent.className = `${article.className}`+"__content";
          article.appendChild(itemContent);
          const contentDescription = document.createElement("div");
          contentDescription.className = `${itemContent.className}`+"__description";
          itemContent.appendChild(contentDescription);
          
          const productName = document.createElement("h2");
          productName.textContent = cart[i].name;
          const productColor = document.createElement("p");
          productColor.textContent = cart[i].color;
          const productPrice = document.createElement("p");
          productPrice.textContent = Number(products.price) + " €";
          contentDescription.appendChild(productName);
          contentDescription.appendChild(productColor);
          contentDescription.appendChild(productPrice);
        }
      }
      /*Afficher les produits*/
      displayProducts();
    } catch (e) {
      console.log(e);
    }
  })
}






