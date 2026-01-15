const { src, dest, series, watch } = require('gulp');
const fs = require('fs');
const path = require('path');

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
const clean = () =>  {
    return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist/resources'))
}

const styles = () => {
    return src('src/assets/styles/**/*.css')
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
    .pipe(browserSync.stream())
};

const htmlPages = () => {
    return src('src/pages/**/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

// Generate product detail pages dynamically
// Set to true to force regeneration of existing pages, false to skip them
const FORCE_REGENERATE_PRODUCT_PAGES = true; // Auto-regenerate when template or products.js changes

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

  // Generate a page for each product in shop/{slug}.html structure
  products.forEach(product => {
    const shopDir = path.join(__dirname, 'src/pages', 'shop');
    const outputPath = path.join(shopDir, `${product.slug}.html`);

    // Skip if file exists and we're not forcing regeneration
    if (!FORCE_REGENERATE_PRODUCT_PAGES && fs.existsSync(outputPath)) {
      skippedCount++;
      return; // Skip this product
    }

    // Create shop directory if it doesn't exist
    if (!fs.existsSync(shopDir)) {
      fs.mkdirSync(shopDir, { recursive: true });
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

    pageContent = pageContent.replace(/\{\{PRODUCT_PRICE\}\}/g, product.price.toFixed(2));

    // Handle old price
    const oldPriceHTML = product.oldPrice
      ? `<span class="text product-detail__price-old">€ ${product.oldPrice.toFixed(2)}</span>`
      : '';
    pageContent = pageContent.replace(/\{\{PRODUCT_OLD_PRICE\}\}/g, oldPriceHTML);

    // Handle additional pricing for multiple units
    let additionalPricingHTML = '';
    if (product.additionalUnitPrice) {
      additionalPricingHTML = `
            <div class="product-detail__additional-pricing">
              <p class="text-normal">Get your first upgrade for <span class="product-detail__additional-price">€&nbsp${product.price.toFixed(2)}</span>. Each additional one is only <span class="product-detail__additional-price">€&nbsp+${product.additionalUnitPrice.toFixed(2)}</span>!</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_PRICING\}\}/g, additionalPricingHTML);

    // Handle description
    const description = product.fullDescription || product.description;
    pageContent = pageContent.replace(/\{\{PRODUCT_DESCRIPTION\}\}/g, description);

    // Handle color options
    let colorOptionsHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
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
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
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

    // Handle delivery text
    let deliveryHTML = '';
    if (product.delivery) {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> ${product.delivery}</p>
            </div>`;
    } else {
      // Default delivery text
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> Within 24 hours, the service is available across Cyprus after placing your order.</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_DELIVERY\}\}/g, deliveryHTML);

    // Handle payment section (always show, but payment text is conditional)
    let paymentTextHTML = '';
    if (!product.paymentExtraTextOff) {
      // Show payment text unless paymentExtraTextOff is true
      const paymentText = product.payment || 'Payment is made after the service is completed.';
      paymentTextHTML = `<p class="text-normal"><b>Payment:</b> ${paymentText}</p>`;
    }
    
    const paymentHTML = `
            <div class="product-detail__payment">
              ${paymentTextHTML}
              <div class="product-detail__payment-methods">
                <span class="text-normal">Payment methods:</span>
                <img src="../../img/shop/revolut.svg" alt="Revolut" class="product-detail__payment-icon"/>
                <img src="../../img/shop/visa.svg" alt="Visa" class="product-detail__payment-icon"/>
                <img src="../../img/shop/mastercard.svg" alt="Mastercard" class="product-detail__payment-icon"/>
              </div>
            </div>`;
    pageContent = pageContent.replace(/\{\{PRODUCT_PAYMENT\}\}/g, paymentHTML);

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
    if (product.howItWorksHtml) {
      // Full HTML override for maximum flexibility
      howItWorksHTML = product.howItWorksHtml;
    } else if (product.howItWorksSteps && Array.isArray(product.howItWorksSteps) && product.howItWorksSteps.length > 0) {
      // Generate from steps array - more structured approach
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
    } else {
      // Default "How It Works" section
      howItWorksHTML = `
        <div class="product-detail__how-it-works">
          <h2 class="subtitle">HOW IT WORKS</h2>
          <div class="product-detail__steps grid grid-4">
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/delivery.png" alt="Fast Delivery"/>
              </div>
              <h3 class="text">FAST DELIVERY</h3>
              <p class="text-normal">We deliver across Cyprus within 24 hours after your order is placed.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/setup.png" alt="Installation & Setup"/>
              </div>
              <h3 class="text">INSTALLATION & SETUP</h3>
              <p class="text-normal">We install the equipment, connect your smart home system, and configure automations.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/training.png" alt="Training & Handover"/>
              </div>
              <h3 class="text">TRAINING & HANDOVER</h3>
              <p class="text-normal">We show you how to use the system, control it from your phone, and optimize daily operation.</p>
            </div>
            <div class="product-detail__step">
              <div class="product-detail__step-icon">
                <img src="../../img/shop/perfomance.png" alt="Performance Check"/>
              </div>
              <h3 class="text">PERFORMANCE CHECK</h3>
              <p class="text-normal">We monitor and test the system to ensure stable, correct, and reliable performance.</p>
            </div>
          </div>
        </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_HOW_IT_WORKS\}\}/g, howItWorksHTML);

    // Handle availability
    const availabilityText = product.available ?  'available' : 'Not available';
    pageContent = pageContent.replace(/\{\{PRODUCT_AVAILABILITY\}\}/g, availabilityText);

    // Handle prefilled comment (home-server doesn't need "automation")
    const automationText = (product.id === 'home-server' || product.slug === 'home-server') ? '' : ' automation';
    const prefilledComment = `I want ${product.title.toLowerCase()}${automationText}`;
    pageContent = pageContent.replace(/\{\{PRODUCT_COMMENT_PREFILL\}\}/g, prefilledComment);

    // Handle quantity selector for products with additionalUnitPrice (AC and Underfloor Heating)
    let quantitySelectorHTML = '';
    if (product.additionalUnitPrice) {
      quantitySelectorHTML = `
            <!-- QUANTITY -->
            <div>
              <label class="text-normal">quantity</label>
              <div class="product-detail__contact-methods">
                <button type="button" class="product-detail__contact-method active" data-quantity="1">1</button>
                <button type="button" class="product-detail__contact-method" data-quantity="2">2</button>
                <button type="button" class="product-detail__contact-method" data-quantity="3">3</button>
                <button type="button" class="product-detail__contact-method" data-quantity="4+">4+</button>
              </div>
              <input type="hidden" name="QUANTITY" id="quantity" value="1">
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_QUANTITY_SELECTOR\}\}/g, quantitySelectorHTML);

    // Fix breadcrumb and other relative links for shop/ structure
    pageContent = pageContent.replace(/href="\.\/shop\.html"/g, 'href="./"');
    pageContent = pageContent.replace(/href="\.\/contact-us/g, 'href="../contact-us');

    // Asset paths will be fixed by fixShopAssetPaths task after file-include processes them

    // Write product page
    fs.writeFileSync(outputPath, pageContent, 'utf8');
    generatedCount++;
  });

  console.log(`Product pages: ${generatedCount} generated, ${skippedCount} skipped (existing)`);
  cb();
};

