const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

const loadingSpinner = document.getElementById('loading-spinner');

// Define the URL of the external API
const url = "http://gamehub.local/wp-json/wc/store/products";

// Get the product-list container element
const productContainer = document.querySelector(".game-row");


if (bar) {
  bar.addEventListener('click',() =>{
    nav.classList.add('active');
  })
}

if (close) {
  close.addEventListener('click',() =>{
    nav.classList.remove('active');
  })
}


async function getAllGames() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const results = await response.json();

    productContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      if (i === 16) {
        break;
      }

      productContainer.innerHTML += `<a href="product1.html?id=${results[i].id}">
        <div class="game-item">
          <img src="${results[i].image}" alt="${results[i].title}"/>
          <div class="game-description">
            <p>${results[i].title}</p>
          </div>
          <div class="game-price">
            <span class="old-price">${results[i].price}$</span>
            <span class="new-price">${results[i].discountedPrice}$</span>
          </div>
        </div>
      </a>`;
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    productContainer.innerHTML = "There was an error fetching our games, please contact us or wait.";
  }
}

getAllGames();

 






