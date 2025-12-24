// Product Card Component
function createProductCard(product) {
  const isAvailable = product.available;
  const cardClass = isAvailable ? 'shop-content__card' : 'shop-content__card unavailable';
  const tagClass = isAvailable ? 'text-normal shop-content__tag' : 'text-normal shop-content__tag shop-content__tag--not-available';
  const tagText = isAvailable ? 'available' : 'not available';
  // Use absolute path from root to ensure links work in both dev and production builds
  const linkHref = isAvailable ? `/shop/${product.slug}.html` : '#';

  const oldPriceHTML = product.oldPrice ? `<span class="text shop-content__price-old">€ ${product.oldPrice.toFixed(2)}</span>` : '';
  
  // Use first image from images array if available, otherwise fall back to image property
  const productImage = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : (product.image || '../img/shop/card-1.png');

  return `
    <div class="${cardClass}">
      <a href="${linkHref}" class="shop-content__link">
        <div class="shop-content__img">
          <img src="${productImage}" alt="${product.title}"/>
        </div>
        <div class="shop-content__text">
          <h3 class="text">${product.title}</h3>
          <p class="text-normal">${product.description}</p>
          <div class="shop-content__price">
            <span class="text shop-content__price-main">€ ${product.price.toFixed(2)}</span>
            ${oldPriceHTML}
          </div>
        </div>
        <span class="${tagClass}">${tagText}</span>
      </a>
    </div>
  `;
}

// Render all products to a container
function renderProducts(containerSelector, productsToRender) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container ${containerSelector} not found`);
    return;
  }

  if (!productsToRender || productsToRender.length === 0) {
    console.warn('No products to render');
    return;
  }

  const cardsHTML = productsToRender.map(product => createProductCard(product)).join('');
  container.innerHTML = cardsHTML;
}

// Initialize product cards on shop page
function initProductCards() {
  // Check if we're on the shop page
  const shopContainer = document.querySelector('.shop-content');
  if (!shopContainer) {
    return;
  }

  // Check if products are available
  if (typeof products === 'undefined' || !Array.isArray(products)) {
    console.error('Products data not loaded. Make sure products.js is loaded before productCard.js');
    shopContainer.innerHTML = '<p class="text-normal">Products are loading...</p>';
    return;
  }

  // Render all products
  renderProducts('.shop-content', products);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductCards);
} else {
  initProductCards();
}