// Fix asset paths in shop pages
const fixShopAssetPaths = (cb) => {
  const shopDir = path.join(__dirname, 'dist', 'shop');
  if (!fs.existsSync(shopDir)) {
    return cb();
  }

  function processDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        processDirectory(filePath);
      } else if (file.isFile() && file.name.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix asset paths (CSS, JS, images, resources)
        content = content.replace(/href="styles\//g, 'href="../styles/');
        content = content.replace(/src="js\//g, 'src="../js/');
        content = content.replace(/href="\.\/img\//g, 'href="../img/');
        content = content.replace(/src="\.\/img\//g, 'src="../img/');
        content = content.replace(/href="\.\/resources\//g, 'href="../resources/');

        // Fix navigation links in header/footer (change ./page to ../page)
        // But keep ./shop as is (it should go to ./ which is shop/index.html)
        content = content.replace(/href="\.\/(about-us|why-smart-home|solutions|cyprus-lifestyle|for-construction|contact-us|privacy-policy|for-cosntruction)"/g, 'href="../$1"');

        // Fix shop link - from shop pages, ./shop should go to ./ (shop index)
        content = content.replace(/href="\.\/shop"/g, 'href="./"');

        // Fix footer image path
        content = content.replace(/src="\.\/img\/decor-legs\.svg"/g, 'src="../img/decor-legs.svg');

        // Fix userConsent include path (if it's in the processed HTML)
        content = content.replace(/@include\('\.\/userConsent\.html'\)/g, "@include('../userConsent.html')");

        fs.writeFileSync(filePath, content, 'utf8');
      }
    });
  }

  processDirectory(shopDir);
  cb();
};

// Process generated product pages with file-include (including nested shop/*/index.html)
const processProductPages = () => {
  return src('src/pages/**/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const htmlInclude = () => {
    return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const svgSprites = () => {
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

const scripts = () => {
    return src([
      'src/js/vendor/*.js',
      'src/js/data/products.js', // Load products data first
      'src/js/helpers.js',
      'src/js/components/*.js',
      'src/js/main.js',
    ])
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel: true,
    }).on('error', notify.onError()))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream())
}

