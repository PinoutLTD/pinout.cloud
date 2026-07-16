const { src, dest, series, watch, parallel } = require('gulp');
const fs = require('fs');
const path = require('path');
const { buildContext, LOCALES } = require('./src/i18n');
const { buildPrefilledComment } = require('./src/js/orderComment');

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');
const autoPrefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const shorthand = require('gulp-shorthand');
const mediaQueries = require('gulp-group-css-media-queries');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

function distDirForLocale(locale) {
  return locale === 'en' ? 'dist' : path.join('dist', locale);
}

// Bundled app JS output (intlTelInput is prepended raw — uglify cannot parse it)
const MAIN_JS_OUTPUT = 'main.min.js';
const BUNDLED_VENDOR_JS = [
  'src/js/vendor/focus-visible.min.js',
  'src/js/vendor/swiper-bundle.min.js',
];

const uglifyBundle = uglify({
  toplevel: true,
  mangle: { reserved: ['Swiper'] },
}).on('error', notify.onError());

const babelApp = babel({
  presets: ['@babel/env'],
  ignore: [/[/\\]vendor[/\\]/],
});

const INTL_TEL_INPUT_CSS_SRC = path.join(__dirname, 'src/assets/styles/vendor/intlTelInput.min.css');
const INTL_TEL_INPUT_JS_SRC = path.join(__dirname, 'src/js/vendor/intlTelInput.min.js');

function patchIntlTelInputCssContent(content, flagsBasePath = '../img/flags') {
  return content.replace(
    /--iti-path-flags-1x:\s*url\([^)]+\);\s*--iti-path-flags-2x:\s*url\([^)]+\)/,
    `--iti-path-flags-1x: url(${flagsBasePath}/flags.png);--iti-path-flags-2x: url(${flagsBasePath}/flags@2x.png)`
  );
}

function readIntlTelInputCssForBundle() {
  if (!fs.existsSync(INTL_TEL_INPUT_CSS_SRC)) return '';
  return patchIntlTelInputCssContent(fs.readFileSync(INTL_TEL_INPUT_CSS_SRC, 'utf8'));
}

function appendIntlTelInputToMainCss(mainCssPath) {
  const vendorCss = readIntlTelInputCssForBundle();
  if (!vendorCss || !fs.existsSync(mainCssPath)) return;
  let mainCss = fs.readFileSync(mainCssPath, 'utf8');
  const marker = '/* intl-tel-input */';
  const markerIdx = mainCss.indexOf(marker);
  if (markerIdx !== -1) {
    mainCss = mainCss.slice(0, markerIdx);
  }
  fs.writeFileSync(mainCssPath, `${mainCss.trimEnd()}\n${marker}\n${vendorCss}`, 'utf8');
}

function appendIntlTelInputToMainCssTask(outputDir) {
  return function appendIntlTelInputCss(cb) {
    appendIntlTelInputToMainCss(path.join(__dirname, outputDir, 'styles', 'main.min.css'));
    cb();
  };
}

function prependIntlTelInputToMainJs(mainJsPath) {
  if (!fs.existsSync(mainJsPath) || !fs.existsSync(INTL_TEL_INPUT_JS_SRC)) return;
  let appJs = fs.readFileSync(mainJsPath, 'utf8');
  const intlJs = fs.readFileSync(INTL_TEL_INPUT_JS_SRC, 'utf8');
  if (appJs.includes('International Telephone Input v')) {
    const intlEnd = appJs.indexOf('window.intlTelInput');
    if (intlEnd !== -1) {
      const afterIntl = appJs.indexOf('\n', appJs.indexOf('window.intlTelInput = intlTelInput'));
      if (afterIntl !== -1) {
        appJs = appJs.slice(afterIntl + 1);
      }
    }
  }
  fs.writeFileSync(mainJsPath, `${intlJs}\n${appJs}`, 'utf8');
}

function prependIntlTelInputToMainJsTask(outputDir) {
  return function prependIntlTelInputJs(cb) {
    prependIntlTelInputToMainJs(path.join(__dirname, outputDir, 'js', MAIN_JS_OUTPUT));
    cb();
  };
}

function fileIncludeOptions(locale) {
  return {
    prefix: '@',
    basepath: '@file',
    context: buildContext(locale),
  };
}

const clean = () =>  {
    return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist/resources'))
}

// Copy static documents (PDFs, etc.) to /docs in output
const docs = () => {
  return src('src/docs/**')
    .pipe(dest('dist/docs'));
}

const stylesMain = () => {
    return src([
      'src/assets/styles/**/*.css',
      '!src/assets/styles/main.min.css',
      '!src/assets/styles/vendor/intlTelInput.min.css',
    ])
    .pipe(sourceMaps.init())
    .pipe(concat('main.css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(autoPrefixes({
        cascade: false
    }))
    .pipe(shorthand())
    .pipe(mediaQueries())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/styles/'))
    .pipe(browserSync.stream());
};

const styles = series(stylesMain, appendIntlTelInputToMainCssTask('dist'));

function pagesGlobForLocale(locale) {
  if (locale === 'en') {
    return ['src/pages/**/*.html', '!src/pages/shop/ru/**'];
  }
  return [
    'src/pages/**/*.html',
    '!src/pages/shop/*.html',
    'src/pages/shop/index.html',
    'src/pages/shop/ru/**/*.html',
  ];
}

/** Keep output paths under dist/.../shop/, not dist/.../index.html for shop/index.html */
function pagesSrc(locale) {
  return src(pagesGlobForLocale(locale), { base: 'src/pages' });
}

/** Generated RU products live in src/pages/shop/ru/ but publish as /ru/shop/{slug}.html */
function flattenRuShopPages() {
  return rename((filePath) => {
    const dir = filePath.dirname.replace(/\\/g, '/');
    if (dir === 'shop/ru') {
      filePath.dirname = 'shop';
    }
  });
}

function pipePagesForLocale(locale) {
  let stream = pagesSrc(locale).pipe(fileInclude(fileIncludeOptions(locale)));
  if (locale === 'ru') {
    stream = stream.pipe(flattenRuShopPages());
  }
  return stream;
}

const htmlPages = parallel(
  ...LOCALES.map((locale) => function htmlPagesLocale() {
    return pipePagesForLocale(locale)
      .pipe(dest(distDirForLocale(locale)))
      .pipe(browserSync.stream());
  })
);

// Generate product detail pages dynamically
// Set to true to force regeneration of existing pages, false to skip them
const FORCE_REGENERATE_PRODUCT_PAGES = true; // Auto-regenerate when template or products.js changes

function formatProductPrice(price) {
  if (typeof price === 'number') {
    return `€ ${price.toFixed(2)}`;
  }

  if (typeof price === 'string') {
    const normalized = price.trim();
    if (!normalized) return '';
    if (normalized.includes('€')) return normalized;
    if (/^from\b/i.test(normalized)) {
      return normalized.replace(/^from\s*/i, 'from € ');
    }
    return `€ ${normalized}`;
  }

  return '';
}

function formatAdditionalPrice(price) {
  return typeof price === 'number' ? price.toFixed(2) : '';
}

/** Label above variant cards; empty variantsLabel hides the label (does not fall back to robot vacuum). */
function getVariantLabel(product) {
  if (product.variantsLabel != null && String(product.variantsLabel).trim() !== '') {
    return product.variantsLabel;
  }
  if (product.category === 'Smart Robot Vacuum') {
    return 'Choose a robot vacuum*:';
  }
  return '';
}

function buildVariantLabelHTML(variantLabel) {
  if (!variantLabel) {
    return '';
  }
  return `              <label class="text-normal product-detail__variants-label"><b>${variantLabel}</b></label>\n`;
}

