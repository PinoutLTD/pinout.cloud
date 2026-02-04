// Products data
const products = [
  {
    id: 'home-server-local',
    title: 'Local Privacy Smart Home Server with Installation',
    description: 'Home server with pre-installed Home Assistant and private open-source cloud.',
    price: 450.00,
    image: '../img/shop/banners/home-server/card-1.png',
    images: [
      '../img/shop/banners/home-server/card-1.jpg',
      '../img/shop/banners/home-server/card-2.jpg',
      '../img/shop/banners/home-server/card-3.jpg',
      '../img/shop/banners/home-server/card-4.jpg',
      '../img/shop/banners/home-server/card-5.jpg',
      '../img/shop/banners/home-server/card-6.jpg',
    ],
    available: true,
    slug: 'home-server-local',
    fullDescription: 'Get a local privacy-focused smart home server, professionally installed and ready for use. The server hardware is selected individually based on your home size, number of devices, and smart home needs. </br> Everything runs locally, without cloud dependency — providing fast response, privacy, and full control over your smart home environment.',
    features: [
      'Individually selected local smart home server hardware',
      'Professional installation by our technicians',
      'Full system setup and configuration',
      'Integration of smart home devices',
      'Basic smart home automation',
      'Guidance on using and managing your new home server'
    ],
    benefits: [
      '<b>Automation</b> – Smart routines for everyday comfort and convenience, running quietly in the background.',
      '<b>Privacy First</b> – Your data stays private and inside your home.',
      '<b>Smart Home Integration</b> – All your devices in one private ecosystem.',
      '<b>Peace of Mind</b> - Full control, stability, and independence from the cloud.'
    ],
    category: 'Home server & gateways',
  },
  {
    id: 'home-server-remote',
    title: 'Local Privacy Smart Home Server with Installation + Remote Access',
    description: 'Local home server with secure remote access, professionally installed and configured on the Robonomics platform.',
    price: 600.00,
    image: '../img/shop/banners/home-server-remote/card-1.png',
    images: [
      '../img/shop/banners/home-server-remote/card-1.jpg',
      '../img/shop/banners/home-server-remote/card-2.jpg',
      '../img/shop/banners/home-server-remote/card-3.jpg',
      '../img/shop/banners/home-server-remote/card-4.jpg',
      '../img/shop/banners/home-server-remote/card-5.jpg',
      '../img/shop/banners/home-server-remote/card-6.jpg',
      '../img/shop/banners/home-server-remote/card-7.jpg',
      '../img/shop/banners/home-server-remote/card-8.jpg',
      '../img/shop/banners/home-server-remote/card-9.jpg',
      '../img/shop/banners/home-server-remote/card-10.jpg',
      '../img/shop/banners/home-server-remote/card-11.jpg',
      '../img/shop/banners/home-server-remote/card-12.jpg',
    ],
    available: true,
    slug: 'home-server-remote',
    colors: ['#0080ea', '#ff2caf'], // Blue, Pink,
    fullDescription: 'Get a local smart home server, individually selected for your home, with additional secure remote access powered by Web3 technologies. <br/> The system is built around a local smart home server chosen according to your home size, number of devices, and required performance. All core smart home logic runs locally — fast, stable, and independent from the cloud. Remote access is provided via the Web3-based Robonomics platform, enabling decentralized and secure access to your smart home from anywhere in the world. <br/> This approach avoids vendor lock-in and traditional cloud services, combining local reliability with unrestricted remote control.',
    features: [
      'Individually selected local smart home server hardware',
      'Web3 Robonomics server for secure remote access',
      'Professional installation by our technicians',
      'Full system setup and configuration',
      'Integration of smart home devices',
      'Basic smart home automation',
      'Guidance on using and managing your new home server'
    ],
    benefits: [
      '<b>Privacy First</b> – No hidden data logs or corporate cloud storage. Your data stays private and inside your home.',
      '<b>Secure Local & Remote Access</b> – Full control of your smart home locally and remotely without relying on traditional cloud services.',
      '<b>No Vendor Lock-In</b> – Freedom to use devices from different manufacturers without being tied to a single ecosystem.',
      '<b>Open & Transparent Platform</b> - Built on open-source technologies with a transparent architecture you can trust.',
      '<b>Full Ownership & Control</b> - You own the system, the data, and the infrastructure, not a third-party service.',
      '<b>Peace of Mind</b> - A stable, independent smart home that works reliably today and in the future.'
    ],
    category: 'Home server & gateways'
  },
  {
    id: 'smart-curtain',
    title: 'Smart Curtain System Installation & Automation',
    description: 'Smart curtains system with smart home integration',
    price: 350.00,
    oldPrice: 400.00,
    additionalUnitPrice: 10.00, // Price for each additional unit after the first one
    warning: "! Permanent power supply (pre-installed power cable) is required. Track length up to 4 meters.",
    image: '../img/shop/smart-curtains/card-1.png',
    images: [
      '../img/shop/banners/smart-curtains/card-1.jpg',
      '../img/shop/banners/smart-curtains/card-2.jpg',
      '../img/shop/banners/smart-curtains/card-3.jpg',
      '../img/shop/banners/smart-curtains/card-4.jpg',
      '../img/shop/banners/smart-curtains/card-5.jpg',
      '../img/shop/banners/smart-curtains/card-6.jpg',
    ],
    available: true,
    slug: 'smart-curtains-installation',
    fullDescription: 'Get smart motorized curtains with professional installation and smart home automation included. We install and configure the system, set up schedules and scenarios, and integrate smart curtains into your smart home for effortless daily control.',
    features: [
      'Two motorized curtain tracks (blackout + sheer) with permanent power supply',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart curtains'
    ],
    benefits: [
      'Automation – Curtains open and close by schedule or smart scenarios (morning, bedtime, leaving home, or returning)',
      'Effortless Comfort – Ideal for large and heavy curtains',
      'Smart Home Integration - Connect it to your existing smart home ecosystem',
      'Cozy & Private Atmosphere – Maximum comfort and privacy, especially in bedrooms with blackout curtains'
    ],
    category: 'Smart Curtains'
  },
  {
    id: 'smart-robot-vacuum',
    title: 'Smart Robot Vacuum with Installation & Automation',
    description: 'Robot vacuum with smart home integration',
    price: 400.00,
    oldPrice: 450.00,
    additionalUnitPrice: 10.00, // Price for each additional unit after the first one
    image: '../img/shop/robot-vacuum/card-1.png',
    images: [
      '../img/shop/banners/robot-vacuum/card-1.jpg',
      '../img/shop/banners/robot-vacuum/card-2.jpg',
      '../img/shop/banners/robot-vacuum/card-3.jpg',
      '../img/shop/banners/robot-vacuum/card-4.jpg',
    ],
    available: true,
    slug: 'smart-robot-vacuum-installation',
    fullDescription: 'Get a smart robot vacuum with professional installation and smart home automation included. We set up cleaning schedules, navigation, and smart home integration for effortless daily cleaning.',
    features: [
      'Smart robot vacuum cleaner (choose one of two available models)',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart cleaning system'
    ],
    benefits: [
      'Automation — Robot vacuum cleans automatically by schedule or smart scenarios',
      'Remote Control – Start, stop, or schedule cleaning from anywhere',
      'Smart Home Integration - Connect it to your existing smart home ecosystem',
      'Peace of Mind – No more worrying about dust, hair, or daily cleaning'
    ],
    category: 'Smart Robot Vacuum',
    variants: [
      { id: 'h40', name: 'Xiaomi Robot Vacuum H40', price: 400.00, oldPrice: 450.00, image: '../img/shop/smart-vacuum-robot-1.png' },
      { id: 'x20max', name: 'Xiaomi Robot Vacuum X20 Max', price: 800.00, oldPrice: 850.00, image: '../img/shop/smart-vacuum-robot-2.png' }
    ]
  },
  {
    id: 'smart-ptz-camera',
    title: 'Smart PTZ Camera with Installation & Automation',
    description: 'Indoor PTZ Wi-Fi camera with smart home integration.',
    price: 180.00,
    oldPrice: 230.00,
    additionalUnitPrice: 10.00, // Price for each additional unit after the first one
    image: '../img/shop/ptz-camera/card-1.png',
    images: [
      '../img/shop/banners/ptz-camera/card-1.jpg',
      '../img/shop/banners/ptz-camera/card-2.jpg',
      '../img/shop/banners/ptz-camera/card-3.jpg',
      '../img/shop/banners/ptz-camera/card-4.jpg',
      '../img/shop/banners/ptz-camera/card-5.jpg',
      '../img/shop/banners/ptz-camera/card-6.jpg',
      '../img/shop/banners/ptz-camera/card-7.jpg',
    ],
    available: true,
    slug: 'smart-ptz-camera-installation',
    fullDescription: 'Get a indoor PTZ camera with professional installation and smart home automation included. We install and configure the camera, set up monitoring scenarios, notifications, and integrate it into your smart home system for reliable everyday security. <br/> A single smart camera with panoramic view and remote control is often all you need for home security and peace of mind.',
    features: [
      'Reolink WIFI Indoor PTZ Camera 8MP E1 Zoom (E340) White',
      'Professional installation by our technicians',
      'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
      'Guidance on using and automating your new smart camera'
    ],
    benefits: [
      'Automation – motion detection alerts',
      'Remote access – live video streaming from anywhere with pan, tilt, and zoom for full room control',
      'Smart Home Integration - Connect it to your existing smart home ecosystem',
      'Peace of mind – always know what’s happening at home'
    ],
    category: 'Smart PTZ Camera'
  },
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