const images = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg',
    ])
    .pipe(dest('dist/img'))
}

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
  // Watch products data and template - regenerate pages when they change
  watch('src/js/data/products.js', series(generateProductPages, processProductPages, fixShopAssetPaths));
  watch('src/pages/templates/*.html', series(generateProductPages, processProductPages, fixShopAssetPaths));
  watch('src/pages/shop/**/*.html', series(processProductPages, fixShopAssetPaths));
  watch('src/**/*.html', htmlInclude);
  watch('src/**/*.html', htmlPages);
  watch('src/**/*.html', processProductPages);
  watch('src/assets/styles/**/*.css', styles);
  watch('src/assets/img/svg/**/*.svg', svgSprites);
  watch('src/js/**/*.js', scripts);
  watch('.src/assets/img/*.{jpg,jpeg,png,svg}', images);
  watch('.src/assets/img/**/*.{jpg,jpeg,png,svg}', images);
  watch('src/resources/**', resources);
}

exports.clean = clean;
exports.styles = styles;
exports.htmlInclude = htmlInclude;
exports.scripts = scripts;
exports.default = series(clean, resources, generateProductPages, htmlInclude, htmlPages, processProductPages, fixShopAssetPaths, scripts, styles, images, svgSprites, watchAll, watchFiles)

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

const stylesBuild = () => {
    return src('src/assets/styles/**/*.css')
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

const scriptsBuild = () => {
    return src([
      'src/js/vendor/*.js',
      'src/js/data/products.js', // Load products data first
      'src/js/helpers.js',
      'src/js/components/*.js',
      'src/js/main.js',
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel: true,
    }).on('error', notify.onError()))
    .pipe(dest('dist/js/'))
}

const htmlPagesMinify = () => {
  return src('src/pages/**/*.html')
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(htmlMin({
    collapseWhitespace: true,
  }))
  .pipe(dest('dist'))
};

const generateProductPagesBuild = (cb) => {
  return generateProductPages(cb);
};

