// Products data
const products = [
    {
    id: 'altruist',
    title: 'Altruist Air Quality Sensors with Installation & Setup',
    description: 'Get an air quality monitoring system with professional installation.',
    price: 0.00,
    image: '../img/shop/banners/altruist/card-1.png',
    images: [
      '../img/shop/banners/altruist/card-1.jpg',
      '../img/shop/banners/altruist/card-2.jpg',
      '../img/shop/banners/altruist/card-3.jpg',
      '../img/shop/banners/altruist/card-4.jpg',
      '../img/shop/banners/altruist/card-5.jpg',
      '../img/shop/banners/altruist/card-6.jpg',
      '../img/shop/banners/altruist/card-7.gif',
      '../img/shop/banners/altruist/card-8.jpg',
      '../img/shop/banners/altruist/card-9.jpg',
      '../img/shop/banners/altruist/card-10.jpg',
      '../img/shop/banners/altruist/card-11.jpg',
      '../img/shop/banners/altruist/card-12.jpg',
    ],
    available: true,
    slug: 'altruist',
    additionalOptions: [
      {
        option: 12,
        name: 'Insight Color',
        type: 'color',
        values: [
          { id: 32, label: 'Blue', value: '#4285f4' },
          { id: 33, label: 'Pink', value: '#ff3cb1' }
        ]
      },
      {
        option: 13,
        name: 'Urban Emotion',
        type: 'icon',
        values: [
          { id: 36, label: 'Smile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="41" height="39" viewBox="0 0 41 39" fill="none"><path d="M40.2187 29.7898C39.9187 30.1398 32.6987 38.4598 19.6287 38.4598C6.55871 38.4598 0.648715 29.8998 0.408715 29.5298C-0.351285 28.3598 -0.0212847 26.7898 1.14872 26.0298C2.31872 25.2698 3.86872 25.5998 4.63872 26.7598C4.83872 27.0598 9.23871 33.3998 19.6287 33.3998C30.0187 33.3998 36.1287 26.7898 36.3687 26.5098C37.2787 25.4598 38.8687 25.3398 39.9287 26.2398C40.9887 27.1498 41.1187 28.7298 40.2087 29.7898H40.2187Z" fill="black"/><path d="M20.4087 0C13.4987 0 7.87866 5.62 7.87866 12.53C7.87866 19.44 13.4987 25.06 20.4087 25.06C27.3187 25.06 32.9387 19.44 32.9387 12.53C32.9387 5.62 27.3187 0 20.4087 0ZM20.4087 19.99C16.2987 19.99 12.9487 16.64 12.9487 12.53C12.9487 8.42 16.2987 5.07 20.4087 5.07C24.5187 5.07 27.8687 8.42 27.8687 12.53C27.8687 16.64 24.5187 19.99 20.4087 19.99Z" fill="black"/></svg>' },
          { id: 37, label: 'Cross', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" viewBox="0 0 41 38" fill="none"><path d="M40.2287 28.5476C39.9287 28.8976 32.7087 37.2176 19.6387 37.2176C6.56872 37.2176 0.648716 28.6576 0.408716 28.2876C-0.351284 27.1176 -0.0212861 25.5476 1.14871 24.7876C2.31871 24.0276 3.86872 24.3576 4.63872 25.5176C4.83872 25.8176 9.23872 32.1576 19.6287 32.1576C30.0187 32.1576 36.1287 25.5476 36.3687 25.2676C37.2787 24.2176 38.8687 24.0976 39.9287 24.9976C40.9887 25.9076 41.1187 27.4876 40.2087 28.5476H40.2287Z" fill="black"/><path d="M23.4087 10.5975L29.9587 4.0475C30.8887 3.1175 30.8887 1.6175 29.9587 0.6975C29.0287 -0.2325 27.5287 -0.2325 26.6087 0.6975L20.0587 7.2475L13.5087 0.6975C12.5787 -0.2325 11.0787 -0.2325 10.1587 0.6975C9.22868 1.6275 9.22868 3.1275 10.1587 4.0475L16.7087 10.5975L10.1587 17.1475C9.22868 18.0775 9.22868 19.5775 10.1587 20.4975C10.6187 20.9575 11.2287 21.1875 11.8387 21.1875C12.4487 21.1875 13.0487 20.9575 13.5187 20.4975L20.0687 13.9475L26.6187 20.4975C27.0787 20.9575 27.6887 21.1875 28.2987 21.1875C28.9087 21.1875 29.5087 20.9575 29.9787 20.4975C30.9087 19.5675 30.9087 18.0675 29.9787 17.1475L23.4287 10.5975H23.4087Z" fill="black"/></svg>' },
          { id: 38, label: 'Wink', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none"><path d="M40.2287 30.8401C39.9287 31.1901 32.7087 39.5101 19.6387 39.5101C6.56871 39.5101 0.648718 30.9501 0.408718 30.5801C-0.351282 29.4101 -0.0212915 27.8401 1.14871 27.0801C2.31871 26.3201 3.86871 26.6501 4.63871 27.8101C4.83871 28.1101 9.23872 34.4501 19.6287 34.4501C30.0187 34.4501 36.1287 27.8401 36.3687 27.5601C37.2787 26.5101 38.8687 26.3901 39.9287 27.2901C40.9887 28.2001 41.1187 29.7801 40.2087 30.8401H40.2287Z" fill="black"/><path d="M29.4987 7.97L31.2787 6.19C31.8587 5.61 31.8587 4.67 31.2787 4.1C30.6987 3.52 29.7587 3.52 29.1887 4.1L26.8287 6.46C25.3087 5.79 23.4087 5.24 21.1487 5.13V1.48C21.1487 0.66 20.4887 0 19.6687 0C18.8487 0 18.1887 0.66 18.1887 1.48V5.23C16.4187 5.47 14.8887 5.99 13.5887 6.63L11.0387 4.08C10.4587 3.5 9.51871 3.5 8.94871 4.08C8.36871 4.66 8.36871 5.6 8.94871 6.17L11.0187 8.24C9.27872 9.59 8.36871 10.89 8.28871 11C7.45871 12.21 7.76871 13.87 8.98871 14.7C9.44871 15.01 9.96871 15.17 10.4887 15.17C11.3387 15.17 12.1787 14.76 12.6887 14.01C12.7087 13.97 15.2887 10.42 20.2687 10.42C25.2487 10.42 27.6287 13.31 27.9787 13.77C28.4287 14.61 29.3087 15.18 30.3287 15.18C31.7987 15.18 32.9987 13.99 32.9987 12.51C32.9987 10.64 30.4387 8.64 29.4987 7.96V7.97Z" fill="black"/></svg>' }
        ]
      },
      {
        option: 14,
        name: 'Urban Color',
        type: 'color',
        values: [
          { id: 39, label: 'Blue', value: '#4285f4' },
          { id: 40, label: 'Pink', value: '#ff3cb1' }
        ]
      },
      {
        option: 15,
        name: 'UV Cover Color',
        type: 'color',
        values: [
          { id: 41, label: 'Dark Blue', value: '#003d7a' },
          { id: 42, label: 'Cyan', value: '#5de5d6' }
        ]
      }
    ],
    fullDescription: 'Get an air quality monitoring system with professional installation. <br> The system includes indoor and outdoor sensors and helps you choose the right time to ventilate, as well as understand the conditions for creating a comfortable indoor climate.<br>We install and configure a system that measures indoor CO₂ levels, temperature, and humidity, as well as outdoor air conditions and noise levels. This helps you understand when it’s best to ventilate bedrooms or children’s rooms, and when it’s better to keep windows closed — for example during dust storms, high noise levels, or poor outdoor air quality.<br>Based on this data, automations can be set up to manage humidification, cooling, or heating. All readings are available for local viewing and displayed on a clear sensor map.',
    features: [
      'Inside — indoor air quality sensor (CO₂, T°, RH, hPa)',
      'Urban — outdoor air quality sensor (PM2.5, PM10, T°, RH, hPa, dB)',
      'UV protective cover for the Urban sensor',
      'Professional installation and configuration',
      'Integration of smart home devices',
      'Connection to the sensor map <a href="https://sensors.social/" class="link" aria-label="check senors map">sensors.social</a>',
      'Guidance on using and monitoring air quality data'
    ],
    benefits: [
      '<b>Indoor & Outdoor Awareness</b> – Understand air conditions both inside your home and outside before ventilating.',
      '<b>Healthier Living</b> – Monitor indoor CO₂ levels to know when fresh air is needed in bedrooms and children’s rooms.',
      '<b>Smarter Ventilation Decisions</b> – Avoid opening windows during dust storms, high noise levels, or poor outdoor air quality.',
      '<b>Automation</b> - Use air quality data to create automatic scenarios — for example, humidification, cooling, and heating.',
      '<b>Open Sensor Map</b> - View all air quality data and history locally on an intuitive sensor map to understand changes and plan your weekends, for example in the mountains or by the coast.',
    ],
    category: 'Altruist'
  },
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
    colors: ['#0080ea', '#ff2caf'], // Blue, Pink
    additionalOptions: [
      {
        option: 16,
        name: 'Color',
        type: 'color',
        values: [
          { id: 43, label: 'Blue', value: '#0080ea' },
          { id: 44, label: 'Pink', value: '#ff2caf' }
        ]
      }
    ],
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