function normalizeVariantAssetPath(assetPath, prefix) {
  if (!assetPath) return '';
  if (prefix === './img/') {
    return assetPath.replace(/^\.\.\/img\//, './img/').replace(/^\.\/img\//, './img/');
  }
  return assetPath.replace(/^\.\.\//, prefix).replace(/^\.\//, prefix);
}

function isHowItWorksDisabled(product) {
  if (product.howItWorks === false) {
    return true;
  }
  return product.howItWorksHtml != null && String(product.howItWorksHtml).trim() === '';
}

function hasCustomHowItWorksHtml(product) {
  return product.howItWorksHtml != null && String(product.howItWorksHtml).trim() !== '';
}

function buildVariantInclInstallHTML(product, labels) {
  if (product.showVariantInclInstall === false) {
    return '';
  }
  const text = labels.shop_variantInclInstall || 'incl. install';
  return `                    <span class="product-detail__variant-include text-normal">${text}</span>\n`;
}

/**
 * Product fullDescription: use multiple <p> blocks (and optional .product-detail__desc-heading)
 * for spacing. Legacy strings with <br> are split into paragraphs at build time.
 */
function buildProductDescriptionHTML(description) {
  if (!description) {
    return '';
  }

  let html = String(description).trim();

  const singleParagraphMatch = html.match(/^<p[^>]*>([\s\S]*)<\/p>$/i);
  if (singleParagraphMatch && !/<p[\s>]/i.test(html.slice(singleParagraphMatch[0].length))) {
    html = singleParagraphMatch[1].trim();
  }

  if (/<p[\s>]/i.test(html) && (html.match(/<p[\s>]/gi) || []).length > 1) {
    return html;
  }

  if (html.includes('product-detail__desc-') || /^<(div|ul|ol|section)\b/i.test(html)) {
    return html;
  }

  const hasBreaks = /<\/?br\s*\/?>/i.test(html);
  if (!hasBreaks) {
    return `<p class="text-normal">${html}</p>`;
  }

  const parts = html
    .replace(/<\/?br\s*\/?>/gi, '\n')
    .split('\n')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  return parts
    .map((part) => {
      const isHeading =
        /^\s*<b>[^<]+<\/b>\s*$/i.test(part) || /^\s*<b>[^<]+:<\/b>\s*$/i.test(part);
      const className = isHeading
        ? 'text-normal product-detail__desc-heading'
        : 'text-normal';
      return `<p class="${className}">${part}</p>`;
    })
    .join('\n');
}

function buildVariantImageHTML(v, assetPrefix) {
  const name = (v.name || '').replace(/"/g, '&quot;');
  const iconBlack = normalizeVariantAssetPath(v.iconBlack, assetPrefix);
  const iconWhite = normalizeVariantAssetPath(v.iconWhite, assetPrefix);
  if (iconBlack && iconWhite) {
    return `                  <div class="product-detail__variant-image product-detail__variant-image--icons">
                    <img src="${iconBlack}" alt="" class="product-detail__variant-icon product-detail__variant-icon--inactive" aria-hidden="true"/>
                    <img src="${iconWhite}" alt="" class="product-detail__variant-icon product-detail__variant-icon--active" aria-hidden="true"/>
                  </div>`;
  }
  const imagePath = normalizeVariantAssetPath(v.image, assetPrefix);
  return `                  <div class="product-detail__variant-image">
                    <img src="${imagePath}" alt="${name}"/>
                  </div>`;
}

/** Renders optional lines after delivery, before payment (see product.serviceSummary in products.js). */
function buildProductServiceSummaryHTML(product) {
  if (!product.serviceSummary || !Array.isArray(product.serviceSummary) || product.serviceSummary.length === 0) {
    return '';
  }
  const paragraphs = product.serviceSummary.map((item) => {
    if (item.line) {
      return `              <p class="text-normal"><b>${item.line}</b></p>`;
    }
    if (item.label != null && item.value != null) {
      return `              <p class="text-normal"><b>${item.label}:</b> ${item.value}</p>`;
    }
    return '';
  }).filter(Boolean);
  if (paragraphs.length === 0) return '';
  return `
            <div class="product-detail__service-summary">
${paragraphs.join('\n')}
            </div>`;
}

function loadProductsRuBySlug() {
  const ruPath = path.join(__dirname, 'src/js/data/products.ru.js');
  if (!fs.existsSync(ruPath)) {
    return {};
  }
  const ruContent = fs.readFileSync(ruPath, 'utf8');
  const ruMatch = ruContent.match(/const productsRuBySlug = (\{[\s\S]*?\n\});/);
  if (!ruMatch) {
    return {};
  }
  let productsRuBySlug = {};
  try {
    eval(`productsRuBySlug = ${ruMatch[1]}`);
  } catch (e) {
    console.warn('Could not parse products.ru.js:', e.message);
  }
  return productsRuBySlug;
}

function normalizeHtmlAssetPaths(html) {
  if (!html || typeof html !== 'string') return html;
  return html
    .replace(/src="(\.\.\/)+img\//g, 'src="/img/')
    .replace(/src="\.\/img\//g, 'src="/img/');
}

function loadProductsHowItWorksRu() {
  const filePath = path.join(__dirname, 'src/js/data/products-how-it-works.ru.js');
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const productsHowItWorksRu = (\{[\s\S]*?\n\});/);
  if (!match) {
    return {};
  }
  let productsHowItWorksRu = {};
  try {
    eval(`productsHowItWorksRu = ${match[1]}`);
  } catch (e) {
    console.warn('Could not parse products-how-it-works.ru.js:', e.message);
  }
  return productsHowItWorksRu;
}

function localizeProduct(product, locale, productsRuBySlug, productsHowItWorksRu) {
  let localized = { ...product };

  if (locale === 'ru') {
    const ru = productsRuBySlug[product.slug];
    if (ru) {
      localized = { ...localized, ...ru };
    }
    if (productsHowItWorksRu[product.slug]) {
      localized.howItWorksHtml = productsHowItWorksRu[product.slug];
    }
  }

  if (localized.howItWorksHtml) {
    localized.howItWorksHtml = normalizeHtmlAssetPaths(localized.howItWorksHtml);
  }
  if (localized.fullDescription) {
    localized.fullDescription = normalizeHtmlAssetPaths(localized.fullDescription);
  }

  return localized;
}

const generateProductPages = (cb) => {
  // Read products data
  const productsPath = path.join(__dirname, 'src/js/data/products.js');
  if (!fs.existsSync(productsPath)) {
    console.warn('Products data file not found, skipping product page generation');
    return cb();
  }

  const productsContent = fs.readFileSync(productsPath, 'utf8');

  // Extract products array - handle multiline with proper matching
  const productsMatch = productsContent.match(/const products = (\[[\s\S]*?\]);/);
  if (!productsMatch) {
    console.error('Could not parse products data. Make sure products.js exports a products array.');
    return cb();
  }

  let products;
  try {
    // Evaluate the products array (safe in build context)
    eval(`products = ${productsMatch[1]}`);
    if (!Array.isArray(products)) {
      throw new Error('Products is not an array');
    }
  } catch (e) {
    console.error('Error parsing products:', e.message);
    return cb();
  }

  // Read template
  const templatePath = path.join(__dirname, 'src/pages/templates/product-detail.html');
  if (!fs.existsSync(templatePath)) {
    console.warn('Product detail template not found, skipping product page generation');
    return cb();
  }
  let template = fs.readFileSync(templatePath, 'utf8');

  let generatedCount = 0;
  let skippedCount = 0;
  const productsRuBySlug = loadProductsRuBySlug();
  const productsHowItWorksRu = loadProductsHowItWorksRu();

  LOCALES.forEach((locale) => {
    const labels = buildContext(locale);
    const shopDir = path.join(
      __dirname,
      'src/pages',
      'shop',
      ...(locale === 'ru' ? ['ru'] : [])
    );

    if (!fs.existsSync(shopDir)) {
      fs.mkdirSync(shopDir, { recursive: true });
    }

    products.forEach((originalProduct) => {
    const product = localizeProduct(originalProduct, locale, productsRuBySlug, productsHowItWorksRu);
    const outputPath = path.join(shopDir, `${product.slug}.html`);

    if (!FORCE_REGENERATE_PRODUCT_PAGES && fs.existsSync(outputPath)) {
      skippedCount++;
      return;
    }

    let pageContent = template;

    // Replace placeholders
    pageContent = pageContent.replace(/\{\{PRODUCT_TITLE\}\}/g, product.title);

    // Handle images array for Swiper
    const images = product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : (product.image ? [product.image] : ['../img/shop/card-1.png']); // Fallback to single image or default

    // Generate thumbnail slides HTML
    const thumbsHTML = images.map(img => {
      const imagePath = img.replace(/^\.\//, '../');
      return `                  <div class="swiper-slide">
                    <img src="${imagePath}" alt="${product.title}"/>
                  </div>`;
    }).join('\n');

    // Generate main slides HTML
    const slidesHTML = images.map(img => {
      const imagePath = img.replace(/^\.\//, '../');
      return `                  <div class="swiper-slide">
                    <img src="${imagePath}" alt="${product.title}"/>
                  </div>`;
    }).join('\n');

    // Replace image placeholders
    pageContent = pageContent.replace(/\{\{PRODUCT_IMAGES_THUMBS\}\}/g, thumbsHTML);
    pageContent = pageContent.replace(/\{\{PRODUCT_IMAGES_SLIDES\}\}/g, slidesHTML);

    pageContent = pageContent.replace(/\{\{PRODUCT_PRICE\}\}/g, formatProductPrice(product.price));

    // Handle old price
    const oldPriceHTML = product.oldPrice
      ? `<span class="text product-detail__price-old">${formatProductPrice(product.oldPrice)}</span>`
      : '';
    pageContent = pageContent.replace(/\{\{PRODUCT_OLD_PRICE\}\}/g, oldPriceHTML);

    // Handle additional pricing for multiple units
    let additionalPricingHTML = '';
    if (product.additionalUnitPrice && typeof product.price === 'number') {
      additionalPricingHTML = `
            <div class="product-detail__additional-pricing">
              <p class="text-normal">Get your first upgrade for <span class="product-detail__additional-price">€&nbsp${formatAdditionalPrice(product.price)}</span>. Each additional one is only <span class="product-detail__additional-price">€&nbsp+${formatAdditionalPrice(product.additionalUnitPrice)}</span>!</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_PRICING\}\}/g, additionalPricingHTML);

    // Handle description
    const description = product.fullDescription || product.description || '';
    const descriptionHTML = buildProductDescriptionHTML(description);
    pageContent = pageContent.replace(/\{\{PRODUCT_DESCRIPTION\}\}/g, descriptionHTML);

    // Handle color options
    let colorOptionsHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && !product.additionalOptions) {
      const colorSwatches = product.colors.map((color, index) => {
        const isActive = index === 0 ? ' active' : '';
        const colorValue = typeof color === 'string' ? color : (color.value || color);
        // Detect color name from hex value
        let colorName = typeof color === 'object' && color.name ? color.name : '';
        if (!colorName) {
          if (colorValue === '#0080ea' || colorValue.toLowerCase() === '#0080ea') colorName = 'blue';
          else if (colorValue === '#ff2caf' || colorValue.toLowerCase() === '#ff2caf') colorName = 'pink';
          else if (colorValue === '#ffd217' || colorValue.toLowerCase() === '#ffd217') colorName = 'yellow';
          else colorName = colorValue;
        }
        const colorLabel = typeof color === 'object' && color.label ? color.label : colorName;
        // Map color index to image index (0=blue->card-1, 1=pink->card-3, 2=yellow->card-2)
        return `                <button type="button" class="product-detail__color-swatch${isActive}" data-color="${colorValue}" data-color-name="${colorName}" data-image-index="${index}" aria-label="Select ${colorLabel} color" style="background-color: ${colorValue};"></button>`;
      }).join('\n');

      const defaultColor = typeof product.colors[0] === 'string' ? product.colors[0] : (product.colors[0].value || product.colors[0]);
      let defaultColorName = typeof product.colors[0] === 'object' && product.colors[0].name ? product.colors[0].name : '';
      if (!defaultColorName) {
        if (defaultColor === '#0080ea' || defaultColor.toLowerCase() === '#0080ea') defaultColorName = 'blue';
        else if (defaultColor === '#ff2caf' || defaultColor.toLowerCase() === '#ff2caf') defaultColorName = 'pink';
        else if (defaultColor === '#ffd217' || defaultColor.toLowerCase() === '#ffd217') defaultColorName = 'yellow';
        else defaultColorName = defaultColor;
      }

      colorOptionsHTML = `
            <div class="product-detail__color-options">
              <label class="text-normal">Color:</label>
              <div class="product-detail__color-swatches">
${colorSwatches}
              </div>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_COLOR_OPTIONS\}\}/g, colorOptionsHTML);

    // Handle color input in form (separate from color options display)
    let colorInputHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && !product.additionalOptions) {
      const defaultColor = typeof product.colors[0] === 'string' ? product.colors[0] : (product.colors[0].value || product.colors[0]);
      let defaultColorName = typeof product.colors[0] === 'object' && product.colors[0].name ? product.colors[0].name : '';
      if (!defaultColorName) {
        if (defaultColor === '#0080ea' || defaultColor.toLowerCase() === '#0080ea') defaultColorName = 'blue';
        else if (defaultColor === '#ff2caf' || defaultColor.toLowerCase() === '#ff2caf') defaultColorName = 'pink';
        else if (defaultColor === '#ffd217' || defaultColor.toLowerCase() === '#ffd217') defaultColorName = 'yellow';
        else defaultColorName = defaultColor;
      }
      colorInputHTML = `<input type="hidden" name="COLOR" id="product-color" value="${defaultColorName}">`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_COLOR_INPUT\}\}/g, colorInputHTML);

    // Handle additional options (e.g. altruist sensor options)
    let additionalOptionsHTML = '';
    let additionalOptionsInputsHTML = '';
    if (product.additionalOptions && Array.isArray(product.additionalOptions) && product.additionalOptions.length > 0) {
      additionalOptionsHTML = product.additionalOptions.map(optionGroup => {
        const optionItems = optionGroup.values.map((val, index) => {
          const isActive = index === 0 ? ' active' : '';
          if (optionGroup.type === 'color') {
            return `                <button type="button" class="product-detail__option-swatch product-detail__option-swatch--color${isActive}" data-value-id="${val.id}" data-value-label="${val.label}" aria-label="Select ${val.label}" style="background-color: ${val.value};"></button>`;
          } else if (optionGroup.type === 'icon') {
            return `                <button type="button" class="product-detail__option-swatch product-detail__option-swatch--icon${isActive}" data-value-id="${val.id}" data-value-label="${val.label}" aria-label="Select ${val.label}">${val.icon}</button>`;
          }
          return '';
        }).join('');

        return `
            <div class="product-detail__option-group" data-option="${optionGroup.option}" data-option-name="${optionGroup.name}">
              <label class="text-normal">${optionGroup.name}:</label>
              <div class="product-detail__option-swatches">
${optionItems}
              </div>
            </div>`;
      }).join('');

      // Create hidden inputs for each option group
      additionalOptionsInputsHTML = product.additionalOptions.map(optionGroup => {
        const defaultValue = optionGroup.values[0] ? optionGroup.values[0].id : '';
        return `<input type="hidden" name="option[${optionGroup.option}]" id="opt-${optionGroup.option}" value="${defaultValue}">`;
      }).join('');
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_OPTIONS\}\}/g, additionalOptionsHTML);
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_OPTIONS_INPUTS\}\}/g, additionalOptionsInputsHTML);

    // Handle warning (above delivery) - show only when product has warning key
    let warningHTML = '';
    if (product.warning) {
      warningHTML = `
            <div class="product-detail__warning">
              <p class="text-normal">${product.warning}</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_WARNING\}\}/g, warningHTML);

    // Handle delivery text (delivery: false omits the block; string = custom; omit key = default copy)
    let deliveryHTML = '';
    if (product.delivery === false) {
      deliveryHTML = '';
    } else if (product.delivery) {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> ${product.delivery}</p>
            </div>`;
    } else {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>${labels.shop_deliveryLabel}</b> ${labels.shop_deliveryDefault}</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_DELIVERY\}\}/g, deliveryHTML);

    pageContent = pageContent.replace(/\{\{PRODUCT_SERVICE_SUMMARY\}\}/g, buildProductServiceSummaryHTML(product));

    // Handle payment section
    let paymentHTML = '';
    let paymentTextHTML = '';

    paymentHTML = `
            <div class="product-detail__payment">
              ${paymentTextHTML}
              <div class="product-detail__payment-methods">
                <span class="text-normal">${labels.shop_paymentMethods}</span>
                <img src="../../img/shop/revolut.svg" alt="Revolut" class="product-detail__payment-icon"/>
                <img src="../../img/shop/visa.svg" alt="Visa" class="product-detail__payment-icon"/>
                <img src="../../img/shop/mastercard.svg" alt="Mastercard" class="product-detail__payment-icon"/>
                <img src="./img/shop/cash.svg" alt="Cash" class="product-detail__payment-icon"/>
              </div>
            </div>`;
    pageContent = pageContent.replace(/\{\{PRODUCT_PAYMENT\}\}/g, paymentHTML);

    // Handle setup options (e.g. "Choose your setup" cards)
    let setupHTML = '';
    if (product.setupOptions && Array.isArray(product.setupOptions) && product.setupOptions.length > 0) {
      const setupLabel = product.setupLabel || 'Choose your setup:';
      const setupCards = product.setupOptions.map((opt, index) => {
        const isActive = index === 0 ? ' active' : '';
        const title = (opt.title || '').replace(/"/g, '&quot;');
        const iconBluePath = (opt.iconBlue || '').replace(/^\.\.\//, '../../').replace(/^\.\//, '../../');
        const iconWhitePath = (opt.iconWhite || '').replace(/^\.\.\//, '../../').replace(/^\.\//, '../../');
        const iconHTML = (iconBluePath || iconWhitePath)
          ? `<span class="product-detail__setup-icon-wrap" aria-hidden="true">
              ${iconBluePath ? `<img src="${iconBluePath}" alt="" class="product-detail__setup-icon product-detail__setup-icon--blue"/>` : ''}
              ${iconWhitePath ? `<img src="${iconWhitePath}" alt="" class="product-detail__setup-icon product-detail__setup-icon--white"/>` : ''}
            </span>`
          : '';
        const totalOld = typeof opt.totalOld === 'number' ? `€ ${opt.totalOld.toFixed(2)}` : (opt.totalOld || '');
        const totalAdd = typeof opt.totalAdd === 'number' ? `+ € ${opt.totalAdd.toFixed(2)}` : (opt.totalAdd || '');
        const totalParts = [
          totalOld ? `<span class="product-detail__setup-total-old">${totalOld}</span>` : '',
          totalAdd ? `<span class="product-detail__setup-total-add">${totalAdd}</span>` : ''
        ].filter(Boolean).join(' ');

        const bullets = (opt.bullets && Array.isArray(opt.bullets))
          ? opt.bullets.map(b => `<li class="text-normal">${b}</li>`).join('')
          : '';

        return `                <button type="button" class="product-detail__setup-card${isActive}" data-setup-title="${title}" data-setup-id="${(opt.id || '').replace(/"/g, '&quot;')}">
                  <div class="text-normal product-detail__setup-card-head">
                    <span class="product-detail__setup-title text-normal">${opt.title || ''}</span>
                    ${iconHTML}
                  </div>
                  <ul class="product-detail__setup-bullets">
                    ${bullets}
                  </ul>
                  <div class="product-detail__setup-total">
                    <span class="text-normal"><b>Total:</b></span>
                    <span class="text-normal product-detail__setup-total-values">${totalParts}</span>
                  </div>
                </button>`;
      }).join('\n');

      setupHTML = `
            <div class="product-detail__setup">
              <label class="text-normal product-detail__setup-label"><b>${setupLabel}</b></label>
              <div class="product-detail__setup-cards">
${setupCards}
              </div>
              <input type="hidden" name="SETUP" id="product-setup" value="${(product.setupOptions[0].id || product.setupOptions[0].title || '').replace(/"/g, '&quot;')}">
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_SETUP\}\}/g, setupHTML);

    // Handle product variants (e.g. robot vacuum model choice)
    let variantsHTML = '';
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
      const variantLabel = getVariantLabel(product);
      const variantCards = product.variants.map((v, index) => {
        const isActive = index === 0 ? ' active' : '';
        const oldPriceHTML = v.oldPrice ? `<span class="product-detail__variant-price-old">${formatProductPrice(v.oldPrice)}</span>` : '';
        return `                <button type="button" class="product-detail__variant-card${isActive}" data-variant-name="${(v.name || '').replace(/"/g, '&quot;')}" data-variant-id="${(v.id || v.name || '').replace(/"/g, '&quot;')}">
${buildVariantImageHTML(v, '../../')}
                  <div class="product-detail__variant-info">
                    <span class="product-detail__variant-name text">${v.name || ''}</span>
${buildVariantInclInstallHTML(product, labels)}                    <div class="product-detail__variant-prices">
                      ${oldPriceHTML}
                      <span class="product-detail__variant-price text">€ ${(v.price || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </button>`;
      }).join('\n');

      variantsHTML = `
            <div class="product-detail__variants">
${buildVariantLabelHTML(variantLabel)}              <div class="product-detail__variant-cards">
${variantCards}
              </div>
              <input type="hidden" name="VARIANT" id="product-variant" value="${(product.variants[0].id || product.variants[0].name || '').replace(/"/g, '&quot;')}">
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_VARIANTS\}\}/g, variantsHTML);

    // Handle features
    let featuresHTML = '';
    if (product.features && product.features.length > 0) {
      featuresHTML = product.features.map(feature =>
        `<li class="text-normal">${feature}</li>`
      ).join('\n              ');
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_FEATURES\}\}/g, featuresHTML);

    // Handle benefits
    let benefitsHTML = '';
    if (product.benefits && product.benefits.length > 0) {
      benefitsHTML = product.benefits.map(benefit =>
        `<li class="text-normal">${benefit}</li>`
      ).join('\n              ');
    } else {
      // Default benefits if not specified
      benefitsHTML = `
              <li class="text-normal">Energy Efficiency - Schedule and automate your boiler heating for optimal savings</li>
              <li class="text-normal">Remote Control - Turn your boiler on or off from anywhere using your smartphone</li>
              <li class="text-normal">Smart Home Integration - Connect it to your existing smart home ecosystem</li>
              <li class="text-normal">Peace of Mind - No more worrying about whether you left the heater on</li>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_BENEFITS\}\}/g, benefitsHTML);

    // Handle optional extra sections (rich HTML blocks for special products)
    const extraSectionsHTML = product.extraSectionsHtml || '';
    pageContent = pageContent.replace(/\{\{PRODUCT_EXTRA_SECTIONS\}\}/g, extraSectionsHTML);

    // Handle "How It Works" section - flexible configuration
    let howItWorksHTML = '';
    if (hasCustomHowItWorksHtml(product)) {
      howItWorksHTML = product.howItWorksHtml;
    } else if (product.howItWorksSteps && Array.isArray(product.howItWorksSteps) && product.howItWorksSteps.length > 0) {
      const gridClass = `grid-${product.howItWorksSteps.length}`;
      const stepsHTML = product.howItWorksSteps.map(step => {
        const imagePath = step.image ? step.image.replace(/^\.\//, '../') : '../../img/shop/delivery.png';
        return `            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="${imagePath}" alt="${step.title || ''}"/>
              </div>
              <h3 class="text">${step.title || ''}</h3>
              <p class="text-normal">${step.description || ''}</p>
            </div>`;
      }).join('\n');

      howItWorksHTML = `
        <div class="product-detail__how-it-works">
          <h2 class="subtitle">HOW IT WORKS</h2>
          <div class="product-detail__steps grid ${gridClass}">
${stepsHTML}
          </div>
        </div>`;
    } else if (!isHowItWorksDisabled(product)) {
      howItWorksHTML = `
        <div class="product-detail__how-it-works">
          <h2 class="subtitle">${labels.shop_howItWorks}</h2>
          <div class="product-detail__steps grid grid-4">
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/delivery.png" alt="${labels.shop_stepDeliveryTitle}"/>
              </div>
              <h3 class="text">${labels.shop_stepDeliveryTitle}</h3>
              <p class="text-normal">${labels.shop_stepDeliveryText}</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/setup.png" alt="${labels.shop_stepSetupTitle}"/>
              </div>
              <h3 class="text">${labels.shop_stepSetupTitle}</h3>
              <p class="text-normal">${labels.shop_stepSetupText}</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/training.png" alt="${labels.shop_stepTrainingTitle}"/>
              </div>
              <h3 class="text">${labels.shop_stepTrainingTitle}</h3>
              <p class="text-normal">${labels.shop_stepTrainingText}</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/perfomance.png" alt="${labels.shop_stepPerformanceTitle}"/>
              </div>
              <h3 class="text">${labels.shop_stepPerformanceTitle}</h3>
              <p class="text-normal">${labels.shop_stepPerformanceText}</p>
            </div>
          </div>
        </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_HOW_IT_WORKS\}\}/g, howItWorksHTML);

    // Handle availability
    const availabilityText = product.available ? labels.shop_available : labels.shop_notAvailable;
    pageContent = pageContent.replace(/\{\{PRODUCT_AVAILABILITY\}\}/g, availabilityText);

    const prefilledComment = buildPrefilledComment(product, locale);
    pageContent = pageContent.replace(/\{\{PRODUCT_COMMENT_PREFILL\}\}/g, prefilledComment);

    // Handle address field (not used by current products; kept for template compatibility)
    let addressFieldHTML = '';
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDRESS_FIELD\}\}/g, addressFieldHTML);

    // Handle form intro text
    const formIntroText = labels.shop_formIntro;
    pageContent = pageContent.replace(/\{\{PRODUCT_FORM_INTRO\}\}/g, formIntroText);

    // Handle quantity selector for products with additionalUnitPrice (AC and Underfloor Heating)
    const quantitySelectorHTML = '';
    pageContent = pageContent.replace(/\{\{PRODUCT_QUANTITY_SELECTOR\}\}/g, quantitySelectorHTML);

    pageContent = pageContent.replace(/href="\.\/shop\.html"/g, 'href="./"');
    pageContent = pageContent.replace(/href="\.\/contact-us/g, 'href="../contact-us');

    if (locale === 'ru') {
      pageContent = pageContent.replace(/\.\.\/\.\.\/partials/g, '../../../partials');
      pageContent = pageContent.replace(/href="\.\.\/contact-us/g, 'href="../../contact-us');
    }

    fs.writeFileSync(outputPath, pageContent, 'utf8');
    generatedCount++;
    });
  });

  console.log(`Product pages: ${generatedCount} generated, ${skippedCount} skipped (existing)`);
  cb();
};