const htmlMinify = () => {
    return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
};


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

    pageContent = pageContent.replace(/\{\{PRODUCT_PRICE\}\}/g, product.price.toFixed(2));

    // Handle old price
    const oldPriceHTML = product.oldPrice
      ? `<span class="text product-detail__price-old">€ ${product.oldPrice.toFixed(2)}</span>`
      : '';
    pageContent = pageContent.replace(/\{\{PRODUCT_OLD_PRICE\}\}/g, oldPriceHTML);

    // Handle additional pricing for multiple units
    let additionalPricingHTML = '';
    if (product.additionalUnitPrice) {
      additionalPricingHTML = `
            <div class="product-detail__additional-pricing">
              <p class="text-normal">Get your first upgrade for <span class="product-detail__additional-price">€&nbsp${product.price.toFixed(2)}</span>. Each additional one is only <span class="product-detail__additional-price">€&nbsp+${product.additionalUnitPrice.toFixed(2)}</span>!</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_ADDITIONAL_PRICING\}\}/g, additionalPricingHTML);

    // Handle description
    const description = product.fullDescription || product.description;
    pageContent = pageContent.replace(/\{\{PRODUCT_DESCRIPTION\}\}/g, description);

    // Handle color options
    let colorOptionsHTML = '';
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
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
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
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

    // Handle delivery text
    let deliveryHTML = '';
    if (product.delivery) {
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> ${product.delivery}</p>
            </div>`;
    } else {
      // Default delivery text
      deliveryHTML = `
            <div class="product-detail__delivery">
              <p class="text-normal"><b>Delivery:</b> Within 24 hours, the service is available across Cyprus after placing your order.</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_DELIVERY\}\}/g, deliveryHTML);

    // Handle payment section (always show, but payment text is conditional)
    let paymentTextHTML = '';
    if (!product.paymentExtraTextOff) {
      // Show payment text unless paymentExtraTextOff is true
      const paymentText = product.payment || 'Payment is made after the service is completed.';
      paymentTextHTML = `<p class="text-normal"><b>Payment:</b> ${paymentText}</p>`;
    }
    
    const paymentHTML = `
            <div class="product-detail__payment">
              ${paymentTextHTML}
              <div class="product-detail__payment-methods">
                <span class="text-normal">Payment methods:</span>
                <img src="./img/shop/revolut.svg" alt="Revolut" class="product-detail__payment-icon"/>
                <img src="./img/shop/visa.svg" alt="Visa" class="product-detail__payment-icon"/>
                <img src="./img/shop/mastercard.svg" alt="Mastercard" class="product-detail__payment-icon"/>
              </div>
            </div>`;
    pageContent = pageContent.replace(/\{\{PRODUCT_PAYMENT\}\}/g, paymentHTML);

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
    if (product.howItWorksHtml) {
      // Full HTML override for maximum flexibility
      howItWorksHTML = product.howItWorksHtml;
    } else if (product.howItWorksSteps && Array.isArray(product.howItWorksSteps) && product.howItWorksSteps.length > 0) {
      // Generate from steps array - more structured approach
      const gridClass = `grid-${product.howItWorksSteps.length}`;
      const stepsHTML = product.howItWorksSteps.map(step => {
        // Fix image paths for standalone build (use root-relative)
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
    } else {
      // Default "How It Works" section
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
    const availabilityText = product.available ?  'available' : 'Not available';
    pageContent = pageContent.replace(/\{\{PRODUCT_AVAILABILITY\}\}/g, availabilityText);

    // Handle prefilled comment (home-server doesn't need "automation")
    const automationText = (product.id === 'home-server' || product.slug === 'home-server') ? '' : ' automation';
    const prefilledComment = `I want ${product.title.toLowerCase()}${automationText}`;
    pageContent = pageContent.replace(/\{\{PRODUCT_COMMENT_PREFILL\}\}/g, prefilledComment);

    // Handle quantity selector for products with additionalUnitPrice
    let quantitySelectorHTML = '';
    if (product.additionalUnitPrice) {
      quantitySelectorHTML = `
            <!-- QUANTITY -->
            <div>
              <label class="text-normal">quantity</label>
              <div class="product-detail__contact-methods">
                <button type="button" class="product-detail__contact-method active" data-quantity="1">1</button>
                <button type="button" class="product-detail__contact-method" data-quantity="2">2</button>
                <button type="button" class="product-detail__contact-method" data-quantity="3">3</button>
                <button type="button" class="product-detail__contact-method" data-quantity="4+">4+</button>
              </div>
              <input type="hidden" name="QUANTITY" id="quantity" value="1">
            </div>`;
    }
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

// Process shop HTML pages for standalone build
const processShopPages = () => {
  return src('src/pages/shop/**/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('shopBuild'));
};

// Pre-render product cards into shop index (static HTML instead of JS-only)
const preRenderShopIndex = (cb) => {
  const shopIndexPath = path.join(__dirname, 'shopBuild', 'index.html');
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

  // Build cards HTML (mirror of productCard.js but static)
  const cardsHTML = products.map(product => {
    const isAvailable = product.available;
    const cardClass = isAvailable ? 'shop-content__card' : 'shop-content__card unavailable';
    const tagClass = isAvailable ? 'text-normal shop-content__tag' : 'text-normal shop-content__tag shop-content__tag--not-available';
    const tagText = isAvailable ? 'available' : 'not available';

    // Static link to product detail page in shopBuild root
    const linkHref = isAvailable ? `./${product.slug}.html` : '#';

    // Use first image from images array if available, otherwise fall back to image property
    const productImageRaw = (product.images && product.images.length > 0)
      ? product.images[0]
      : (product.image || './img/shop/card-1.png');

    // Normalise image path to ./img/ for standalone build
    const productImage = productImageRaw
      .replace(/^\.\.\/img\//, './img/')
      .replace(/^\.\/img\//, './img/');

    const oldPriceHTML = product.oldPrice
      ? `<span class="text shop-content__price-old">€ ${product.oldPrice.toFixed(2)}</span>`
      : '';

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
          </div>`;
  }).join('\n');

  // Inject into built index.html, replacing the JS placeholder
  let indexHtml = fs.readFileSync(shopIndexPath, 'utf8');

  const containerStart = '<div class="shop-content grid grid-3" id="products-container">';
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
  console.log('Pre-rendered product cards into shopBuild/index.html');
  cb();
};

