// Product Detail Form Handler
function initProductDetailForm() {
  const form = document.querySelector('.product-detail__form');
  if (!form) return;

  const OC = typeof OrderComment !== 'undefined' ? OrderComment : null;
  const phoneHiddenInput = form.querySelector('#mce-PHONE');
  const phoneInput = form.querySelector('#phone-input');

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

  // Quantity selector removed (no QUANTITY field in product forms).

  /* -----------------------------
     Product variant selection (e.g. robot vacuum model)
  ----------------------------- */
  function syncProductDetailPriceFromVariant(card, scope) {
    const root = scope || document;
    const defaultPrice = root.querySelector('.product-detail__price-main');
    const defaultOldPrice = root.querySelector('.product-detail__price-old');
    const currentPriceEl = card.querySelector('.product-detail__variant-price');
    const currentOldPriceEl = card.querySelector('.product-detail__variant-price-old');
    const nextPrice = currentPriceEl ? currentPriceEl.textContent.trim() : '';

    // Only overwrite when the variant card actually has a price (OpenCart may strip nested text)
    if (defaultPrice && nextPrice) {
      defaultPrice.textContent = nextPrice;
    }

    if (defaultOldPrice) {
      const nextOldPrice = currentOldPriceEl ? currentOldPriceEl.textContent.trim() : '';
      if (nextOldPrice) {
        defaultOldPrice.textContent = nextOldPrice;
        defaultOldPrice.hidden = false;
        defaultOldPrice.style.removeProperty('display');
      } else {
        // IKEA / Backup Internet variants have no old price — hide header old price
        defaultOldPrice.textContent = '';
        defaultOldPrice.hidden = true;
        defaultOldPrice.style.display = 'none';
      }
    }
  }

  const variantCardsWrap = document.querySelector('.product-detail__variant-cards');
  if (variantCardsWrap) {
    const productDetailRoot =
      variantCardsWrap.closest('.product-detail') ||
      variantCardsWrap.closest('main') ||
      document;

    variantCardsWrap.addEventListener('click', (e) => {
      const card = e.target && e.target.closest ? e.target.closest('.product-detail__variant-card') : null;
      if (!card) return;
      e.preventDefault();

      variantCardsWrap
        .querySelectorAll('.product-detail__variant-card')
        .forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const variantName = card.getAttribute('data-variant-name') || card.dataset.variantName || '';
      let variantId = card.getAttribute('data-variant-id') || card.dataset.variantId || '';
      if (!variantId) {
        const nested = card.querySelector('[data-variant-id]');
        if (nested) {
          variantId = nested.getAttribute('data-variant-id') || nested.dataset.variantId || '';
        }
      }
      if (!variantId) variantId = variantName || '';

      const variantInput = form.querySelector('#product-variant') || document.getElementById('product-variant');
      const commentTextarea = form.querySelector('#mce-COMMENT') || document.getElementById('mce-COMMENT');

      syncProductDetailPriceFromVariant(card, productDetailRoot);

      if (variantInput) {
        variantInput.value = variantId;
      }

      if (commentTextarea && variantName) {
        commentTextarea.value = OC
          ? OC.buildWithVariant(variantName)
          : `Hello, I would like to order ${variantName} with Installation & Automation. Please contact me.`;
      }
    });
  }

  /* -----------------------------
     Setup selection (e.g. "Choose your setup" cards)
  ----------------------------- */
  document.querySelectorAll('.product-detail__setup-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.product-detail__setup-card')
        .forEach(c => c.classList.remove('active'));

      card.classList.add('active');

      const setupTitle = card.getAttribute('data-setup-title') || card.dataset.setupTitle || '';
      const setupId = card.getAttribute('data-setup-id') || card.dataset.setupId || setupTitle || '';
      const setupInput = document.getElementById('product-setup');
      const commentTextarea = document.getElementById('mce-COMMENT');
      const productInput = document.querySelector('input[name="PRODUCT"]');

      if (setupInput) {
        setupInput.value = setupId;
      }

      if (commentTextarea && productInput) {
        const productName = productInput.value;
        commentTextarea.value = OC
          ? OC.buildWithSetup(productName, setupTitle)
          : setupTitle
            ? `Hello, I would like to order ${productName} — ${setupTitle}. Please contact me.`
            : `Hello, I would like to order ${productName}. Please contact me.`;
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

  function updateCommentWithOptions() {
    const commentTextarea = document.getElementById('mce-COMMENT');
    const productInput = document.querySelector('input[name="PRODUCT"]');
    if (!commentTextarea || !productInput) return;

    const productName = productInput.value;
    if (OC) {
      commentTextarea.value = OC.buildFromSelectedOptions(productName, selectedOptions);
      return;
    }

    const byName = {};
    for (const [, opt] of Object.entries(selectedOptions)) {
      byName[opt.optionName] = opt;
    }
    const insightColor = byName['Insight Color'];
    const urbanColor = byName['Urban Color'];
    const urbanEmotion = byName['Urban Emotion'];
    const uvCoverColor = byName['UV Cover Color'];
    const optionParts = [];

    if (insightColor) {
      optionParts.push(`${insightColor.label.toLowerCase()} (insight)`);
    }
    if (urbanColor && urbanEmotion) {
      optionParts.push(`${urbanColor.label.toLowerCase()} (emotion / ${urbanEmotion.label.toLowerCase()})`);
    } else if (urbanColor) {
      optionParts.push(`${urbanColor.label.toLowerCase()}`);
    }
    if (uvCoverColor) {
      optionParts.push(`${uvCoverColor.label.toLowerCase()} (protection)`);
    }
    if (byName['Color'] && !byName['Insight Color']) {
      optionParts.push(byName['Color'].label.toLowerCase());
    }

    if (optionParts.length > 0) {
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
     Phone: intl-tel-input (flags + country dropdown)
     Submitted as single hidden PHONE (#mce-PHONE)
  ----------------------------- */
  let iti = null;
  function getMaxLocalDigits(iso2) {
    // Keep this conservative; we only "trim" overly long inputs.
    switch ((iso2 || '').toLowerCase()) {
      case 'cy': return 8;
      case 'gr': return 10;
      case 'gb': return 10;
      case 'ru': return 10;
      case 'ua': return 9;
      default: return 15; // E.164 max national significant number length varies; 15 is safe upper cap
    }
  }

  function applyPhoneMask() {
    if (!phoneInput) return;
    const iso2 = iti && iti.getSelectedCountryData ? iti.getSelectedCountryData().iso2 : '';
    const maxLen = getMaxLocalDigits(iso2);
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, maxLen);
    if (phoneInput.value !== digits) {
      phoneInput.value = digits;
    }
  }

  function syncPhoneHidden() {
    if (!phoneHiddenInput) return;
    applyPhoneMask();
    const localDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
    if (iti && iti.getSelectedCountryData) {
      const dialCode = iti.getSelectedCountryData().dialCode || '';
      phoneHiddenInput.value = dialCode ? `+${dialCode} ${localDigits}` : localDigits;
      return;
    }
    phoneHiddenInput.value = localDigits;
  }

  if (phoneInput && typeof window !== 'undefined' && window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: 'cy',
      preferredCountries: ['cy', 'gr', 'gb', 'ru', 'ua'],
      separateDialCode: true,
    });
    phoneInput.addEventListener('countrychange', syncPhoneHidden);
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', syncPhoneHidden);
  }
  syncPhoneHidden();

  /* -----------------------------
     Form validation (Mailchimp-safe)
  ----------------------------- */
  form.addEventListener('submit', (e) => {
    let hasError = false;

    // Phone validation (at least 8 digits typed; also trimmed to reasonable max per country)
    if (phoneInput) {
      applyPhoneMask();
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 8) {
        hasError = true;
        phoneInput.classList.add('input-error');
      } else {
        phoneInput.classList.remove('input-error');
      }
    }

    syncPhoneHidden();

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



