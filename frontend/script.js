// Navbar burger toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Fetch and render products grouped by category
async function fetchAndRenderProducts() {
  try {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) return;

    productContainer.innerHTML = '<p>Loading products...</p>';

    const response = await fetch('/api/products');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const products = await response.json();
    console.log('Products fetched:', products);

    if (!Array.isArray(products) || products.length === 0) {
      productContainer.innerHTML = '<p>No products found.</p>';
      return;
    }

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
      productsDiv.className = 'products-slider';

      // Show only first 6 products + "See More" card
      const productsToShow = grouped[category].slice(0, 6);

      productsToShow.forEach(product => {
        const card = createProductCard(product, false);
        productsDiv.appendChild(card);
      });

      // Add "See More" card
      const seeMoreCard = createProductCard(null, true);
      // Add click event to navigate to category page
      seeMoreCard.addEventListener('click', () => {
        window.location.href = `/category.html?category=${encodeURIComponent(category)}`;
      });
      productsDiv.appendChild(seeMoreCard);

      section.appendChild(productsDiv);
      productContainer.appendChild(section);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    const container = document.getElementById('product-container');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <h3>Error loading products</h3>
          <p>${error.message}</p>
          <button onclick="fetchAndRenderProducts()">Try Again</button>
        </div>
      `;
    }
  }
}

// Create product card or "See More" card
function createProductCard(product, isSeeMoreCard = false) {
  const card = document.createElement('div');
  card.className = 'card';

  if (isSeeMoreCard) {
    card.classList.add('see-more-card');
    card.dataset.isSeeMore = 'true';

    // Content for "See More" card
    card.innerHTML = `
      <div class="card-content">
        <h3>See More</h3>
        <p>View all products in this category</p>
        <a href="#" class="see-more-link" tabindex="-1" aria-hidden="true">Explore →</a>
      </div>
    `;

    // Optionally add a placeholder image or icon
    // For example, uncomment below to add an image:
    // const img = document.createElement('img');
    // img.src = 'see-more-placeholder.jpg';
    // img.alt = 'See More';
    // card.prepend(img);

  } else if (product) {
    card.dataset.productId = product.id || '';

    const img = document.createElement('img');
    img.src = product.imageUrl || 'placeholder.jpg';
    img.alt = product.name || 'Product image';
    img.onerror = () => {
      img.src = 'placeholder.jpg';
      img.alt = 'Image not available';
    };
    card.appendChild(img);

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = product.name || '';
    content.appendChild(title);

    if (product.description) {
      const desc = document.createElement('p');
      desc.textContent = product.description;
      content.appendChild(desc);
    }

    if (product.pdfUrl) {
      const link = document.createElement('a');
      link.href = product.pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = 'View PDF Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 3.5V9h4.5L15 3.5z"/></svg>';
      content.appendChild(link);
    }

    card.appendChild(content);
  }

  return card;
}

// Modal popup logic
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

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
  let focusedElementBeforeModal;
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

  // Click event delegation for product cards inside product container
  const productContainer = document.getElementById('product-container');
  if (productContainer) {
    productContainer.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      if (!card) return;

      // Skip popup for "See More" cards
      if (card.classList.contains('see-more-card') || card.dataset.isSeeMore === 'true') {
        return;
      }

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
  }
});

// Hero slider logic (unchanged, included for completeness)
document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');
  const dots = document.querySelectorAll('.nav-dots .dot');
  const heroSlider = document.getElementById('hero-slider');

  if (!slidesContainer || slides.length === 0 || !prevBtn || !nextBtn || dots.length === 0 || !heroSlider) return;

  const totalSlides = slides.length;
  let currentIndex = 0;
  let slideWidthPercent = 100 / totalSlides;
  let autoSlideInterval;
  const autoSlideDelay = 5000; // 5 seconds

  function showSlideText(index) {
    slides.forEach((slide, i) => {
      const text = slide.querySelector('.slide-text');
      if (text) {
        if (i === index) {
          setTimeout(() => {
            text.classList.add('active');
          }, 300);
        } else {
          text.classList.remove('active');
        }
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    const translateXPercent = -slideWidthPercent * currentIndex;
    slidesContainer.style.transform = `translateX(${translateXPercent}%)`;
    updateDots();
    slides.forEach(slide => {
      const text = slide.querySelector('.slide-text');
      if (text) text.classList.remove('active');
    });
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  slidesContainer.addEventListener('transitionend', () => {
    showSlideText(currentIndex);
  });

  heroSlider.addEventListener('mouseenter', stopAutoSlide);
  heroSlider.addEventListener('mouseleave', startAutoSlide);

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(idx);
    });
  });

  goToSlide(0);
  setTimeout(() => {
    showSlideText(0);
  }, 600);
  startAutoSlide();
});

// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul#nav-links li a');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Close burger menu if open (mobile UX)
      const navLinksElement = document.getElementById('nav-links');
      if (navLinksElement && navLinksElement.classList.contains('active')) {
        navLinksElement.classList.remove('active');
      }
    });
  });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  fetchAndRenderProducts();
});
