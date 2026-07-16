// Product Card Component
function getLocalePrefix() {
  const path = window.location.pathname;
  return path === '/ru' || path.startsWith('/ru/') ? '/ru' : '';
}

function getShopLabels() {
  const el = document.documentElement;
  return {
    available: el.dataset.shopAvailable || 'available',
    notAvailable: el.dataset.shopNotAvailable || 'not available',
    loading: el.dataset.shopLoading || 'Products are loading...',
  };
}

function normalizeProductImagePath(src) {
  if (!src) return '/img/shop/card-1.png';
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/')) return src;
  return '/' + src.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
}

function getProductsRuBySlug() {
  if (typeof window !== 'undefined' && window.productsRuBySlug) {
    return window.productsRuBySlug;
  }
  if (typeof productsRuBySlug !== 'undefined') {
    return productsRuBySlug;
  }
  return null;
}

function localizeProductForDisplay(product) {
  const prefix = getLocalePrefix();
  const ruMap = getProductsRuBySlug();
  if (prefix !== '/ru' || !ruMap) {
    return product;
  }
  const ru = ruMap[product.slug];
  if (!ru) return product;
  return { ...product, title: ru.title || product.title, description: ru.description || product.description };
}

function formatProductPrice(price) {
  if (typeof price === 'number') {
    return `€ ${price.toFixed(2)}`;
  }

  if (typeof price === 'string') {
    const normalized = price.trim();
    if (!normalized) return '';
    if (normalized.includes('€')) return normalized;
    if (/^from\b/i.test(normalized)) {
      const fromLabel = getLocalePrefix() === '/ru' ? 'от € ' : 'from € ';
      return normalized.replace(/^from\s*/i, fromLabel);
    }
    return `€ ${normalized}`;
  }

  return '';
}

function createProductCard(product) {
  const localized = localizeProductForDisplay(product);
  const labels = getShopLabels();
  const isAvailable = product.available;
  const cardClass = isAvailable ? 'shop-content__card' : 'shop-content__card unavailable';
  const tagClass = isAvailable ? 'text-normal shop-content__tag' : 'text-normal shop-content__tag shop-content__tag--not-available';
  const tagText = isAvailable ? labels.available : labels.notAvailable;
  const localePrefix = getLocalePrefix();
  const linkHref = isAvailable ? `${localePrefix}/shop/${product.slug}` : '#';

  const oldPriceHTML = product.oldPrice ? `<span class="text shop-content__price-old">${formatProductPrice(product.oldPrice)}</span>` : '';

  const rawImage = (product.images && product.images.length > 0)
    ? product.images[0]
    : product.image;
  const productImage = normalizeProductImagePath(rawImage);

  return `
    <div class="${cardClass}">
      <a href="${linkHref}" class="shop-content__link">
        <div class="shop-content__img">
          <img src="${productImage}" alt="${localized.title}"/>
        </div>
        <div class="shop-content__text">
          <h3 class="text">${localized.title}</h3>
          <p class="text-normal">${localized.description}</p>
          <div class="shop-content__price">
            <span class="text shop-content__price-main">${formatProductPrice(product.price)}</span>
            ${oldPriceHTML}
          </div>
        </div>
        <span class="${tagClass}">${tagText}</span>
      </a>
    </div>
  `;
}

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

function initProductCards() {
  const shopContainer = document.querySelector('.shop-content');
  if (!shopContainer) {
    return;
  }

  const labels = getShopLabels();

  if (typeof products === 'undefined' || !Array.isArray(products)) {
    console.error('Products data not loaded. Make sure products.js is loaded before productCard.js');
    shopContainer.innerHTML = `<p class="text-normal">${labels.loading}</p>`;
    return;
  }

  renderProducts('.shop-content', products);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductCards);
} else {
  initProductCards();
}
