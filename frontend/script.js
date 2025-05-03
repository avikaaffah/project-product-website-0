// Navbar burger toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fetch dan render produk
async function fetchAndRenderProducts() {
  try {
    const response = await fetch('http://34.101.109.175/api/products');
    const products = await response.json();

    const container = document.getElementById('product-container');
    container.innerHTML = '';

    const grouped = products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});

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
        img.src = product.imageUrl;
        img.alt = product.name;
        card.appendChild(img);

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = product.name;
        content.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = product.description;
        content.appendChild(desc);

        const link = document.createElement('a');
        link.href = product.pdfUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = 'View PDF Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 3.5V9h4.5L15 3.5z"/></svg>';
        content.appendChild(link);

        card.appendChild(content);
        productsDiv.appendChild(card);
      });

      section.appendChild(productsDiv);
      container.appendChild(section);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);
