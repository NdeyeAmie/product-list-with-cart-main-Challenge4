const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const confirmCommandeButton = document.getElementById("confirm-order");
const modal = document.getElementById("modal");
const newCommandeBtn = document.getElementById("new-order");

let cart = [];


function afficheProduct(products) {
  products.forEach((product, index) => {
     productCard = document.createElement("div");
    productCard.classList.add("col-12", "col-md-6", "col-lg-4", "p-2");

    productCard.innerHTML = `
     

     
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top " alt="${product.name}">
                <div class="card-body">
                  
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text prix">$${product.price.toFixed(2)}</p>
                    
                    <i class='bx bx-cart-add' id="bx-add"></i>
                    <button class="btn btn-primary btnCart"  onclick="addToCart(${index})">Add to cart</button>
                    
                </div>
            </div>
        
    `;


    productList.appendChild(productCard);
  });
}


function addToCart(index) {
  const product = window.products[index];
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    // existingProduct.quantity++;
  } 
    cart.push({ ...product, quantity: 1 });
  

  updateCart();
}

// function addToCart(index) {
//   const product = window.products[index];

//   cart.push({ ...product, quantity: 1 });

//   updateCart();
// }


function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("li");
    cartItem.innerHTML = `

     <li class="list-group-item firs_element">
     <div class="d-flex justify-content-between lh-sm">
      <div class="img-panier"><img src="${item.image}" alt="image de produit"></div>
      <div>
         <h6 class="my-0">${item.name}</h6>
        
         <small class="text-muted ">Total: $${(item.price * item.quantity).toFixed(2)}</small>
      </div>
      <button  class="supprimeCard" onclick="supprimeCard(${index})">❌</button>
   </div>
</li>

`;

    
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Supprime produit
function supprimeCard(index) {
  cart.splice(index, 1);
  updateCart();
}



document.getElementById("confirmOrder").addEventListener("click", openModal);

function openModal() {
  // Remplir le contenu du modale avec les produits du panier
  modalBody.innerHTML = "";

  cart.forEach(item => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-list";
    productDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span>$${item.price}</span>
    `;
    modalBody.appendChild(productDiv);
  });

  // Mettre à jour le total du panier dans le modale
  modalTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Afficher le modale
  orderModal.style.display = "flex";
}

function closeModal() {
  orderModal.style.display = "none";
}

function clearCart() {
  cart.length = 0; 
  updateCart();
  closeModal();
}

document.getElementById("startNewOrder").addEventListener("click", clearCart);

// vider
// newCommandeBtn.addEventListener("click", () => {
//   cart = [];
//   updateCart();
//   modal.classList.add("hidden");
// });


afficheProduct(window.products);
