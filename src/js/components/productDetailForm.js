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
     Additional options selection (e.g. Altruist sensor options)
  ----------------------------- */
  const additionalOptionGroups = document.querySelectorAll('.product-detail__option-group');

  // Store selected options
  const selectedOptions = {};

  // Map data-option-group-id to option ID and name (for altruist groups that use this)
  const optionGroupMap = {
    'insight-color': { id: '12', name: 'Insight Color' },
    'urban-emotion': { id: '13', name: 'Urban Emotion' },
    'urban-color': { id: '14', name: 'Urban Color' },
    'uv-cover-color': { id: '15', name: 'UV Cover Color' }
  };

  // Initialize with default selections (keyed by OpenCart option ID)
  additionalOptionGroups.forEach(group => {
    let optionId = group.dataset.option;
    let optionName = group.dataset.optionName;
    const groupId = group.dataset.optionGroupId;
    if (!optionId && groupId && optionGroupMap[groupId]) {
      optionId = optionGroupMap[groupId].id;
      optionName = optionGroupMap[groupId].name;
    }
    const activeOption = group.querySelector('.product-detail__option-swatch.active');
    if (activeOption && optionId) {
      const valueId = activeOption.dataset.valueId || '';
      const label = activeOption.dataset.valueLabel || '';
      selectedOptions[optionId] = {
        optionName: optionName || '',
        label: label || '',
        valueId: valueId || ''
      };
    }
  });

  // Function to update the comment textarea based on selected options
  function updateCommentWithOptions() {
    const commentTextarea = document.getElementById('mce-COMMENT');
    const productInput = document.querySelector('input[name="PRODUCT"]');
    if (!commentTextarea || !productInput) return;

    const productName = productInput.value;

    const byName = {};
    for (const [optId, opt] of Object.entries(selectedOptions)) {
      byName[opt.optionName] = opt;
    }
    const insightColor = byName['Insight Color'];
    const urbanColor = byName['Urban Color'];
    const urbanEmotion = byName['Urban Emotion'];
    const uvCoverColor = byName['UV Cover Color'];

    const optionParts = [];

    // Insight color: "blue (insight)"
    if (insightColor) {
      optionParts.push(`${insightColor.label.toLowerCase()} (insight)`);
    }

    // Urban color with emotion: "pink (emotion / smile)"
    if (urbanColor && urbanEmotion) {
      optionParts.push(`${urbanColor.label.toLowerCase()} (emotion / ${urbanEmotion.label.toLowerCase()})`);
    } else if (urbanColor) {
      optionParts.push(`${urbanColor.label.toLowerCase()}`);
    }

    // UV cover color with protection label: "cyan (protection)"
    if (uvCoverColor) {
      optionParts.push(`${uvCoverColor.label.toLowerCase()} (protection)`);
    }

    // Generic Color option (e.g. home-server-remote)
    if (byName['Color'] && !byName['Insight Color']) {
      optionParts.push(byName['Color'].label.toLowerCase());
    }

    if (optionParts.length > 0) {
      // Join with comma, but last one with " and "
      let optionsText;
      if (optionParts.length === 1) {
        optionsText = optionParts[0];
      } else if (optionParts.length === 2) {
        optionsText = optionParts.join(' and ');
      } else {
        optionsText = optionParts.slice(0, -1).join(', ') + ' and ' + optionParts[optionParts.length - 1];
      }
      commentTextarea.value = `Hello, I would like to order ${productName} — ${optionsText}. Please contact me.`;
    } else {
      commentTextarea.value = `Hello, I would like to order ${productName}. Please contact me.`;
    }
  }

  // Handle option swatch clicks
  document.querySelectorAll('.product-detail__option-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.preventDefault();

      const optionGroup = swatch.closest('.product-detail__option-group');
      let optionId = optionGroup ? optionGroup.dataset.option : swatch.dataset.option;
      let optionName = optionGroup ? optionGroup.dataset.optionName : swatch.dataset.optionName;
      const groupId = optionGroup ? optionGroup.dataset.optionGroupId : null;
      if (!optionId && groupId && optionGroupMap[groupId]) {
        optionId = optionGroupMap[groupId].id;
        optionName = optionGroupMap[groupId].name;
      }

      // Remove active from siblings
      if (optionGroup) {
        optionGroup.querySelectorAll('.product-detail__option-swatch').forEach(s => s.classList.remove('active'));
      }

      swatch.classList.add('active');

      const valueId = swatch.dataset.valueId || '';
      const label = swatch.dataset.valueLabel || '';

      const hiddenInput = document.getElementById('opt-' + optionId) || (groupId ? document.getElementById('opt-' + groupId) : null);
      if (hiddenInput) {
        hiddenInput.value = valueId || '';
      }

      // Navigate swiper to image when option has data-image-index (e.g. home-server-remote color)
      const imageIndex = parseInt(swatch.dataset.imageIndex, 10);
      if (!isNaN(imageIndex) && imageIndex >= 0 && window.mainSwiper) {
        window.mainSwiper.slideTo(imageIndex, 300);
      }

      // Store selection
      if (optionId) {
        selectedOptions[optionId] = {
          optionName: optionName || '',
          label: label,
          valueId: valueId || ''
        };
      }

      // Update comment
      updateCommentWithOptions();
    });
  });

  // Initial comment update if there are additional options
  if (additionalOptionGroups.length > 0) {
    updateCommentWithOptions();
  }

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