// Root-absolute paths work from / and /ru/ at any nesting depth
function normalizeAssetPathsInHtml(content, filePath) {
  content = content.replace(/href="@assetPrefix\/?/g, 'href="/');
  content = content.replace(/src="@assetPrefix\/?/g, 'src="/');
  content = content.replace(/href="(\.\.\/)+styles\//g, 'href="/styles/');
  content = content.replace(/href="styles\//g, 'href="/styles/');
  content = content.replace(/src="(\.\.\/)+js\//g, 'src="/js/');
  content = content.replace(/src="js\//g, 'src="/js/');
  content = content.replace(/src="(\.\.\/)+img\//g, 'src="/img/');
  content = content.replace(/href="(\.\.\/)+img\//g, 'href="/img/');
  content = content.replace(/src="\.\/img\//g, 'src="/img/');
  content = content.replace(/href="\.\/img\//g, 'href="/img/');
  content = content.replace(/href="(\.\.\/)+resources\//g, 'href="/resources/');
  content = content.replace(/href="\.\/resources\//g, 'href="/resources/');

  const isShopPage = filePath.includes(`${path.sep}shop${path.sep}`);
  if (isShopPage) {
    content = content.replace(
      /href="\.\/(about-us|why-smart-home|solutions|cyprus-lifestyle|for-construction|contact-us|privacy-policy)"/g,
      'href="../$1"'
    );
    content = content.replace(/href="\.\/shop"/g, 'href="./"');
    content = content.replace(/@include\('\.\/userConsent\.html'\)/g, "@include('../userConsent.html')");
  }

  return content;
}

const fixAssetPaths = (cb) => {
  const distRoot = path.join(__dirname, 'dist');
  if (!fs.existsSync(distRoot)) {
    return cb();
  }

  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }
      if (!entry.name.endsWith('.html')) return;

      const content = normalizeAssetPathsInHtml(
        fs.readFileSync(fullPath, 'utf8'),
        fullPath
      );
      fs.writeFileSync(fullPath, content, 'utf8');
    });
  }

  walk(distRoot);
  cb();
};

// Backwards-compatible alias used in watch tasks
const fixShopAssetPaths = fixAssetPaths;

// Process generated product pages with file-include (including nested shop/*/index.html)
const processProductPages = parallel(
  ...LOCALES.map((locale) => function processProductPagesLocale() {
    return pipePagesForLocale(locale)
      .pipe(dest(distDirForLocale(locale)))
      .pipe(browserSync.stream());
  })
);

const htmlInclude = parallel(
  ...LOCALES.map((locale) => function htmlIncludeLocale() {
    return src('src/*.html')
      .pipe(fileInclude(fileIncludeOptions(locale)))
      .pipe(dest(distDirForLocale(locale)))
      .pipe(browserSync.stream());
  })
);

const svgSprites = () => {
    const svgDir = path.join(__dirname, 'src', 'img', 'svg');
    if (!fs.existsSync(svgDir)) return Promise.resolve();
    const svgFiles = fs.readdirSync(svgDir).filter((file) => file.endsWith('.svg'));
    if (svgFiles.length === 0) return Promise.resolve();

    return src('src/img/svg/**/*.svg')
      .pipe(svgSprite({
          mode: {
              stack: {
                  sprite: '../sprite.svg'
              }
          }
      }))
      .pipe(dest('dist/assets/images'))
}

const scriptsApp = () => {
    return src([
      ...BUNDLED_VENDOR_JS,
      'src/js/data/products.js', // Load products data first
      'src/js/data/products.ru.js',
      'src/js/orderComment.js',
      'src/js/helpers.js',
      'src/js/components/*.js',
      'src/js/main.js',
    ])
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(babelApp)
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglifyBundle)
    .pipe(sourceMaps.write())
    .pipe(dest('dist/js/'));
};

const scripts = series(scriptsApp, prependIntlTelInputToMainJsTask('dist'));

const images = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg',
        'src/assets/img/**/*.gif',
    ])
    .pipe(dest('dist/img'))
}

const stylesBuildMain = () => {
    return src([
      'src/assets/styles/**/*.css',
      '!src/assets/styles/main.min.css',
      '!src/assets/styles/vendor/intlTelInput.min.css',
    ])
    .pipe(concat('main.css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(autoPrefixes({
        cascade: false
    }))
    .pipe(mediaQueries())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('dist/styles/'))
};

const stylesBuild = series(stylesBuildMain, appendIntlTelInputToMainCssTask('dist'));

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
            serveStaticOptions: {
              extensions: ['html']
          }
        }
    })
}

