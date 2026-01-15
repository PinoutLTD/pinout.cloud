// Product Detail Form Handler
function initProductDetailForm() {
  const form = document.querySelector('.product-detail__form');
  if (!form) return;

  const phoneInput = form.querySelector('#mce-PHONE');
  const emailInput = form.querySelector('#mce-EMAIL');

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
          else if (hexLower === '#ffd217') colorName = 'yellow';
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
      // Mapping: Blue (index 0) -> slide 0 (card-1), Pink (index 1) -> slide 2 (card-3), Yellow (index 2) -> slide 1 (card-2)
      if (!isNaN(imageIndex) && imageIndex >= 0) {
        // Map color index to slide index: Blue->0, Pink->2, Yellow->1
        const slideIndexMap = [0, 2, 1]; // Blue->slide 0, Pink->slide 2, Yellow->slide 1
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
      value = value.substring(0, 13);

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

    // Email validation
    if (!emailInput || !emailInput.value.trim()) {
      hasError = true;
      emailInput?.classList.add('input-error');
    } else {
      emailInput.classList.remove('input-error');
    }

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



