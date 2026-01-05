// Products data
const products = [
  {
    id: 'boiler-switch-upgrade',
    title: 'Boiler Switch Upgrade',
    description: 'Upgrade your boiler with a smart switch.',
    price: 160.00,
    oldPrice: 200.00,
    image: '../img/shop/banners/boiler-heater/card-1.png',
    images: [
      '../img/shop/banners/boiler-heater/card-1.jpg',
      '../img/shop/banners/boiler-heater/card-2.jpg',
      '../img/shop/banners/boiler-heater/card-3.jpg',
      '../img/shop/banners/boiler-heater/card-4.jpg',
      '../img/shop/banners/boiler-heater/card-5.jpg',
      '../img/shop/banners/boiler-heater/card-6.jpg',
    ],
    available: true,
    slug: 'boiler-switch-upgrade',
    // Additional details for product page
    fullDescription: 'Upgrade your home with a smart boiler heater switch! This service includes both the smart switch, professional installation by our expert technicians and programming according to your needs.',
    features: [
      'A smart switch for boiler heater 20A, Wi-Fi',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart switch'
    ],
    benefits: [
      'Energy Efficiency - Schedule and automate your boiler heating for optimal savings',
      'Remote Control - Turn your boiler on or off from anywhere using your smartphone',
      'Smart Home Integration - Connect it to your existing smart home ecosystem',
      'Peace of Mind - No more worrying about whether you left the heater on'
    ],
    category: 'Smart Switches'
  },
  {
    id: 'air-conditioner-upgrade',
    title: 'Air Conditioner Upgrade',
    description: 'Upgrade your air conditioner with a smart IR control.',
    price: 195.00,
    oldPrice: 240.00,
    additionalUnitPrice: 75.00, // Price for each additional unit after the first one
    image: '../img/shop/banners/ac/card-1.png',
    images: [
      '../img/shop/banners/ac/card-1.jpg',
      '../img/shop/banners/ac/card-2.jpg',
      '../img/shop/banners/ac/card-3.jpg',
      '../img/shop/banners/ac/card-4.jpg',
      '../img/shop/banners/ac/card-5.jpg',
      '../img/shop/banners/ac/card-6.jpg',
    ],
    available: true,
    slug: 'air-conditioner-upgrade',
    fullDescription: 'Upgrade your home with a smart air conditioner control system! Forget about your old remote and replace it with a programmable Wi-Fi IR remote to control your air conditioner with ease.',
    features: [
      'Universal IR control for air conditioners, TVs and audio systems with one button auto-match for quick setup',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart air conditioner control'
    ],
    benefits: [
      'Energy Efficiency - Schedule and automate your air conditioner to reduce energy consumption',
      'Remote Control - Turn your air conditioner on or off and adjust settings from anywhere using your smartphone',
      'Smart Home Integration - Connect it to your existing smart home ecosystem',
      'Peace of Mind - No more worrying about whether you left the air conditioner'
    ],
    category: 'Smart AC'
  },
  {
    id: 'floor-hearing',
    title: 'Electrical Underfloor Thermostat',
    description: 'Upgrade your floor heating with a smart switch',
    price: 230.00,
    oldPrice: 280.00,
    additionalUnitPrice: 120.00, // Price for each additional unit after the first one
    image: '../img/shop/floor-heating/card-1.png',
    images: [
      '../img/shop/banners/floor-heating/card-1.jpg',
      '../img/shop/banners/floor-heating/card-2.jpg',
      '../img/shop/banners/floor-heating/card-3.jpg',
      '../img/shop/banners/floor-heating/card-4.jpg',
      '../img/shop/banners/floor-heating/card-5.jpg',
      '../img/shop/banners/floor-heating/card-6.jpg',
    ],
    available: true,
    slug: 'electric-underfloor-heating-upgrade',
    fullDescription: 'Upgrade your home with smart electric underfloor heating automation! Forget manual temperature control and enjoy a programmable smart thermostat that keeps your floor warm exactly when you need it.',
    features: [
      'A smart programmable Zigbee thermostat designed for electric underfloor heating (16A)',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart heating system'
    ],
    benefits: [
      'Energy Efficiency - Heat your floor only when needed and reduce electricity costs',
      'Remote Control - turn on heating before you arrive home',
      'Smart Home Integration - Seamlessly connect underfloor heating to your smart home ecosystem',
      'Peace of Mind - No more forgetting to turn the heating off'
    ],
    category: 'Smart Switches'
  }
];

// Helper function to get product by slug
function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

// Helper function to get all available products
function getAvailableProducts() {
  return products.filter(product => product.available);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, getProductBySlug, getAvailableProducts };
}