async function watchAll() {
  const rebuildHtml = series(htmlInclude, htmlPages, processProductPages, fixAssetPaths);

  watch('src/js/data/products.js', series(generateProductPages, processProductPages, fixAssetPaths));
  watch('src/pages/templates/*.html', series(generateProductPages, processProductPages, fixAssetPaths));
  watch(['src/index.html', 'src/partials/**', 'src/pages/**'], rebuildHtml);
  watch('src/i18n/**/*.json', rebuildHtml);
  watch('src/assets/styles/**/*.css', styles);
  watch('src/assets/img/svg/**/*.svg', svgSprites);
  watch('src/js/**/*.js', scripts);
  watch('src/assets/img/**/*.{jpg,jpeg,png,svg,gif}', images);
  watch('src/resources/**', resources);
  watch('src/docs/**', docs);
}

exports.clean = clean;
exports.docs = docs;
exports.styles = styles;
exports.htmlInclude = htmlInclude;
exports.scripts = scripts;
exports.default = series(clean, resources, docs, generateProductPages, htmlInclude, htmlPages, processProductPages, scripts, styles, images, fixAssetPaths, svgSprites, watchAll, watchFiles)

const minImages = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg',
    ])
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

const scriptsBuildApp = () => {
    return src([
      ...BUNDLED_VENDOR_JS,
      'src/js/data/products.js', // Load products data first
      'src/js/data/products.ru.js',
      'src/js/orderComment.js',
      'src/js/helpers.js',
      'src/js/components/*.js',
      'src/js/main.js',
    ])
    .pipe(babelApp)
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglifyBundle)
    .pipe(dest('dist/js/'));
};

