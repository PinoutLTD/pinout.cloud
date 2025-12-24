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
     Phone mask (simple & safe)
     Format: +123 456 789 012
  ----------------------------- */
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let value = phoneInput.value.replace(/\D/g, '');

      // limit length (adjust if needed)
      value = value.substring(0, 12);

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


