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

// Fetch data from the API
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
            

            // Create image element
            const productImage = document.createElement('img');
            productImage.src = product.images[0].src; 
            productImage.alt = product.name;
            productImage.classList.add('product-image');
            productImage.addEventListener('click', () => {
                window.open(product.permalink, '_blank');
            });
            productElement.appendChild(productImage);

            // Create product details
            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');
            productDetails.innerHTML = `
              <h2>${product.name}</h2>`;

            productElement.appendChild(productDetails);

            productList.appendChild(productElement); 
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