const scriptsBuild = series(scriptsBuildApp, prependIntlTelInputToMainJsTask('dist'));

const htmlPagesMinify = parallel(
  ...LOCALES.map((locale) => function htmlPagesMinifyLocale() {
    return pipePagesForLocale(locale)
      .pipe(htmlMin({
        collapseWhitespace: true,
      }))
      .pipe(dest(distDirForLocale(locale)));
  })
);

const generateProductPagesBuild = (cb) => {
  return generateProductPages(cb);
};

const htmlMinify = parallel(
  ...LOCALES.map((locale) => function htmlMinifyLocale() {
    return src('src/*.html')
      .pipe(fileInclude(fileIncludeOptions(locale)))
      .pipe(htmlMin({
        collapseWhitespace: true,
      }))
      .pipe(dest(distDirForLocale(locale)));
  })
);


const fixShopAssetPathsBuild = (cb) => {
  return fixShopAssetPaths(cb);
};

// Shop-specific tasks for standalone build
const cleanShop = () => {
  return del(['shopBuild']);
};

// Generate product pages for standalone shop build
const generateProductPagesShop = (cb) => {
  // Read products data
  const productsPath = path.join(__dirname, 'src/js/data/products.js');
  if (!fs.existsSync(productsPath)) {
    console.warn('Products data file not found, skipping product page generation');
    return cb();
  }

  const productsContent = fs.readFileSync(productsPath, 'utf8');
  const productsMatch = productsContent.match(/const products = (\[[\s\S]*?\]);/);
  if (!productsMatch) {
    console.error('Could not parse products data. Make sure products.js exports a products array.');
    return cb();
  }

  let products;
  try {
    eval(`products = ${productsMatch[1]}`);
    if (!Array.isArray(products)) {
      throw new Error('Products is not an array');
    }
  } catch (e) {
    console.error('Error parsing products:', e.message);
    return cb();
  }

  // Read template
  const templatePath = path.join(__dirname, 'src/pages/templates/product-detail.html');
  if (!fs.existsSync(templatePath)) {
    console.warn('Product detail template not found, skipping product page generation');
    return cb();
  }
  let template = fs.readFileSync(templatePath, 'utf8');

  let generatedCount = 0;

  const labels = buildContext('en');

  // Generate a page for each product in shopBuild root
  products.forEach(product => {
    const shopBuildDir = path.join(__dirname, 'shopBuild');
    const outputPath = path.join(shopBuildDir, `${product.slug}.html`);

    // Create shopBuild directory if it doesn't exist
    if (!fs.existsSync(shopBuildDir)) {
      fs.mkdirSync(shopBuildDir, { recursive: true });
    }

    let pageContent = template;

    // Replace placeholders
    pageContent = pageContent.replace(/\{\{PRODUCT_TITLE\}\}/g, product.title);

    // Handle images array for Swiper - use root-relative paths for standalone build
    const images = product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : (product.image ? [product.image] : ['./img/shop/card-1.png']);

    // Generate thumbnail slides HTML - fix paths for standalone
    const thumbsHTML = images.map(img => {
      const imagePath = img.replace(/^\.\.\/img\//, './img/').replace(/^\.\/img\//, './img/');
      return `                  <div class="swiper-slide">
                    <img src="${imagePath}" alt="${product.title}"/>
                  </div>`;
    }).join('\n');

    // Generate main slides HTML
    const slidesHTML = images.map(img => {
      const imagePath = img.replace(/^\.\.\/img\//, './img/').replace(/^\.\/img\//, './img/');
      return `                  <div class="swiper-slide">
                    <img src="${imagePath}" alt="${product.title}"/>
                  </div>`;
    }).join('\n');

    // Replace image placeholders
    pageContent = pageContent.replace(/\{\{PRODUCT_IMAGES_THUMBS\}\}/g, thumbsHTML);
    pageContent = pageContent.replace(/\{\{PRODUCT_IMAGES_SLIDES\}\}/g, slidesHTML);

    pageContent = pageContent.replace(/\{\{PRODUCT_PRICE\}\}/g, formatProductPrice(product.price));

    // Handle old price
    const oldPriceHTML = product.oldPrice
      ? `<span class="text product-detail__price-old">${formatProductPrice(product.oldPrice)}</span>`
      : '';
    pageContent = pageContent.replace(/\{\{PRODUCT_OLD_PRICE\}\}/g, oldPriceHTML);

    // Handle additional pricing for multiple units
    let additionalPricingHTML = '';
    if (product.additionalUnitPrice && typeof product.price === 'number') {
      additionalPricingHTML = `
            <div class="product-detail__additional-pricing">
              <p class="text-normal">Get your first upgrade for <span class="product-detail__additional-price">€&nbsp${formatAdditionalPrice(product.price)}</span>. Each additional one is only <span class="product-detail__additional-price">€&nbsp+${formatAdditionalPrice(product.additionalUnitPrice)}</span>!</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_PRICING\}\}/g, additionalPricingHTML);

    // Handle description
    const description = product.fullDescription || product.description || '';
    const descriptionHTML = buildProductDescriptionHTML(description);
    pageContent = pageContent.replace(/\{\{PRODUCT_DESCRIPTION\}\}/g, descriptionHTML);

    // Handle color options
    let colorOptionsHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && !product.additionalOptions) {
      const colorSwatches = product.colors.map((color, index) => {
        const isActive = index === 0 ? ' active' : '';
        const colorValue = typeof color === 'string' ? color : (color.value || color);
        // Detect color name from hex value
        let colorName = typeof color === 'object' && color.name ? color.name : '';
        if (!colorName) {
          if (colorValue === '#0080ea' || colorValue.toLowerCase() === '#0080ea') colorName = 'blue';
          else if (colorValue === '#ff2caf' || colorValue.toLowerCase() === '#ff2caf') colorName = 'pink';
          else if (colorValue === '#ffd217' || colorValue.toLowerCase() === '#ffd217') colorName = 'yellow';
          else colorName = colorValue;
        }
        const colorLabel = typeof color === 'object' && color.label ? color.label : colorName;
        // Map color index to image index (0=blue->card-1, 1=pink->card-3, 2=yellow->card-2)
        return `                <button type="button" class="product-detail__color-swatch${isActive}" data-color="${colorValue}" data-color-name="${colorName}" data-image-index="${index}" aria-label="Select ${colorLabel} color" style="background-color: ${colorValue};"></button>`;
      }).join('\n');

      const defaultColor = typeof product.colors[0] === 'string' ? product.colors[0] : (product.colors[0].value || product.colors[0]);
      let defaultColorName = typeof product.colors[0] === 'object' && product.colors[0].name ? product.colors[0].name : '';
      if (!defaultColorName) {
        if (defaultColor === '#0080ea' || defaultColor.toLowerCase() === '#0080ea') defaultColorName = 'blue';
        else if (defaultColor === '#ff2caf' || defaultColor.toLowerCase() === '#ff2caf') defaultColorName = 'pink';
        else if (defaultColor === '#ffd217' || defaultColor.toLowerCase() === '#ffd217') defaultColorName = 'yellow';
        else defaultColorName = defaultColor;
      }

      colorOptionsHTML = `
            <div class="product-detail__color-options">
              <label class="text-normal">Color:</label>
              <div class="product-detail__color-swatches">
${colorSwatches}
              </div>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_COLOR_OPTIONS\}\}/g, colorOptionsHTML);

    // Handle color input in form (separate from color options display)
    let colorInputHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && !product.additionalOptions) {
      const defaultColor = typeof product.colors[0] === 'string' ? product.colors[0] : (product.colors[0].value || product.colors[0]);
      let defaultColorName = typeof product.colors[0] === 'object' && product.colors[0].name ? product.colors[0].name : '';
      if (!defaultColorName) {
        if (defaultColor === '#0080ea' || defaultColor.toLowerCase() === '#0080ea') defaultColorName = 'blue';
        else if (defaultColor === '#ff2caf' || defaultColor.toLowerCase() === '#ff2caf') defaultColorName = 'pink';
        else if (defaultColor === '#ffd217' || defaultColor.toLowerCase() === '#ffd217') defaultColorName = 'yellow';
        else defaultColorName = defaultColor;
      }
      colorInputHTML = `<input type="hidden" name="COLOR" id="product-color" value="${defaultColorName}">`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_COLOR_INPUT\}\}/g, colorInputHTML);

    // Handle additional options (e.g. altruist sensor options)
    let additionalOptionsHTML = '';
    let additionalOptionsInputsHTML = '';
    if (product.additionalOptions && Array.isArray(product.additionalOptions) && product.additionalOptions.length > 0) {
      additionalOptionsHTML = product.additionalOptions.map(optionGroup => {
        const optionItems = optionGroup.values.map((val, index) => {
          const isActive = index === 0 ? ' active' : '';
          if (optionGroup.type === 'color') {
            return `                <button type="button" class="product-detail__option-swatch product-detail__option-swatch--color${isActive}" data-value-id="${val.id}" data-value-label="${val.label}" aria-label="Select ${val.label}" style="background-color: ${val.value};"></button>`;
          } else if (optionGroup.type === 'icon') {
            return `                <button type="button" class="product-detail__option-swatch product-detail__option-swatch--icon${isActive}" data-value-id="${val.id}" data-value-label="${val.label}" aria-label="Select ${val.label}">${val.icon}</button>`;
          }
          return '';
        }).join('');

        return `
            <div class="product-detail__option-group" data-option="${optionGroup.option}" data-option-name="${optionGroup.name}">
              <label class="text-normal">${optionGroup.name}:</label>
              <div class="product-detail__option-swatches">
${optionItems}
              </div>
            </div>`;
      }).join('');

      // Create hidden inputs for each option group
      additionalOptionsInputsHTML = product.additionalOptions.map(optionGroup => {
        const defaultValue = optionGroup.values[0] ? optionGroup.values[0].id : '';
        return `<input type="hidden" name="option[${optionGroup.option}]" id="opt-${optionGroup.option}" value="${defaultValue}">`;
      }).join('');
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_OPTIONS\}\}/g, additionalOptionsHTML);
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_OPTIONS_INPUTS\}\}/g, additionalOptionsInputsHTML);

    // Handle warning (above delivery) - show only when product has warning key
    let warningHTML = '';
    if (product.warning) {
      warningHTML = `
            <div class="product-detail__warning">
              <p class="text-normal">${product.warning}</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_WARNING\}\}/g, warningHTML);

    // Handle delivery text (delivery: false omits the block; string = custom; omit key = default copy)
    let deliveryHTML = '';
    if (product.delivery === false) {
      deliveryHTML = '';
    } else if (product.delivery) {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> ${product.delivery}</p>
            </div>`;
    } else {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>${labels.shop_deliveryLabel}</b> ${labels.shop_deliveryDefault}</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_DELIVERY\}\}/g, deliveryHTML);

    pageContent = pageContent.replace(/\{\{PRODUCT_SERVICE_SUMMARY\}\}/g, buildProductServiceSummaryHTML(product));

    // Handle payment section
    let paymentHTML = '';
    let paymentTextHTML = '';

    paymentHTML = `
            <div class="product-detail__payment">
              ${paymentTextHTML}
              <div class="product-detail__payment-methods">
                <span class="text-normal">${labels.shop_paymentMethods}</span>
                <img src="./img/shop/revolut.svg" alt="Revolut" class="product-detail__payment-icon"/>
                <img src="./img/shop/visa.svg" alt="Visa" class="product-detail__payment-icon"/>
                <img src="./img/shop/mastercard.svg" alt="Mastercard" class="product-detail__payment-icon"/>
                <img src="./img/shop/cash.svg" alt="Cash" class="product-detail__payment-icon"/>
              </div>
            </div>`;
    pageContent = pageContent.replace(/\{\{PRODUCT_PAYMENT\}\}/g, paymentHTML);

    // Handle setup options (e.g. "Choose your setup" cards)
    let setupHTML = '';
    if (product.setupOptions && Array.isArray(product.setupOptions) && product.setupOptions.length > 0) {
      const setupLabel = product.setupLabel || 'Choose your setup:';
      const setupCards = product.setupOptions.map((opt, index) => {
        const isActive = index === 0 ? ' active' : '';
        const title = (opt.title || '').replace(/"/g, '&quot;');
        const iconBluePath = (opt.iconBlue || '').replace(/^\.\.\//, '../../').replace(/^\.\//, '../../');
        const iconWhitePath = (opt.iconWhite || '').replace(/^\.\.\//, '../../').replace(/^\.\//, '../../');
        const iconHTML = (iconBluePath || iconWhitePath)
          ? `<span class="product-detail__setup-icon-wrap" aria-hidden="true">
              ${iconBluePath ? `<img src="${iconBluePath}" alt="" class="product-detail__setup-icon product-detail__setup-icon--blue"/>` : ''}
              ${iconWhitePath ? `<img src="${iconWhitePath}" alt="" class="product-detail__setup-icon product-detail__setup-icon--white"/>` : ''}
            </span>`
          : '';
        const totalOld = typeof opt.totalOld === 'number' ? `€ ${opt.totalOld.toFixed(2)}` : (opt.totalOld || '');
        const totalAdd = typeof opt.totalAdd === 'number' ? `+ € ${opt.totalAdd.toFixed(2)}` : (opt.totalAdd || '');
        const totalParts = [
          totalOld ? `<span class="product-detail__setup-total-old">${totalOld}</span>` : '',
          totalAdd ? `<span class="product-detail__setup-total-add">${totalAdd}</span>` : ''
        ].filter(Boolean).join(' ');

        const bullets = (opt.bullets && Array.isArray(opt.bullets))
          ? opt.bullets.map(b => `<li class="text-normal">${b}</li>`).join('')
          : '';

        return `                <button type="button" class="product-detail__setup-card${isActive}" data-setup-title="${title}" data-setup-id="${(opt.id || '').replace(/"/g, '&quot;')}">
                  <div class="product-detail__setup-card-head">
                    <span class="text-normal product-detail__setup-title">${opt.title || ''}</span>
                    ${iconHTML}
                  </div>
                  <ul class="product-detail__setup-bullets">
                    ${bullets}
                  </ul>
                  <div class="product-detail__setup-total">
                    <span class="text-normal"><b>Total:</b></span>
                    <span class="text-normal product-detail__setup-total-values">${totalParts}</span>
                  </div>
                </button>`;
      }).join('\n');

      setupHTML = `
            <div class="product-detail__setup">
              <label class="text-normal product-detail__setup-label"><b>${setupLabel}</b></label>
              <div class="product-detail__setup-cards">
${setupCards}
              </div>
              <input type="hidden" name="SETUP" id="product-setup" value="${(product.setupOptions[0].id || product.setupOptions[0].title || '').replace(/"/g, '&quot;')}">
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_SETUP\}\}/g, setupHTML);

    // Handle product variants (e.g. robot vacuum model choice) - standalone build
    let variantsHTML = '';
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
      const variantLabel = getVariantLabel(product);
      const variantCards = product.variants.map((v, index) => {
        const isActive = index === 0 ? ' active' : '';
        const oldPriceHTML = v.oldPrice ? `<span class="product-detail__variant-price-old">${formatProductPrice(v.oldPrice)}</span>` : '';
        return `                <button type="button" class="product-detail__variant-card${isActive}" data-variant-name="${(v.name || '').replace(/"/g, '&quot;')}" data-variant-id="${(v.id || v.name || '').replace(/"/g, '&quot;')}">
${buildVariantImageHTML(v, './img/')}
                  <div class="product-detail__variant-info">
                    <span class="product-detail__variant-name text">${v.name || ''}</span>
${buildVariantInclInstallHTML(product, labels)}                    <div class="product-detail__variant-prices">
                      ${oldPriceHTML}
                      <span class="product-detail__variant-price text">€ ${(v.price || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </button>`;
      }).join('\n');

      variantsHTML = `
            <div class="product-detail__variants">
${buildVariantLabelHTML(variantLabel)}              <div class="product-detail__variant-cards">
${variantCards}
              </div>
              <input type="hidden" name="VARIANT" id="product-variant" value="${(product.variants[0].id || product.variants[0].name || '').replace(/"/g, '&quot;')}">
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_VARIANTS\}\}/g, variantsHTML);

    // Handle features
    let featuresHTML = '';
    if (product.features && product.features.length > 0) {
      featuresHTML = product.features.map(feature =>
        `<li class="text-normal">${feature}</li>`
      ).join('\n              ');
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_FEATURES\}\}/g, featuresHTML);

    // Handle benefits
    let benefitsHTML = '';
    if (product.benefits && product.benefits.length > 0) {
      benefitsHTML = product.benefits.map(benefit =>
        `<li class="text-normal">${benefit}</li>`
      ).join('\n              ');
    } else {
      benefitsHTML = `
              <li class="text-normal">Energy Efficiency - Schedule and automate your boiler heating for optimal savings</li>
              <li class="text-normal">Remote Control - Turn your boiler on or off from anywhere using your smartphone</li>
              <li class="text-normal">Smart Home Integration - Connect it to your existing smart home ecosystem</li>
              <li class="text-normal">Peace of Mind - No more worrying about whether you left the heater on</li>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_BENEFITS\}\}/g, benefitsHTML);

    // Handle optional extra sections (rich HTML blocks for special products)
    const extraSectionsHTML = product.extraSectionsHtml || '';
    pageContent = pageContent.replace(/\{\{PRODUCT_EXTRA_SECTIONS\}\}/g, extraSectionsHTML);

    // Handle "How It Works" section - flexible configuration
    let howItWorksHTML = '';
    if (hasCustomHowItWorksHtml(product)) {
      howItWorksHTML = product.howItWorksHtml;
    } else if (product.howItWorksSteps && Array.isArray(product.howItWorksSteps) && product.howItWorksSteps.length > 0) {
      const gridClass = `grid-${product.howItWorksSteps.length}`;
      const stepsHTML = product.howItWorksSteps.map(step => {
        let imagePath = step.image || './img/shop/delivery.png';
        imagePath = imagePath.replace(/^\.\.\/img\//, './img/').replace(/^\.\/img\//, './img/');
        return `            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="${imagePath}" alt="${step.title || ''}"/>
              </div>
              <h3 class="text">${step.title || ''}</h3>
              <p class="text-normal">${step.description || ''}</p>
            </div>`;
      }).join('\n');

      howItWorksHTML = `
        <div class="product-detail__how-it-works">
          <h2 class="subtitle">HOW IT WORKS</h2>
          <div class="product-detail__steps grid ${gridClass}">
${stepsHTML}
          </div>
        </div>`;
    } else if (!isHowItWorksDisabled(product)) {
      howItWorksHTML = `
        <div class="product-detail__how-it-works">
          <h2 class="subtitle">HOW IT WORKS</h2>
          <div class="product-detail__steps grid grid-4">
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="./img/shop/delivery.png" alt="Fast Delivery"/>
              </div>
              <h3 class="text">FAST DELIVERY</h3>
              <p class="text-normal">We deliver across Cyprus within 24 hours after your order is placed.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="./img/shop/setup.png" alt="Installation & Setup"/>
              </div>
              <h3 class="text">INSTALLATION & SETUP</h3>
              <p class="text-normal">We install the equipment, connect your smart home system, and configure automations.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="./img/shop/training.png" alt="Training & Handover"/>
              </div>
              <h3 class="text">TRAINING & HANDOVER</h3>
              <p class="text-normal">We show you how to use the system, control it from your phone, and optimize daily operation.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="./img/shop/perfomance.png" alt="Performance Check"/>
              </div>
              <h3 class="text">PERFORMANCE CHECK</h3>
              <p class="text-normal">We monitor and test the system to ensure stable, correct, and reliable performance.</p>
            </div>
          </div>
        </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_HOW_IT_WORKS\}\}/g, howItWorksHTML);

    // Handle availability
    const availabilityText = product.available ? labels.shop_available : labels.shop_notAvailable;
    pageContent = pageContent.replace(/\{\{PRODUCT_AVAILABILITY\}\}/g, availabilityText);

    const prefilledComment = buildPrefilledComment(product, 'en');
    pageContent = pageContent.replace(/\{\{PRODUCT_COMMENT_PREFILL\}\}/g, prefilledComment);

    // Handle address field (not used by current products; kept for template compatibility)
    let addressFieldHTML = '';
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDRESS_FIELD\}\}/g, addressFieldHTML);

    const formIntroText = labels.shop_formIntro;
    pageContent = pageContent.replace(/\{\{PRODUCT_FORM_INTRO\}\}/g, formIntroText);

    const quantitySelectorHTML = '';
    pageContent = pageContent.replace(/\{\{PRODUCT_QUANTITY_SELECTOR\}\}/g, quantitySelectorHTML);

    // Fix template paths for standalone build (../../img -> ./img)
    // Handle all variations of relative paths
    pageContent = pageContent.replace(/src="\.\.\/\.\.\/img\//g, 'src="./img/');
    pageContent = pageContent.replace(/href="\.\.\/\.\.\/img\//g, 'href="./img/');
    pageContent = pageContent.replace(/src="\.\.\/img\//g, 'src="./img/');
    pageContent = pageContent.replace(/href="\.\.\/img\//g, 'href="./img/');

    // Write product page
    fs.writeFileSync(outputPath, pageContent, 'utf8');
    generatedCount++;
  });

  console.log(`Product pages: ${generatedCount} generated for shopBuild`);
  cb();
};

// Process shop HTML pages for standalone build (English -> shopBuild root)
const processShopPages = () => {
  return src(['src/pages/shop/**/*.html', '!src/pages/shop/ru/**'], { base: 'src/pages/shop' })
    .pipe(fileInclude(fileIncludeOptions('en')))
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('shopBuild'));
};

