const baseUrl = "http://gamehub.local/wp-json/wc/store/products";
const productContainer = document.querySelector(".products")

async function getProducts(url){
    const response = await fetch (url);
    const products = await response.json();
    products.forEach(function)(product){
        productContainer.innerHTML += `
        <div class="product">h2>${product.name}</h2>
        <div class="product-image" style="background-image:url('$product.images[0].)    
        </div>`
    })
}

getProducts(baseUrl);