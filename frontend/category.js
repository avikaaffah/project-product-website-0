document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (!category) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('category-title').textContent = category;
  
  fetchAndRenderCategoryProducts(category);
});

async function fetchAndRenderCategoryProducts(category) {
  try {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '<p>Loading products...</p>';
    
    // Fetch ALL products (not filtered by category)
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const allProducts = await response.json();

    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      productsGrid.innerHTML = '<p>No products found.</p>';
      return;
    }

    // Filter products by the selected category
    const filteredProducts = allProducts.filter(product => 
      product.category === category
    );

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `<p>No products found in the ${category} category.</p>`;
      return;
    }

    productsGrid.innerHTML = '';
    productsGrid.className = 'products-grid';

    filteredProducts.forEach(product => {
      const card = createProductCard(product);
      productsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching category products:', error);
    const container = document.getElementById('products-grid');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <h3>Error loading products</h3>
          <p>${error.message}</p>
          <button onclick="fetchAndRenderCategoryProducts('${category}')">Try Again</button>
        </div>
      `;
    }
  }
}

// Keep the existing createProductCard function
function createProductCard(product) {
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
  return card;
}
