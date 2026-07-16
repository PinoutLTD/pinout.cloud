/**
 * Prefilled order message for product detail textarea (build + live form updates).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.OrderComment = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const OPTION_LABEL_RU = {
    Blue: 'синий',
    Pink: 'розовый',
    'Dark Blue': 'тёмно-синий',
    Cyan: 'голубой',
    Smile: 'улыбка',
    Cross: 'крест',
    Wink: 'подмигивание',
  };

  function isRu(locale) {
    if (locale) return locale === 'ru';
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.lang === 'ru' ||
        /^\/ru(\/|$)/.test(window.location.pathname)
      );
    }
    return false;
  }

  function formatOptionLabel(label, locale) {
    if (!label) return '';
    if (isRu(locale)) {
      return OPTION_LABEL_RU[label] || label.toLowerCase();
    }
    return label.toLowerCase();
  }

  function joinList(parts, locale) {
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    const andWord = isRu(locale) ? 'и' : 'and';
    if (parts.length === 2) return `${parts[0]} ${andWord} ${parts[1]}`;
    return `${parts.slice(0, -1).join(', ')} ${andWord} ${parts[parts.length - 1]}`;
  }

  function buildAdditionalOptionsParts(byName, locale) {
    const parts = [];
    if (byName['Insight Color']) {
      const color = formatOptionLabel(byName['Insight Color'], locale);
      parts.push(isRu(locale) ? `${color} (Insight)` : `${color} (insight)`);
    }
    if (byName['Urban Color'] && byName['Urban Emotion']) {
      const color = formatOptionLabel(byName['Urban Color'], locale);
      const emotion = formatOptionLabel(byName['Urban Emotion'], locale);
      parts.push(
        isRu(locale)
          ? `${color} (эмоция / ${emotion})`
          : `${color} (emotion / ${emotion})`
      );
    } else if (byName['Urban Color']) {
      parts.push(formatOptionLabel(byName['Urban Color'], locale));
    }
    if (byName['UV Cover Color']) {
      const color = formatOptionLabel(byName['UV Cover Color'], locale);
      parts.push(isRu(locale) ? `${color} (защита)` : `${color} (protection)`);
    }
    if (byName['Color'] && !byName['Insight Color']) {
      parts.push(formatOptionLabel(byName['Color'], locale));
    }
    return parts;
  }

  function buildWithOptions(productTitle, byName, locale) {
    const parts = buildAdditionalOptionsParts(byName, locale);
    const optionsText = joinList(parts, locale);
    if (isRu(locale)) {
      return `Здравствуйте! Хочу заказать «${productTitle}» — ${optionsText}. Свяжитесь со мной, пожалуйста.`;
    }
    return `Hello, I would like to order ${productTitle} — ${optionsText}. Please contact me.`;
  }

  function buildWithVariant(variantName, locale) {
    if (isRu(locale)) {
      return `Здравствуйте! Хочу заказать «${variantName}» с установкой и автоматизацией. Свяжитесь со мной, пожалуйста.`;
    }
    return `Hello, I would like to order ${variantName} with Installation & Automation. Please contact me.`;
  }

  function buildSimple(productTitle, locale) {
    if (isRu(locale)) {
      return `Здравствуйте! Хочу заказать «${productTitle}». Свяжитесь со мной, пожалуйста.`;
    }
    return `Hello, I would like to order ${productTitle.toLowerCase()}. Please contact me.`;
  }

  function buildWithSetup(productTitle, setupTitle, locale) {
    if (setupTitle) {
      if (isRu(locale)) {
        return `Здравствуйте! Хочу заказать «${productTitle}» — ${setupTitle}. Свяжитесь со мной, пожалуйста.`;
      }
      return `Hello, I would like to order ${productTitle} — ${setupTitle}. Please contact me.`;
    }
    return buildSimple(productTitle, locale);
  }

  function buildPrefilledComment(product, locale) {
    if (product.additionalOptions && product.additionalOptions.length > 0) {
      const byName = {};
      product.additionalOptions.forEach((og) => {
        if (og.values && og.values.length > 0) {
          byName[og.name] = og.values[0].label;
        }
      });
      return buildWithOptions(product.title, byName, locale);
    }
    if (product.variants && product.variants.length > 0 && product.variants[0].name) {
      return buildWithVariant(product.variants[0].name, locale);
    }
    return buildSimple(product.title, locale);
  }

  function buildFromSelectedOptions(productTitle, selectedByOptionName, locale) {
    const byName = {};
    Object.values(selectedByOptionName || {}).forEach((opt) => {
      if (opt && opt.optionName) {
        byName[opt.optionName] = opt.label;
      }
    });
    const parts = buildAdditionalOptionsParts(byName, locale);
    if (parts.length === 0) {
      return buildSimple(productTitle, locale);
    }
    return buildWithOptions(productTitle, byName, locale);
  }

  return {
    isRu,
    buildPrefilledComment,
    buildWithVariant,
    buildWithSetup,
    buildFromSelectedOptions,
    buildSimple,
  };
});