// Process Russian shop pages for standalone build (shopBuild/ru).
// RU product pages come from src/pages/shop/ru/*.html (generated by the main build);
// the shop index is shared (src/pages/shop/index.html) and rendered with RU strings.
const processShopPagesRu = () => {
  return src(['src/pages/shop/index.html', 'src/pages/shop/ru/*.html'], { base: 'src/pages/shop' })
    .pipe(fileInclude(fileIncludeOptions('ru')))
    .pipe(rename((filePath) => {
      const dir = filePath.dirname.replace(/\\/g, '/');
      if (dir === 'ru') {
        filePath.dirname = '.';
      }
    }))
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('shopBuild/ru'));
};

// Pre-render product cards into shop index (static HTML instead of JS-only),
// localized per locale. EN writes shopBuild/index.html, RU writes shopBuild/ru/index.html.
function makePreRenderShopIndex(locale) {
  const taskName = `preRenderShopIndex_${locale}`;
  const task = (cb) => {
    const localeDir = locale === 'en' ? 'shopBuild' : path.join('shopBuild', locale);
    const shopIndexPath = path.join(__dirname, localeDir, 'index.html');
    const productsPath = path.join(__dirname, 'src', 'js', 'data', 'products.js');

    if (!fs.existsSync(shopIndexPath) || !fs.existsSync(productsPath)) {
      return cb();
    }

    // Read products data
    const productsContent = fs.readFileSync(productsPath, 'utf8');
    const productsMatch = productsContent.match(/const products = (\[[\s\S]*?\]);/);
    if (!productsMatch) {
      console.error('Could not parse products data for shop index pre-render.');
      return cb();
    }

    let products;
    try {
      // Evaluate products array in build context
      // eslint-disable-next-line no-eval
      eval(`products = ${productsMatch[1]}`);
      if (!Array.isArray(products)) {
        throw new Error('Products is not an array');
      }
    } catch (e) {
      console.error('Error parsing products for shop index pre-render:', e.message);
      return cb();
    }

    const labels = buildContext(locale);
    const productsRuBySlug = locale === 'ru' ? loadProductsRuBySlug() : {};

    // Build cards HTML (mirror of productCard.js but static)
    const cardsHTML = products.map(product => {
      const ru = productsRuBySlug[product.slug];
      const title = (ru && ru.title) || product.title;
      const description = (ru && ru.description) || product.description;

      const isAvailable = product.available;
      const cardClass = isAvailable ? 'shop-content__card' : 'shop-content__card unavailable';
      const tagClass = isAvailable ? 'text-normal shop-content__tag' : 'text-normal shop-content__tag shop-content__tag--not-available';
      const tagText = isAvailable ? labels.shop_available : labels.shop_notAvailable;

      // Static link to product detail page in the same locale folder
      const linkHref = isAvailable ? `./${product.slug}.html` : '#';

      // Use first image from images array if available, otherwise fall back to image property
      const productImageRaw = (product.images && product.images.length > 0)
        ? product.images[0]
        : (product.image || './img/shop/card-1.png');

      // Emit ./img/ here; fixShopAssetPathsStandalone rewrites depth per locale
      const productImage = productImageRaw
        .replace(/^\.\.\/img\//, './img/')
        .replace(/^\.\/img\//, './img/');

      const oldPriceHTML = product.oldPrice
        ? `<span class="text shop-content__price-old">${formatProductPrice(product.oldPrice)}</span>`
        : '';

      return `
          <div class="${cardClass}">
            <a href="${linkHref}" class="shop-content__link">
              <div class="shop-content__img">
                <img src="${productImage}" alt="${title}"/>
              </div>
              <div class="shop-content__text">
                <h3 class="text">${title}</h3>
                <p class="text-normal">${description}</p>
                <div class="shop-content__price">
                  <span class="text shop-content__price-main">${formatProductPrice(product.price)}</span>
                  ${oldPriceHTML}
                </div>
              </div>
              <span class="${tagClass}">${tagText}</span>
            </a>
          </div>`;
    }).join('\n');

    // Inject into built index.html, replacing the JS placeholder
    let indexHtml = fs.readFileSync(shopIndexPath, 'utf8');

    const containerStart = '<div class="shop-content grid grid-4" id="products-container">';
    const containerIndex = indexHtml.indexOf(containerStart);
    if (containerIndex === -1) {
      console.error('Could not find products container in shop index for pre-render.');
      return cb();
    }

    const afterStartIndex = containerIndex + containerStart.length;
    const closingDivIndex = indexHtml.indexOf('</div>', afterStartIndex);
    if (closingDivIndex === -1) {
      console.error('Could not find closing </div> for products container in shop index.');
      return cb();
    }

    // Replace inner content of products container with static cards
    const before = indexHtml.substring(0, afterStartIndex);
    const after = indexHtml.substring(closingDivIndex);
    indexHtml = `${before}
          ${cardsHTML}
        ${after}`;

    fs.writeFileSync(shopIndexPath, indexHtml, 'utf8');
    console.log(`Pre-rendered product cards into ${path.join(localeDir, 'index.html')}`);
    cb();
  };
  Object.defineProperty(task, 'name', { value: taskName });
  return task;
}

const preRenderShopIndex = makePreRenderShopIndex('en');
const preRenderShopIndexRu = makePreRenderShopIndex('ru');

// Main site pages that live on GitHub Pages (not inside the OpenCart shop)
const MAIN_SITE_PAGES = 'about-us|why-smart-home|solutions|cyprus-lifestyle|for-construction|contact-us|privacy-policy';

/**
 * Rewrite paths for a standalone shop page.
 * EN pages sit at shopBuild root (assetPrefix "./"); RU pages sit in shopBuild/ru
 * and reference shared assets one level up (assetPrefix "../").
 */
function normalizeStandaloneShopHtml(content, { isRu }) {
  const assetPrefix = isRu ? '../' : './';
  const siteBase = isRu ? 'https://pinout.cloud/ru/' : 'https://pinout.cloud/';

  // Cross-links to the GitHub Pages site (keep as absolute external links)
  if (isRu) {
    content = content.replace(
      new RegExp(`href="/ru/(${MAIN_SITE_PAGES})"`, 'g'),
      `href="${siteBase}$1"`
    );
  }
  content = content.replace(
    new RegExp(`href="/(${MAIN_SITE_PAGES})"`, 'g'),
    'href="https://pinout.cloud/$1"'
  );
  content = content.replace(
    new RegExp(`href="\\.\\./(${MAIN_SITE_PAGES})"`, 'g'),
    'href="#contact"'
  );

  // Product detail links -> sibling .html file in the same locale folder
  if (isRu) {
    content = content.replace(/href="\/ru\/shop\/([^"]+)"/g, 'href="./$1.html"');
  }
  content = content.replace(/href="\/shop\/([^"]+)"/g, 'href="./$1.html"');
  content = content.replace(/href="\.\/shop\/([^"]+)"/g, 'href="./$1.html"');

  // Shop index + home links -> local index.html
  if (isRu) {
    content = content.replace(/href="\/ru\/shop"/g, 'href="./index.html"');
    content = content.replace(/href="\/ru\/"/g, 'href="./index.html"');
    content = content.replace(/href="\/ru"/g, 'href="./index.html"');
  }
  content = content.replace(/href="\/shop"/g, 'href="./index.html"');
  content = content.replace(/href="\.\/shop"/g, 'href="./index.html"');
  content = content.replace(/href="\/"/g, 'href="./index.html"');

  // Favicon shortcut used in <head>
  content = content.replace(
    /href="\/android-icon-192x192\.png"/g,
    `href="${assetPrefix}img/favicon/android-chrome-192x192.png"`
  );

  // Shared asset directories: normalize every relative/absolute form to assetPrefix
  ['styles', 'js', 'img', 'resources'].forEach((dir) => {
    content = content.replace(
      new RegExp(`(href|src|content)="(?:\\.\\./)+${dir}/`, 'g'),
      `$1="${assetPrefix}${dir}/`
    );
    content = content.replace(
      new RegExp(`(href|src|content)="\\./${dir}/`, 'g'),
      `$1="${assetPrefix}${dir}/`
    );
    content = content.replace(
      new RegExp(`(href|src|content)="/${dir}/`, 'g'),
      `$1="${assetPrefix}${dir}/`
    );
    content = content.replace(
      new RegExp(`(href|src|content)="${dir}/`, 'g'),
      `$1="${assetPrefix}${dir}/`
    );
  });

  return content;
}

