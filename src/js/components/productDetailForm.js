// Product Detail Form Handler
function initProductDetailForm() {
  const form = document.querySelector('.product-detail__form');
  if (!form) return;

  const phoneInput = form.querySelector('#mce-PHONE');

  /* -----------------------------
     Contact method selection
  ----------------------------- */
  document.querySelectorAll('.product-detail__contact-method[data-method]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__contact-method[data-method]')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const methodInput = document.getElementById('contact-method');
      if (methodInput) {
        methodInput.value = btn.dataset.method;
      }
    });
  });

  /* -----------------------------
     Language selection
  ----------------------------- */
  document.querySelectorAll('.product-detail__contact-method[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__contact-method[data-lang]')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const langInput = document.getElementById('language');
      if (langInput) {
        langInput.value = btn.dataset.lang;
      }
    });
  });

  /* -----------------------------
     Quantity selection
  ----------------------------- */
  document.querySelectorAll('.product-detail__contact-method[data-quantity]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__contact-method[data-quantity]')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const quantityInput = document.getElementById('quantity');
      if (quantityInput) {
        quantityInput.value = btn.dataset.quantity;
      }
    });
  });

  /* -----------------------------
     Product variant selection (e.g. robot vacuum model)
  ----------------------------- */
  document.querySelectorAll('.product-detail__variant-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__variant-card')
        .forEach(c => c.classList.remove('active'));

      card.classList.add('active');

      const variantName = card.getAttribute('data-variant-name') || card.dataset.variantName || '';
      const variantId = card.getAttribute('data-variant-id') || card.dataset.variantId || variantName || '';
      const variantInput = document.getElementById('product-variant');
      const commentTextarea = document.getElementById('mce-COMMENT');
      const defaultPrice = document.querySelector('.product-detail__price-main');
      const defaultOldPrice = document.querySelector('.product-detail__price-old');
      const currentPrice = card.querySelector('.product-detail__variant-price').innerText;
      const currentOldPrice = card.querySelector('.product-detail__variant-price-old').innerText;

      defaultOldPrice.innerText = currentOldPrice;
      defaultPrice.innerText = currentPrice;


      if (variantInput) {
        // Store the internal variant ID (or fall back to name)
        variantInput.value = variantId;
      }

      if (commentTextarea && variantName) {
        commentTextarea.value = `Hello, I would like to order ${variantName} with Installation & Automation. Please contact me.`;
      }
    });
  });

  /* -----------------------------
     Color selection
  ----------------------------- */
  document.querySelectorAll('.product-detail__color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__color-swatch')
        .forEach(s => s.classList.remove('active'));

      swatch.classList.add('active');

      // Get color name from data attribute
      let colorName = swatch.getAttribute('data-color-name') || swatch.dataset.colorName;
      const colorHex = swatch.getAttribute('data-color') || swatch.dataset.color || '';

      // If no color name or it's a hex code, detect it
      if (!colorName || colorName.startsWith('#')) {
        // Try to extract from aria-label
        const ariaLabel = swatch.getAttribute('aria-label') || '';
        const match = ariaLabel.match(/Select\s+(\w+)\s+color/i);
        if (match) {
          colorName = match[1];
        } else {
          // Detect from hex value
          const hexLower = colorHex.toLowerCase();
          if (hexLower === '#0080ea') colorName = 'blue';
          else if (hexLower === '#ff2caf') colorName = 'pink';
          else colorName = colorHex;
        }
      }

      const imageIndex = parseInt(swatch.getAttribute('data-image-index') || swatch.dataset.imageIndex || '-1', 10);

      // Update hidden input with color name (not hex)
      const colorInput = document.getElementById('product-color');
      if (colorInput) {
        colorInput.value = colorName;
      }

      // Navigate swiper to the correct image for this color
      if (!isNaN(imageIndex) && imageIndex >= 0) {
        // Map color index to slide index: Blue->0, Pink->2, Yellow->1
        const slideIndexMap = [9, 10]; // Blue->slide 10, Pink->slide 11
        const targetSlideIndex = slideIndexMap[imageIndex] !== undefined ? slideIndexMap[imageIndex] : imageIndex;

        // Navigate to the correct slide
        if (window.mainSwiper) {
          window.mainSwiper.slideTo(targetSlideIndex, 300);
        }
      }
    });
  });

  /* -----------------------------
     Phone mask (simple & safe)
     Format: +123 456 789 012
  ----------------------------- */
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let value = phoneInput.value.replace(/\D/g, '');

      // limit length (adjust if needed)
      value = value.substring(0, 14);

      let formatted = '';
      if (value.length > 0) formatted = '+' + value.substring(0, 3);
      if (value.length > 3) formatted += ' ' + value.substring(3, 6);
      if (value.length > 6) formatted += ' ' + value.substring(6, 9);
      if (value.length > 9) formatted += ' ' + value.substring(9, 12);
      if (value.length > 12) formatted += ' ' + value.substring(12, 15);

      phoneInput.value = formatted;
    });
  }

  /* -----------------------------
     Form validation (Mailchimp-safe)
  ----------------------------- */
  form.addEventListener('submit', (e) => {
    let hasError = false;

    // Phone validation (at least 8 digits)
    if (phoneInput) {
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 8) {
        hasError = true;
        phoneInput.classList.add('input-error');
      } else {
        phoneInput.classList.remove('input-error');
      }
    }

    if (hasError) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductDetailForm);
} else {
  initProductDetailForm();
}



