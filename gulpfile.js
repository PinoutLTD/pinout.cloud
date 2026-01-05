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

    // Handle availability
    const availabilityText = product.available ?  'available' : 'Not available';
    pageContent = pageContent.replace(/\{\{PRODUCT_AVAILABILITY\}\}/g, availabilityText);

    // Handle stock availability display
    let stockHTML = '';
    if (product.stockAvailable !== undefined && product.stockAvailable !== null) {
      stockHTML = `<div class="product-detail__stock-section">
              <p class="text-normal product-detail__stock-title">Available units</p>
              <p class="text product-detail__stock-count">${product.stockAvailable}</p>
            </div>`;
    }
    pageContent = pageContent.replace(/\{\{PRODUCT_STOCK_AVAILABLE\}\}/g, stockHTML);

    // Handle prefilled comment
    const prefilledComment = `I want ${product.title.toLowerCase()} automation`;
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

exports.build = series(clean, resources, generateProductPagesBuild, htmlMinify, htmlPagesMinify, fixShopAssetPathsBuild, scriptsBuild, stylesBuild, minImages, svgSprites)