// Fix asset paths in standalone shop build (EN at root, RU under /ru)
const fixShopAssetPathsStandalone = (cb) => {
  const shopBuildDir = path.join(__dirname, 'shopBuild');
  if (!fs.existsSync(shopBuildDir)) {
    return cb();
  }

  function processDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        if (file.name === 'temp') return;
        processDirectory(filePath);
      } else if (file.isFile() && file.name.endsWith('.html')) {
        const rel = path.relative(shopBuildDir, filePath);
        const isRu = rel.split(path.sep)[0] === 'ru';
        const content = normalizeStandaloneShopHtml(
          fs.readFileSync(filePath, 'utf8'),
          { isRu }
        );
        fs.writeFileSync(filePath, content, 'utf8');
      }
    });
  }

  processDirectory(shopBuildDir);
  cb();
};

// Process products.js and productCard.js for shop build - fix paths before bundling
const processProductsForShop = (cb) => {
  const productsPath = path.join(__dirname, 'src/js/data/products.js');
  const productCardPath = path.join(__dirname, 'src/js/components/productCard.js');
  const tempDir = path.join(__dirname, 'shopBuild', 'temp');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Process products.js - fix image paths
  if (fs.existsSync(productsPath)) {
    let productsContent = fs.readFileSync(productsPath, 'utf8');
    productsContent = productsContent.replace(/\.\.\/img\//g, './img/');
    fs.writeFileSync(path.join(tempDir, 'products.js'), productsContent, 'utf8');
  }

  // Process productCard.js - fix product links and image paths
  if (fs.existsSync(productCardPath)) {
    let productCardContent = fs.readFileSync(productCardPath, 'utf8');
    // Fix product links: /shop/${product.slug} -> ./${product.slug}.html
    productCardContent = productCardContent.replace(/\/shop\/\$\{([^}]+)\}/g, './${$1}.html');
    // Fix image paths
    productCardContent = productCardContent.replace(/\.\.\/img\//g, './img/');
    fs.writeFileSync(path.join(tempDir, 'productCard.js'), productCardContent, 'utf8');
  }

  cb();
};

// Build scripts for standalone shop
// Keep only what the shop pages actually need (no secret-code, no dynamic product cards)
const scriptsShopBuildApp = () => {
  return src([
    ...BUNDLED_VENDOR_JS,
    'src/js/helpers.js',               // Utility functions (stopScroll, getScroll for burger menu)
    'src/js/orderComment.js',
    'src/js/components/swiper.js',     // Swiper initialisation (shop/product pages)
    'src/js/components/productDetailForm.js', // Product detail form behaviour
    'src/js/main-shop.js',             // Burger menu + navigation (shop-specific)
  ], { allowEmpty: true })
  .pipe(babelApp)
  .pipe(concat('main.js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglifyBundle)
  .pipe(dest('shopBuild/js/'));
};

const scriptsShopBuild = series(scriptsShopBuildApp, prependIntlTelInputToMainJsTask('shopBuild'));

// Clean up temp files after build
const cleanShopTemp = (cb) => {
  const tempDir = path.join(__dirname, 'shopBuild', 'temp');
  if (fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(tempDir, file));
    });
    fs.rmdirSync(tempDir);
  }
  cb();
};

