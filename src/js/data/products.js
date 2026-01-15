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
    title: 'Electrical Underfloor Thermostat Upgrade',
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
  },
  {
    id: 'home-server',
    title: 'Home server with an open-source cloud',
    description: 'Home server with pre-installed Home Assistant and private open-source cloud.',
    price: 0.00,
    oldPrice: 119.00,
    paymentExtraTextOff: true,
    delivery: 'FedEX',
    image: '../img/shop/banners/home-server/card-1.png',
    images: [
      '../img/shop/banners/home-server/card-1.jpg',
      '../img/shop/banners/home-server/card-2.jpg',
      '../img/shop/banners/home-server/card-3.jpg',
      '../img/shop/banners/home-server/card-4.jpg',
      '../img/shop/banners/home-server/card-5.jpg',
      '../img/shop/banners/home-server/card-6.jpg',
      '../img/shop/banners/home-server/card-7.jpg',
      '../img/shop/banners/home-server/card-8.jpg',
      '../img/shop/banners/home-server/card-9.jpg',
      '../img/shop/banners/home-server/card-10.jpg',
    ],
    available: true,
    slug: 'home-server',
    colors: ['#0080ea', '#ff2caf', '#ffd217'], // Blue, Pink, Yellow
    fullDescription: 'A home server is the control center of your smart home. It runs locally with Home Assistant, connects all your devices, keeps your data private, and provides secure remote access via Robonomics — without cloud dependency or regional restrictions.',
    features: [
      'Home server with pre-installed Home Assistant',
      'Power cable',
      'Setup guide',
      'Free support',
      '3-year free subscription to the open-source cloud',
    ],
    benefits: [
      '<b>SURVEILLANCE-FREE</b> – No hidden data logs on corporate servers while still allowing secure remote access.',
      '<b>NO VENDOR LOCK-IN</b> – Supports over 3000 integrations with devices from various manufacturers.',
      '<b>OPEN HARDWARE</b> – Open processor architecture and open-source code ensure a trustless system.'
    ],
    category: 'Home server & gateways',
    howItWorksSteps: [
      {
        image: '../img/shop/installation-setup.png',
        title: 'INSTALLATION & SETUP',
        description: 'Set up local operation using the setup guide.'
      },
      {
        image: '../img/shop/connection.png',
        title: 'DEVICE CONNECTION',
        description: 'Add and manage your smart devices in one unified system.'
      },
      {
        image: '../img/shop/remote-setup.png',
        title: 'REMOTE ACCESS SETUP',
        description: 'Integrate Robonomics for secure, globally accessible remote access.'
      }
    ],
    extraSectionsHtml: `
        <section class="home-server-section">
          <h2 class="subtitle">VENDOR AGNOSTIC SMART HOME HEART</h2>
          <div class="grid grid-2">
            <div class="product-content">
              <p class="text-normal"> The server comes pre-installed with Home Assistant, an open-source home automation platform, giving you full control of your smart home without relying on third-party cloud services.</p>
              <p class="text-normal">Its modular design allow you to easily add components, automations and integrations, supporting over 3,000 devices from various manufacturers without vendor lock-in.</p>
              <p class="text-normal">With support for Zigbee and Wi-Fi protocols, you can connect a wide range of devices, from temperature sensors to energy consumption monitors, all to a local server.</p>
            </div>
            <img src="../img/shop/vendor.png" alt="VENDOR AGNOSTIC SMART HOME SCHEME" >
          </div>
        </section>

        <section class="home-server-section">
          <h2 class="subtitle">DESIGNED FOR PRIVACY</h2>
          <div class="grid grid-2">
            <img src="../img/shop/privacy.png" alt="" aria-hidden="true"/>
            <div class="product-content">
              <p class="text-normal">Our smart home server eliminates corporate interference, keeping your data local or encrypted with your personal key in decentralized Web3 storage. Enjoy complete privacy with no tracking, no surveillance-just secure, trustless control over your smart home.</p>
              <p class="text-normal">With Robonomics Web3 cloud and p2p remote control, you get cryptographic access to all the functions of smart home:</p>
              <ul class="product-detail__features-list">
                <li class="text-normal">Access current device states remotely</li>
                <li class="text-normal">Control devices via encrypted parachain or Libp2p</li>
                <li class="text-normal">Back up and restore Home Assistant configurations</li>
                <li class="text-normal">Store your home's digital twin in a secure, decentralized cloud</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="home-server-section">
          <h2 class="subtitle">OPEN AND EFFICIENT HARDWARE</h2>
          <div class="grid grid-2">
            <div class="product-content">
              <p class="text-normal">Our Home Server is powered by a RISC-V. processor and features fully transparent circuit board schematics. RISC-V is an open and modular processor architecture that comes with a BSD license. Unlike proprietary ARM, it offers flexibility for customization without licensing restrictions, making it ideal for trustless loT devices and servers.</p>
              <img src="../img/shop/hardware.png" alt="open and efficient hardware">
            </div>
            <ul class="product-detail__features-list">
              <li class="text-normal"><b>Processor:</b> StarFive JH-7110 with RISC-V 4-core CPU, 2 MB L2 cache, up to 1.5 GHz, RV64GC ISA support</li>
              <li class="text-normal"><b>GPU:</b> IMG BXE-4-32 MC1, up to 600 MHz</li>
              <li class="text-normal"><b>Memory:</b> 8 GB LPDDR4 SDRAM, up to 2800 Mbps</li>
              <li class="text-normal"><b>Storage:</b> 32 GB TF card (minimum)</li>
              <li class="text-normal"><b>Interfaces:</b> 2x Gigabit Ethernet ports, 4x USB 3.0 Type-A ports, 40-pin GPIO header, M.2 connector, eMMC socket, 2-pin fan header</li>
              <li class="text-normal"><b>Power:</b> 5V DC via USB-C, up to 30 W (minimum 3 A) or 5V input via 40-pin GPIO</li>
              <li class="text-normal"><b>OS:</b> Ubuntu 24.04 LTS</li>
            </ul>
          </div>
        </section>

        <section class="home-server-section">
          <h2 class="subtitle text-center">INSTALLATION &amp; SETUP</h2>
          <ul class="product-detail__features-list">
            <li class="text-normal"><b>Home server on RISC‑V with pre-installed OS</b></li>
            <li class="text-normal"><b>Home Assistant Core installation and initial configuration</b></li>
            <li class="text-normal"><b>Robonomics integration and remote access setup</b></li>
            <li class="text-normal"><b>Connecting Zigbee / Wi‑Fi devices and basic automations</b></li>
          </ul>
        </section>
    `
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



