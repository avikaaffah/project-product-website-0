document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
  
    if (!category) {
      window.location.href = 'index.html';
      return;
    }
  
    document.getElementById('category-title').textContent = category;
  
    fetchAndRenderCategoryProducts(category);
  
    // Modal elements
    const modal = document.getElementById('product-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
  
    let focusedElementBeforeModal;
  
    // Open modal and inject product details
    function openModal(product) {
      modalBody.innerHTML = '';
  
      const img = document.createElement('img');
      img.src = product.imageUrl || 'placeholder.jpg';
      img.alt = product.name || 'Product image';
      img.onerror = () => {
        img.src = 'placeholder.jpg';
        img.alt = 'Image not available';
      };
      modalBody.appendChild(img);
  
      const title = document.createElement('h3');
      title.id = 'modal-title';
      title.textContent = product.name || '';
      modalBody.appendChild(title);
  
      if (product.description) {
        const desc = document.createElement('p');
        desc.textContent = product.description;
        modalBody.appendChild(desc);
      }
  
      if (product.pdfUrl) {
        const link = document.createElement('a');
        link.href = product.pdfUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = 'View PDF Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 3.5V9h4.5L15 3.5z"/></svg>';
        modalBody.appendChild(link);
      }
  
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
  
      trapFocus(modal);
    }
  
    // Close modal and restore focus
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      releaseFocus();
    }
  
    closeBtn.addEventListener('click', closeModal);
  
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  
    // Accessibility: trap focus inside modal
    function trapFocus(element) {
      focusedElementBeforeModal = document.activeElement;
      const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      const focusableElements = element.querySelectorAll(focusableElementsString);
      if (focusableElements.length === 0) return;
  
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
  
      function handleFocus(event) {
        if (event.key !== 'Tab') return;
  
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
          }
        } else { // Tab
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
          }
        }
      }
  
      element.addEventListener('keydown', handleFocus);
      firstFocusable.focus();
  
      element._handleFocus = handleFocus;
    }
  
    function releaseFocus() {
      if (modal._handleFocus) {
        modal.removeEventListener('keydown', modal._handleFocus);
        modal._handleFocus = null;
      }
      if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus();
      }
    }
  
    // Fetch and render products by category
    async function fetchAndRenderCategoryProducts(category) {
      try {
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = '<p>Loading products...</p>';
  
        // Fetch all products
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const allProducts = await response.json();
  
        if (!Array.isArray(allProducts) || allProducts.length === 0) {
          productsGrid.innerHTML = '<p>No products found.</p>';
          return;
        }
  
        // Filter products by category
        const filteredProducts = allProducts.filter(product => product.category === category);
  
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
  
    // Create product card element
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
  
    // Event delegation: open modal on product card click
    const productsGrid = document.getElementById('products-grid');
    productsGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      if (!card) return;
  
      // Extract product info from card elements
      const img = card.querySelector('img');
      const title = card.querySelector('.card-content h3');
      const desc = card.querySelector('.card-content p');
      const pdfLink = card.querySelector('.card-content a');
  
      const product = {
        name: title ? title.textContent : '',
        description: desc ? desc.textContent : '',
        imageUrl: img ? img.src : '',
        pdfUrl: pdfLink ? pdfLink.href : null,
      };
  
      openModal(product);
    });
  });
  