// Fix JavaScript paths for standalone shop build
const fixShopJSPaths = (cb) => {
  const jsPath = path.join(__dirname, 'shopBuild/js', MAIN_JS_OUTPUT);
  if (!fs.existsSync(jsPath)) {
    return cb();
  }

  let jsContent = fs.readFileSync(jsPath, 'utf8');
  const originalContent = jsContent;

  // First, fix any remaining image paths: ../img/ -> ./img/
  jsContent = jsContent.replace(/\.\.\/img\//g, './img/');
  jsContent = jsContent.replace(/\.\.\/\.\.\/img\//g, './img/');

  // Fix product links: /shop/product-slug -> ./product-slug.html
  // Known product slugs to replace
  const productSlugs = ['boiler-switch-upgrade', 'air-conditioner-upgrade', 'electric-underfloor-heating-upgrade'];

  // Replace known product slugs - be very specific to avoid matching image paths
  productSlugs.forEach(slug => {
    const escapedSlug = slug.replace(/-/g, '\\-');
    // Match /shop/slug but check context to avoid image paths
    jsContent = jsContent.replace(new RegExp(`/shop/${escapedSlug}(?![a-zA-Z0-9-./])`, 'g'), (match, offset, string) => {
      // Look at context before the match to see if it's part of an image path
      const contextStart = Math.max(0, offset - 50);
      const contextBefore = string.substring(contextStart, offset);

      // If we see "img" or "./img" before this, it's likely an image path, don't replace
      if (contextBefore.includes('img') || contextBefore.includes('./img') ||
          contextBefore.includes('"img') || contextBefore.includes("'img") ||
          contextBefore.match(/[\.\/]img[\/"']/)) {
        return match;
      }
      return `./${slug}.html`;
    });
  });

  // Handle any other /shop/ patterns that look like product links (not image paths)
  // This catches dynamic patterns like `/shop/${product.slug}`
  jsContent = jsContent.replace(/\/shop\/([a-zA-Z0-9-]+)/g, (match, slug, offset, string) => {
    // Skip common path words that appear in image paths
    if (slug === 'banners' || slug === 'img' || slug === 'shop' || slug.length < 3) {
      return match;
    }

    // Check context - if it's near "img", don't replace (it's an image path)
    const contextStart = Math.max(0, offset - 50);
    const contextBefore = string.substring(contextStart, offset);
    if (contextBefore.includes('img') || contextBefore.includes('./img') ||
        contextBefore.match(/[\.\/]img[\/"']/)) {
      return match;
    }

    // Only replace if it looks like a product slug (has hyphens)
    if (slug.includes('-') && slug.length > 5) {
      return `./${slug}.html`;
    }

    return match;
  });

  if (jsContent !== originalContent) {
    fs.writeFileSync(jsPath, jsContent, 'utf8');
    console.log('Fixed JavaScript paths for standalone shop build');
  }
  cb();
};

// Build styles for standalone shop
const stylesShopBuildMain = () => {
  return src([
    'src/assets/styles/**/*.css',
    '!src/assets/styles/main.min.css',
    '!src/assets/styles/vendor/intlTelInput.min.css',
    '!src/assets/styles/components/lang-switch.css',
  ])
    .pipe(concat('main.css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoPrefixes({
      cascade: false
    }))
    .pipe(mediaQueries())
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('shopBuild/styles/'));
};

const appendShopLangSwitchCss = (cb) => {
  const outputPath = path.join(__dirname, 'shopBuild', 'styles', 'main.min.css');
  const langSwitchPath = path.join(
    __dirname,
    'src',
    'assets',
    'styles',
    'components',
    'lang-switch.css'
  );

  if (fs.existsSync(outputPath) && fs.existsSync(langSwitchPath)) {
    const css = fs.readFileSync(langSwitchPath, 'utf8');
    fs.appendFileSync(outputPath, `\n/* language switch */\n${css}`, 'utf8');
  }
  cb();
};

const stylesShopBuild = series(
  stylesShopBuildMain,
  appendIntlTelInputToMainCssTask('shopBuild'),
  appendShopLangSwitchCss
);

// Copy shop images for standalone build
const shopImages = () => {
  return src([
    'src/assets/img/shop/**/*.jpg',
    'src/assets/img/shop/**/*.png',
    'src/assets/img/shop/**/*.svg',
    'src/assets/img/shop/**/*.jpeg',
  ])
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: false},
      ]
    })
  ]))
  .pipe(dest('shopBuild/img/shop'));
};

// Copy GIFs without processing (preserves animation)
const shopGifs = () => {
  return src([
    'src/assets/img/shop/**/*.gif',
  ])
  .pipe(dest('shopBuild/img/shop'));
};

// Copy flag sprites for intl-tel-input country dropdown
const shopFlags = () => {
  return src('src/assets/img/flags/**/*.png', { allowEmpty: true })
    .pipe(dest('shopBuild/img/flags'));
};

// Copy shared images needed by shop (logos, decor, etc.)
const shopSharedImages = () => {
  return src([
    'src/assets/img/logo*.svg',
    'src/assets/img/decor-legs*.svg',
    'src/assets/img/arrow.svg',
    'src/assets/img/swiper-arrow.svg',
  ])
  .pipe(imagemin([
    imagemin.svgo({
      plugins: [
        {removeViewBox: false},
      ]
    })
  ]))
  .pipe(dest('shopBuild/img'));
};

// Copy favicons for standalone shop
const shopFavicons = () => {
  return src('src/assets/img/favicon/**')
    .pipe(dest('shopBuild/img/favicon'));
};

// Copy resources for standalone shop
const shopResources = () => {
  return src('src/resources/**')
    .pipe(dest('shopBuild/resources'));
};

// Build shop only - standalone landing page in shopBuild directory
exports['build:shop'] = series(
  cleanShop,
  generateProductPagesShop,
  processShopPages,
  processShopPagesRu,
  preRenderShopIndex,
  preRenderShopIndexRu,
  processProductsForShop,
  scriptsShopBuild,
  fixShopJSPaths,
  cleanShopTemp,
  stylesShopBuild,
  shopImages,
  shopGifs,
  shopFlags,
  shopSharedImages,
  shopFavicons,
  shopResources,
  fixShopAssetPathsStandalone
);

exports['build:shop:styles'] = stylesShopBuild;
exports.build = series(clean, resources, docs, generateProductPagesBuild, htmlMinify, htmlPagesMinify, scriptsBuild, stylesBuild, minImages, fixAssetPaths, svgSprites)