// Fix asset paths in standalone shop build (everything is at root level)
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
        processDirectory(filePath);
      } else if (file.isFile() && file.name.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix asset paths to be root-relative (no ../ needed in standalone build)
        // Handle ../../ paths first (two levels up), then ../ paths (one level up)
        content = content.replace(/href="\.\.\/\.\.\/styles\//g, 'href="./styles/');
        content = content.replace(/href="\.\.\/styles\//g, 'href="./styles/');
        content = content.replace(/href="styles\//g, 'href="./styles/');
        content = content.replace(/src="\.\.\/\.\.\/js\//g, 'src="./js/');
        content = content.replace(/src="\.\.\/js\//g, 'src="./js/');
        content = content.replace(/src="js\//g, 'src="./js/');
        content = content.replace(/href="\.\.\/\.\.\/img\//g, 'href="./img/');
        content = content.replace(/href="\.\.\/img\//g, 'href="./img/');
        content = content.replace(/src="\.\.\/\.\.\/img\//g, 'src="./img/');
        content = content.replace(/src="\.\.\/img\//g, 'src="./img/');
        content = content.replace(/href="\.\.\/\.\.\/resources\//g, 'href="./resources/');
        content = content.replace(/href="\.\.\/resources\//g, 'href="./resources/');
        content = content.replace(/href="resources\//g, 'href="./resources/');

        // Fix product links to be root-relative (e.g., /shop/product -> ./product.html)
        content = content.replace(/href="\/shop\/([^"]+)"/g, 'href="./$1.html"');
        content = content.replace(/href="\.\/shop\/([^"]+)"/g, 'href="./$1.html"');

        // Fix shop index link
        content = content.replace(/href="\/shop"/g, 'href="./index.html"');
        content = content.replace(/href="\.\/shop"/g, 'href="./index.html"');

        // Fix navigation links - remove external site links or keep them as-is
        // Keep contact-us and other pages as external links or remove them
        content = content.replace(/href="\.\.\/(about-us|why-smart-home|solutions|cyprus-lifestyle|for-construction|contact-us|privacy-policy)"/g, 'href="#contact"');

        // Fix footer image path
        content = content.replace(/src="\.\.\/img\/decor-legs\.svg"/g, 'src="./img/decor-legs.svg');
        content = content.replace(/src="\.\/img\/decor-legs\.svg"/g, 'src="./img/decor-legs.svg');

        // Fix favicon paths
        content = content.replace(/href="\/android-icon-192x192\.png"/g, 'href="./img/favicon/android-chrome-192x192.png"');
        content = content.replace(/href="\.\.\/img\/favicon\//g, 'href="./img/favicon/');
        content = content.replace(/href="\.\/img\/favicon\//g, 'href="./img/favicon/');

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
const scriptsShopBuild = () => {
  return src([
    'src/js/vendor/*.js',              // focus-visible + swiper library
    'src/js/helpers.js',               // Utility functions (stopScroll, getScroll for burger menu)
    'src/js/components/swiper.js',     // Swiper initialisation (shop/product pages)
    'src/js/components/productDetailForm.js', // Product detail form behaviour
    'src/js/main-shop.js',             // Burger menu + navigation (shop-specific)
  ], { allowEmpty: true })
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify({
    toplevel: true,
  }).on('error', notify.onError()))
  .pipe(dest('shopBuild/js/'));
};

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
  const jsPath = path.join(__dirname, 'shopBuild/js/main.js');
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
const stylesShopBuild = () => {
  return src('src/assets/styles/**/*.css')
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
  preRenderShopIndex,
  fixShopAssetPathsStandalone,
  processProductsForShop,
  scriptsShopBuild,
  fixShopJSPaths,
  cleanShopTemp,
  stylesShopBuild,
  shopImages,
  shopSharedImages,
  shopFavicons,
  shopResources
);

exports.build = series(clean, resources, generateProductPagesBuild, htmlMinify, htmlPagesMinify, fixShopAssetPathsBuild, scriptsBuild, stylesBuild, minImages, svgSprites)
