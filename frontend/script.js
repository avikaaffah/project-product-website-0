// Navbar burger toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

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
    
    // In Docker environment, we use relative URLs because nginx handles the proxying
    console.log('Fetching products from: /api/products');
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Response is not JSON:', text);
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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  fetchAndRenderProducts();
});

// Slider
document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');
  const dots = document.querySelectorAll('.nav-dots .dot');
  const heroSlider = document.getElementById('hero-slider');

  const totalSlides = slides.length;
  let currentIndex = 0;
  let slideWidthPercent = 100 / totalSlides;
  let autoSlideInterval;
  const autoSlideDelay = 5000; // 5 seconds

  // Show text only after slide transition ends
  function showSlideText(index) {
    slides.forEach((slide, i) => {
      const text = slide.querySelector('.slide-text');
      if (i === index) {
        // Delay text appearance slightly after slide transition
        setTimeout(() => {
          text.classList.add('active');
        }, 300); // 300ms after slide transition start (adjust as needed)
      } else {
        text.classList.remove('active');
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
    // Remove all text active classes immediately
    slides.forEach(slide => slide.querySelector('.slide-text').classList.remove('active'));
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
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, autoSlideDelay);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Listen for transition end on slidesContainer to show text
  slidesContainer.addEventListener('transitionend', () => {
    showSlideText(currentIndex);
  });

  // Pause auto-slide on mouse enter, resume on mouse leave
  heroSlider.addEventListener('mouseenter', stopAutoSlide);
  heroSlider.addEventListener('mouseleave', startAutoSlide);

  // Navigation arrows event listeners with pause on click
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();  // Pause auto-slide on click
    nextSlide();
    // Optionally restart auto-slide after user interaction:
    // startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();  // Pause auto-slide on click
    prevSlide();
    // Optionally restart auto-slide after user interaction:
    // startAutoSlide();
  });

  // Navigation dots event listeners with pause on click
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();  // Pause auto-slide on click
      goToSlide(idx);
      // Optionally restart auto-slide after user interaction:
      // startAutoSlide();
    });
  });

  // Initialize slider
  goToSlide(0);
  // Show text for first slide after initial transform (no transitionend fired on load)
  setTimeout(() => {
    showSlideText(0);
  }, 600); // match transition duration
  startAutoSlide();
});

// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  fetchAndRenderProducts();

  // Smooth scroll for nav links
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
      if (navLinksElement.classList.contains('active')) {
        navLinksElement.classList.remove('active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  // Function to open modal with product data
  function openModal(product) {
    // Clear previous content
    modalBody.innerHTML = '';

    // Create image element
    const img = document.createElement('img');
    img.src = product.imageUrl || 'placeholder.jpg';
    img.alt = product.name;
    img.onerror = () => {
      img.src = 'placeholder.jpg';
      img.alt = 'Image not available';
    };
    modalBody.appendChild(img);

    // Create title
    const title = document.createElement('h3');
    title.textContent = product.name;
    modalBody.appendChild(title);

    // Create description
    const desc = document.createElement('p');
    desc.textContent = product.description;
    modalBody.appendChild(desc);

    // Add PDF link if available
    if (product.pdfUrl) {
      const link = document.createElement('a');
      link.href = product.pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = 'View PDF Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 3.5V9h4.5L15 3.5z"/></svg>';
      modalBody.appendChild(link);
    }

    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // Trap focus inside modal for accessibility
    trapFocus(modal);
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    releaseFocus();
  }

  // Close modal on close button click
  closeBtn.addEventListener('click', closeModal);

  // Close modal on clicking outside modal content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on pressing Escape key
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

    // Save handler to remove later
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

  // Attach click event to product cards dynamically
  // Since product cards are generated dynamically, use event delegation on product container
  const productContainer = document.getElementById('product-container');
  if (productContainer) {
    productContainer.addEventListener('click', (event) => {
      // Find closest card element clicked
      const card = event.target.closest('.card');
      if (!card) return;

      // Extract product info from the card elements
      // Assuming your card structure matches what you have in fetchAndRenderProducts()
      const img = card.querySelector('img');
      const title = card.querySelector('.card-content h3');
      const desc = card.querySelector('.card-content p');
      const pdfLink = card.querySelector('.card-content a');

      // Build product object
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
