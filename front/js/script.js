/*Récupérer le contenu*/
const apiFetch = fetch("http://localhost:3000/api/products/");

/*créer le contenu HTML de la section .items*/

apiFetch.then(async function(res) {
  try{
    if (res.ok) {
    let products = await res.json();
    
    function displayProducts() {
      for (let i = 0; i < products.length; i++) {
        const items = document.querySelector("#items");
        
        const link = document.createElement("a");
        link.href = `../html/product.html?id=${products[i]._id}`;
        items.appendChild(link);
        const article = document.createElement("article");
        link.appendChild(article);
        
        const image = document.createElement("img");
        image.src = products[i].imageUrl;
        image.alt = products[i].altTxt;
        article.appendChild(image);
        const title = document.createElement("h3");
        title.textContent = products[i].name;
        article.appendChild(title);
        const description = document.createElement("p");
        description.textContent = products[i].description;
        article.appendChild(description);
      }
    }
    /*Afficher les produits*/
    displayProducts();
  }
  
  } catch (e) {
    console.log(e);
  }
})
  


