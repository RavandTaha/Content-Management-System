const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


const loadingSpinner = document.getElementById('loading-spinner');


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

// endpoint URL for products
const apiUrl = 'http://gamehub.local/wp-json/wc/store/products';

// Fetch data from the API to display product list
fetch(apiUrl)
    .then(response => {
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json(); // response data as JSON
    })
    .then(products => {
        // Process the fetched products
        const productList = document.getElementById('wordpress');

        products.forEach(product => {
            // Create a clickable product element
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            
            // Create anchor element with dynamic product ID
            const productLink = document.createElement('a');
            productLink.href = `product.html?productId=${product.id}`; // Link to product details with dynamic product ID
            productElement.appendChild(productLink); // Append anchor to product container

            // Create image element inside the anchor
            const productImage = document.createElement('img');
            productImage.src = product.images[0].src; //
            productImage.alt = product.name;
            productImage.classList.add('product-image');
            productLink.appendChild(productImage); // Append image to anchor

            // Create product details
            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');
            productDetails.innerHTML = `
                <h2>${product.name}</h2>
            `;
            productElement.appendChild(productDetails); // Append product details to product container

            productList.appendChild(productElement); // Append product container to product list
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// Fetch product details based on the dynamically fetched product ID from the URL
document.addEventListener("DOMContentLoaded", () => {
    // Extract product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
  
    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }
  
    const apiUrl2 = `http://gamehub.local/wp-json/wc/store/products/${productId}`;
  
    fetch(apiUrl2)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            return response.json(); 
        })
        .then(product => {
            // Display product details
            const productDetailsContainer = document.getElementById('product-details');
            if (productDetailsContainer) {
                productDetailsContainer.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.images[0].src}" alt="${product.name}">
                    <p>Description: ${product.description}</p>
                `;
            } else {
                console.error('Product details container not found');
            }
        })
        .catch(error => {
            console.error('Error fetching product:', error);
        });
});


  
  


 



    

