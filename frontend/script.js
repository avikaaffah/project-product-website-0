// Navbar burger toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// API URL configuration
const API_URL = 'http://localhost:5000'; // Make sure this points to your backend server

// Fetch and render products
async function fetchAndRenderProducts() {
  try {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
      console.warn('Product container not found in the DOM');
      return;
    }
    
    // Show loading state
    productContainer.innerHTML = '<p>Loading products...</p>';
    
    console.log('Fetching products from:', `${API_URL}/api/products`);
    const response = await fetch(`${API_URL}/api/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    
    const products = await response.json();
    console.log('Products fetched:', products);

    if (!Array.isArray(products) || products.length === 0) {
      productContainer.innerHTML = '<p>No products found.</p>';
      return;
    }

    // Clear container
    productContainer.innerHTML = '';

    // Group products by category
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});

    // Create product sections by category
    for (const category in grouped) {
      const section = document.createElement('section');
      section.className = 'category';
      section.id = category.toLowerCase().replace(/\s+/g, '-');

      const heading = document.createElement('h2');
      heading.textContent = category;
      section.appendChild(heading);

      const productsDiv = document.createElement('div');
      productsDiv.className = 'products';

      grouped[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = product.imageUrl || 'placeholder.jpg';
        img.alt = product.name;
        img.onerror = () => {
          img.src = 'placeholder.jpg';
          img.alt = 'Image not available';
        };
        card.appendChild(img);

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = product.name;
        content.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = product.description;
        content.appendChild(desc);

        if (product.pdfUrl) {
          const link = document.createElement('a');
          link.href = product.pdfUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.innerHTML = 'View PDF Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 3.5V9h4.5L15 3.5z"/></svg>';
          content.appendChild(link);
        }

        card.appendChild(content);
        productsDiv.appendChild(card);
      });

      section.appendChild(productsDiv);
      productContainer.appendChild(section);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    const container = document.getElementById('product-container');
    if (container) {
      container.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  fetchAndRenderProducts();
});