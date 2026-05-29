// Products data
const products = [
  {
    id: 'biohacking-apartment',
    title: 'Biohacking Apartment',
    description: 'Your home can support your health, sleep and recovery.',
    price: "from 3,300.00",
    image: '../img/shop/banners/biohacking/card-1.png',
    images: [
      '../img/shop/banners/biohacking/card-1.png',
      '../img/shop/banners/biohacking/card-2.png',
      '../img/shop/banners/biohacking/card-3.png',
      '../img/shop/banners/biohacking/card-4.png',
      '../img/shop/banners/biohacking/card-5.png',
      '../img/shop/banners/biohacking/card-6.png',
    ],
    available: true,
    slug: 'biohacking-apartment',
    fullDescription: '<b>Your home can support your health, sleep and recovery.</b><br> Your sleep. Your recovery. Your energy. Your well-being. <br> The space you live in directly affects sleep quality, stress levels, concentration, and overall well-being.<br> We help optimize your apartment for better recovery, sleep, relaxation, and everyday well-being using biohacking and smart home technologies.<br>If you use Apple Watch, Garmin, Oura Ring, or Whoop to monitor sleep, recovery, and overall health, the system helps create optimal conditions for deeper rest, lower stress levels, and more effective recovery after physical exertion and an intensive lifestyle.<br>The system continuously monitors air quality, CO₂ levels, humidity, temperature, and indoor climate parameters, automatically maintaining a healthy indoor environment for sleep, relaxation, and comfortable living.<br>Intelligent lighting adapts to the body’s circadian rhythms, supporting natural melatonin production in the evening and healthy energy levels during the day.<br>Air purification systems, smart climate control, and automated scenarios create a comfortable environment where the body can recover more effectively and maintain high energy levels every day — especially important for life on an island with a hot climate, high humidity, and periodic dust storms.<br>This is not just smart home automation.<br>It is a personalized biohacking system designed for health, recovery, and a higher quality of life.',
    delivery: false,
    serviceSummary: [
      { line: '*Final cost depends on the apartment layout, selected equipment, number of automated zones, and project complexity. A consultation with our specialist is required for an accurate quotation. <br> Service cost includes equipment and materials.' },
      { label: 'Project timeline', value: 'approximately 7 days (from request to completed setup, depending on project scope and equipment availability).' },
      { label: 'On-site work time', value: 'approximately 8–12 hours (depending on the apartment size, number of automated zones, and project complexity).' },
    ],
    howItWorksHtml: `
        <section class="product-detail__bio-schedule">
          <div class="product-detail__bio-schedule-board">
            <img src="../img/shop/banners/biohacking/decor.png" alt="" class="product-detail__bio-schedule-decor" loading="lazy"/>
            <div class="product-detail__bio-schedule-zone product-detail__bio-schedule-zone--day">
              <h2 class="subtitle product-detail__bio-schedule-title">LIVING ROOM 07:00–22:00</h2>
              <div class="product-detail__bio-schedule-list">
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/curtains.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>6:00–7:00 — Living Room Wake-Up Preparation</h3>
                    <ul>
                      <li>Blackout curtains open automatically.</li>
                      <li>A comfortable indoor microclimate is prepared in the room.</li>
                    </ul>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/lightning.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>20:00 — Start Evening Recovery Mode</h3>
                    <p><b>Lighting:</b></p>
                    <ul>
                      <li>Cold white light is turned off;</li>
                      <li>Red/amber light is activated;</li>
                      <li>Lighting brightness is reduced.</li>
                    </ul>
                    <p class="product-detail__bio-schedule-goal">Goal: supporting natural melatonin production, reducing nervous system stimulation, and preparing the body for sleep.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/blackout-mode.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>21:00 — Blackout Mode</h3>
                    <p>Blackout curtains close automatically.</p>
                    <p class="product-detail__bio-schedule-goal">Goal: supporting melatonin production, reducing light pollution, and improving sleep quality.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/temperature.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>Indoor Temperature:</h3>
                    <p><b>Morning 21–23°C</b><br><em>Comfortable wake-up, activation of the body, and a feeling of alertness.</em></p>
                    <p><b>Daytime 22–24°C</b><br><em>Maintaining normal energy levels, concentration, comfortable work, and daily activity.</em></p>
                    <p><b>Evening 20–22°C</b><br><em>Lowering the temperature and preparing the body for sleep.</em></p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/humidity.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>Humidity Control Throughout the Day</h3>
                    <p><b>Recommended range:</b> 40–55% humidity.</p>
                    <p class="product-detail__bio-schedule-goal">Goal: reducing dryness caused by air conditioners and heating, improving breathing, and maintaining a comfortable indoor microclimate.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/co2.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>CO₂ Monitoring</h3>
                    <p>Altruist Inside sensor for timely indoor ventilation and air quality monitoring.</p>
                  </div>
                </article>
              </div>
            </div>
            <div class="product-detail__bio-schedule-zone product-detail__bio-schedule-zone--night">
              <h2 class="subtitle product-detail__bio-schedule-title">BEDROOM 20:00–07:00</h2>
              <div class="product-detail__bio-schedule-list">
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/blackout-mode.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>20:00 Start — Evening Recovery Mode</h3>
                    <ul>
                      <li>Cold white light is turned off;</li>
                      <li>Lighting brightness is reduced;</li>
                      <li>Red/amber light is activated;</li>
                    </ul>
                    <p>A comfortable indoor microclimate is prepared in the room.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/lightning.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>21:00 — Blackout Mode</h3>
                    <p>Blackout curtains close automatically.</p>
                    <p class="product-detail__bio-schedule-goal">Goal: supporting melatonin production, reducing light pollution, and improving sleep quality.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/lights-off.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>22:30–23:00 — Sleep Mode</h3>
                    <p>Red/amber light turns off.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/curtains.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>6:00–7:00 — RECOVERY WAKE-UP</h3>
                    <ul>
                      <li>Blackout curtains open automatically.</li>
                      <li>Bright white light is activated (if it is still dark outside).</li>
                    </ul>
                    <p class="product-detail__bio-schedule-goal">Goal: gentle wake-up, synchronization of circadian rhythms, and increased morning energy.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/temperature.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>Temperature:</h3>
                    <p>Recommended range: 18–22°C.</p>
                    <p class="product-detail__bio-schedule-goal">Goal: improving deep sleep, reducing nighttime awakenings, and supporting comfortable sleep onset.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/humidity.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>Humidity Control:</h3>
                    <p>Recommended range: 40–50% humidity.</p>
                    <p class="product-detail__bio-schedule-goal">Goal: reducing dryness caused by air conditioners and heating, improving breathing during sleep, and maintaining a comfortable indoor microclimate.</p>
                  </div>
                </article>
                <article class="product-detail__bio-schedule-item">
                  <img src="../img/shop/banners/biohacking/co2.svg" alt="" class="product-detail__bio-schedule-icon"/>
                  <div class="product-detail__bio-schedule-copy">
                    <h3>CO₂ Monitoring</h3>
                    <p>Altruist Inside sensor for timely indoor ventilation and air quality monitoring.</p>
                  </div>
                </article>
              </div>
            </div>
            <div class="product-detail__bio-schedule-night-mode">
              <h2 class="subtitle product-detail__bio-schedule-title">20:00–06:00 — NIGHT MOVEMENT MODE THROUGHOUT THE APARTMENT</h2>
              <div class="product-detail__bio-schedule-night-row">
                <img src="../img/shop/banners/biohacking/moon.svg" alt="" class="product-detail__bio-schedule-icon"/>
                <p class="text-normal">Motion-based night lighting: when movement is detected in the corridor, bathroom, or kitchen, dim red light with minimal brightness is automatically activated without suppressing melatonin.</p>
              </div>
            </div>
          </div>
        </section>`,
    features: [
      'Smart air conditioner control with automated cooling and heating scenarios for daytime, evening and sleep modes.',
      'Smart underfloor heating automation with programmable temperature control for comfortable heating in the morning and evening.',
      'Two Altruist Inside air quality sensors for monitoring CO₂, temperature and humidity levels in the bedroom and living room.',
      'Altruist Urban outdoor climate sensor for monitoring outdoor air quality, dust levels, temperature and humidity to help create a comfortable indoor microclimate.',
      'Smart lighting system with automated circadian lighting scenarios, red/amber evening light and bright white wake-up light.',
      'Motion sensors with automatic dim red night lighting in the corridor, bathroom and kitchen.',
      'Automated blackout curtains with opening and closing scenarios for sleep and wake-up routines.',
      'Air purification system with automatic air quality control for the bedroom and living room.',
      'Smart humidity control system for maintaining a comfortable indoor microclimate during the day and sleep.',
      'Installation and configuration of a local smart home server.',
      'Professional installation by our technicians.',
      'Guidance on using and automating your new smart biohacking home'
    ],
    benefits: [
      '<b>Comfort & Convenience</b> – the apartment automatically adapts to your lifestyle, sleep schedule and indoor climate needs.',
      '<b>Better Sleep & Recovery</b> – optimized temperature, humidity, lighting and blackout scenarios for deeper sleep and improved recovery.',
      '<b>Healthy Indoor Climate</b> – monitoring of CO₂, humidity, dust and air quality in real time.',
      '<b>Circadian Lighting</b> - red/amber evening light and bright wake-up light for natural melatonin support and healthier daily rhythms.',
      '<b>Dust Storm Protection </b> - smart air purification and climate control even during poor outdoor air conditions.',
      '<b>Smart Automation</b> - fully automated day, evening and sleep scenarios without constant manual control.',
      '<b>Reliability</b> - runs on a local smart home server without cloud dependency.'
    ],
    category: 'Biohacking'
  },
  {
    id: 'water-control',
    title: 'Smart hot water control',
    description: 'Get full control over your hot water with a smart boiler management system.',
    price: 1250.00,
    image: '../img/shop/banners/water-control/card-1.png',
    images: [
      '../img/shop/banners/water-control/card-1.png',
      '../img/shop/banners/water-control/card-2.png',
      '../img/shop/banners/water-control/card-3.png',
      '../img/shop/banners/water-control/card-4.png',
      '../img/shop/banners/water-control/card-5.png',
      '../img/shop/banners/water-control/card-6.png',
      '../img/shop/banners/water-control/card-7.png',
    ],
    available: true,
    slug: 'water-control',
    fullDescription: 'Get full control over your hot water with a smart boiler management system. We install and configure a solution that maintains the desired temperature, controls heating based on a schedule, and allows you to manage everything through a mobile app.<br>The system reduces energy consumption by activating heating only when needed and operates on a local server without reliance on cloud services.<br>You can check the water temperature at any time, control the boiler remotely, and set up scenarios tailored to your lifestyle.',
    delivery: false,
    serviceSummary: [
      { line: 'Total service cost, including equipment and materials' },
      { label: 'Project timeline', value: '7 days (from request to completed setup)' },
      { label: 'On-site work time', value: '1 working day (after initial inspection by an engineer)' },
    ],
    features: [
      'Installation and setup of a temperature sensor in the rooftop tank',
      'Installation of a Cat6 cable from the boiler to the apartment electrical panel',
      'Installation and configuration of a local smart home server',
      'Replacement of the standard boiler switch with a smart controller connected to the server',
      'Installation and setup of a custom water heating control and scheduling system developed by our engineers',
      'Mobile app setup for remote access',
      'User training on how to operate the system'
    ],
    benefits: [
      '<b>Automation</b> – the boiler runs on schedules and smart scenarios',
      '<b>Energy Savings</b> – heating only when needed',
      '<b>Smarter Ventilation Decisions</b> – Avoid opening windows during dust storms, high noise levels, or poor outdoor air quality.',
      '<b>Remote Access</b> - control from anywhere via smartphone',
      '<b>Precise Temperature Control</b> - always comfortable hot water',
      '<b>Ease of Use</b> - simple controls and intuitive interface',
      '<b>Reliability</b> - runs on a local server without cloud dependency',
    ],
    category: 'Water control'
  },
  {
    id: 'altruist-and-purifiers',
    title: 'Air Quality Control During Dust Storms',
    description: 'Ensure clean and safe air at home even during dust storms.',
    price: 1050.00,
    image: '../img/shop/banners/altruist-and-purifiers/card-1.png',
    images: [
      '../img/shop/banners/altruist-and-purifiers/card-1.png',
      '../img/shop/banners/altruist-and-purifiers/card-2.png',
      '../img/shop/banners/altruist-and-purifiers/card-3.png',
      '../img/shop/banners/altruist-and-purifiers/card-4.png',
      '../img/shop/banners/altruist-and-purifiers/card-5.png',
      '../img/shop/banners/altruist-and-purifiers/card-6.png',
    ],
    available: true,
    slug: 'altruist-and-purifiers',
    fullDescription: 'Ensure clean and safe air at home even during dust storms.<br>We install and configure an air monitoring and purification system that automatically responds to changes in air quality and maintains a comfortable environment.<br>The system tracks outdoor dust levels and indoor CO₂ concentration, automatically controlling air purifiers. Everything runs on a local smart home server, with control and monitoring available through mobile app.<br>You can always check the air quality and be confident that the system maintains a healthy indoor climate. It also suggests when it’s safe to open the windows and when it’s better to keep them closed.',
    delivery: false,
    serviceSummary: [
      { line: 'Total service cost, including equipment and materials' },
      { label: 'Project timeline', value: '7 days (from request to completed setup)' },
      { label: 'On-site work time', value: '4–6 hours (within one day)' },
    ],
    howItWorksHtml: `
        <section class="product-detail__dust-story">
          <div class="layout product-detail__dust-story-inner">
            <div class="product-detail__dust-story-top grid grid-2">
              <div class="product-detail__dust-story-hero-frame">
                <img src="../img/shop/banners/altruist-and-purifiers/dust-storm-1.png" alt="Line chart: air quality across Cyprus cities during the Saharan dust storm, April 2-4, 2026"/>
              </div>
              <div class="product-detail__dust-story-intro">
                <p class="text-normal">During dust storms, for example, the Saharan dust storm in Cyprus (April 2-4, 2026, lasting 53 hours), air quality deteriorates not only outdoors but also indoors.</p>
                <p class="text-normal">The main issue is coarse dust particles. They behave differently:</p>
                <ul class="product-detail__dust-story-list text-normal">
                  <li>particles easily enter indoor spaces through windows, gaps, and ventilation</li>
                  <li>not all air purifiers detect them accurately</li>
                  <li>many consumer devices fail to trigger automatic purification in time</li>
                </ul>
              </div>
            </div>
            <div class="product-detail__dust-story-dashboards" role="group" aria-label="Sensor dashboard screenshots">
              <div class="product-detail__dust-story-dash-card">
                <img src="../img/shop/banners/altruist-and-purifiers/dust-storm-2.png" alt="Air quality dashboard: detailed measurements during the dust storm" loading="lazy"/>
              </div>
              <div class="product-detail__dust-story-dash-card">
                <img src="../img/shop/banners/altruist-and-purifiers/dust-storm-3.png" alt="Air quality dashboard: city comparison view" loading="lazy"/>
              </div>
              <div class="product-detail__dust-story-dash-card">
                <img src="../img/shop/banners/altruist-and-purifiers/dust-storm-4.png" alt="Air quality dashboard: timeline and sensor readings" loading="lazy"/>
              </div>
            </div>
            <div class="product-detail__dust-story-meta text-normal">
              <a href="https://x.com/SensorsSocial/status/2040375444797591705" class="product-detail__dust-story-social" target="_blank" rel="noopener noreferrer" aria-label="Sensors Social on X">
                <img src="../img/shop/banners/altruist-and-purifiers/sensors-social-icon.png" alt="" width="28" height="28" loading="lazy"/>
              </a>
              <p class="product-detail__dust-story-meta-copy text-normal">
                <a href="https://x.com/SensorsSocial/status/2040375444797591705" class="product-detail__dust-story-meta-handle" target="_blank" rel="noopener noreferrer"><b>x.com/SensorsSocial</b></a>
                <span class="product-detail__dust-story-meta-detail"> Cyprus Saharan Dust Storm — full analysis. April 2–4, 2026. 53 hours. 7 cities. 26 sensors. 50,000+ measurements.</span>
              </p>
            </div>
            <div class="product-detail__dust-story-columns grid grid-2">
              <div class="product-detail__dust-story-col">
                <h3 class="product-detail__dust-story-col-title subtitle">Health Risks</h3>
                <p class="text-normal product-detail__dust-story-lead">Such dust can:</p>
                <ul class="product-detail__dust-story-list text-normal">
                  <li>penetrate deep into the lungs</li>
                  <li>cause irritation of the eyes and respiratory system</li>
                  <li>worsen allergies and asthma</li>
                  <li>lead to fatigue, headaches, and a general decline in well-being</li>
                </ul>
              </div>
              <div class="product-detail__dust-story-col">
                <h3 class="product-detail__dust-story-col-title subtitle">Everyday Inconveniences</h3>
                <ul class="product-detail__dust-story-list text-normal">
                  <li>it's not possible to properly ventilate the space</li>
                  <li>dust settles on furniture and surfaces</li>
                  <li>sleep and concentration are affected</li>
                  <li>it's difficult to know when it's safe to open the windows</li>
                </ul>
              </div>
            </div>
          </div>
        </section>`,
    features: [
      'Installation of an outdoor dust sensor and a CO₂ sensor in the bedroom',
      'Installation and setup of a local smart home server',
      'Selection, supply, and installation of two air purifiers (living room and bedroom)',
      'Integration of air purifiers with the smart home system and setup of automatic scenarios',
      'Mobile app setup for remote access',
      'User training on how to operate the system'
    ],
    benefits: [
      '<b>Automatic Air Purification</b> – the system reacts to dust and CO₂ without your involvement',
      '<b>Healthy Indoor Climate</b> – real-time air quality monitoring',
      '<b>Dust Storm Protection</b> – clean air even in harsh conditions',
      '<b>Remote Control</b> - manage everything via smartphone from anywhere',
      '<b>Comfort</b> - fully automated, no constant attention needed',
      '<b>Reliability</b> - runs on a local server without cloud dependency',
    ],
    category: 'Altruist'
  },
  {
    id: 'remote-property-monitoring',
    title: 'Remote Property Monitoring in Cyprus',
    description: 'Monitor your property in Cyprus from anywhere in the world.',
    price: 1550.00,
    image: '../img/shop/banners/remote-property-monitoring/card-1.png',
    images: [
      '../img/shop/banners/remote-property-monitoring/card-1.png',
      '../img/shop/banners/remote-property-monitoring/card-2.png',
      '../img/shop/banners/remote-property-monitoring/card-3.png',
      '../img/shop/banners/remote-property-monitoring/card-4.png',
    ],
    available: true,
    slug: 'remote-property-monitoring',
    fullDescription: 'Monitor your property in Cyprus from anywhere in the world. We install and configure a system that allows you to track your apartment in real time, receive instant notifications, and quickly respond to any events.<br>The system combines video surveillance, motion sensors, door opening sensors, water leak detection, and energy monitoring into a single platform. All devices are connected to a local smart home server, ensuring stable and secure operation without reliance on cloud services.<br>You will always know what’s happening in your property — even when you’re abroad.',
    delivery: false,
    serviceSummary: [
      { line: 'Total service cost, including equipment and materials' },
      { label: 'Project timeline', value: '7 days (from request to completed setup)' },
      { label: 'On-site work time', value: '1–2 working days' },
    ],
    features: [
      'Installation and setup of an energy monitoring system',
      'Installation of water leak sensors',
      'Installation of an online PTZ camera in the living room',
      'Installation of motion sensors in every room',
      'Installation of door sensors for the entrance and balcony doors',
      'Installation and configuration of a local smart home server connecting all devices',
      'Setup of event notifications and remote access to property data',
      'Mobile app installation for remote access',
      'User training on how to operate the system'
    ],
    benefits: [
      '<b>Full Control</b> – all property data in one app',
      '<b>Security</b> – instant alerts for motion, door openings, and water leaks',
      '<b>Video Monitoring</b> – real-time camera access',
      '<b>Remote Access</b> - control your system from anywhere in the world',
      '<b>Piece of Mind</b> - always know your property is safe',
      '<b>Reliability</b> - runs on a local server without cloud dependency',
    ],
    category: 'Remote property monitoring'
  },
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
  // {
  //   id: 'smart-ptz-camera',
  //   title: 'Smart PTZ Camera with Installation & Automation',
  //   description: 'Indoor PTZ Wi-Fi camera with smart home integration.',
  //   price: 180.00,
  //   oldPrice: 230.00,
  //   additionalUnitPrice: 10.00, // Price for each additional unit after the first one
  //   image: '../img/shop/ptz-camera/card-1.png',
  //   images: [
  //     '../img/shop/banners/ptz-camera/card-1.jpg',
  //     '../img/shop/banners/ptz-camera/card-2.jpg',
  //     '../img/shop/banners/ptz-camera/card-3.jpg',
  //     '../img/shop/banners/ptz-camera/card-4.jpg',
  //     '../img/shop/banners/ptz-camera/card-5.jpg',
  //     '../img/shop/banners/ptz-camera/card-6.jpg',
  //     '../img/shop/banners/ptz-camera/card-7.jpg',
  //   ],
  //   available: true,
  //   slug: 'smart-ptz-camera-installation',
  //   fullDescription: 'Get a indoor PTZ camera with professional installation and smart home automation included. We install and configure the camera, set up monitoring scenarios, notifications, and integrate it into your smart home system for reliable everyday security. <br/> A single smart camera with panoramic view and remote control is often all you need for home security and peace of mind.',
  //   features: [
  //     'Reolink WIFI Indoor PTZ Camera 8MP E1 Zoom (E340) White',
  //     'Professional installation by our technicians',
  //     'Configuration and integration with your smart home system (e.g., Home Assistant, Alexa, Google Home)',
  //     'Guidance on using and automating your new smart camera'
  //   ],
  //   benefits: [
  //     'Automation – motion detection alerts',
  //     'Remote access – live video streaming from anywhere with pan, tilt, and zoom for full room control',
  //     'Smart Home Integration - Connect it to your existing smart home ecosystem',
  //     'Peace of mind – always know what’s happening at home'
  //   ],
  //   category: 'Smart PTZ Camera'
  // },
  // {
  //   id: 'boiler-switch-upgrade',
  //   title: 'Boiler Switch Upgrade - Home Assistant',
  //   description: 'Upgrade your boiler with a smart switch.',
  //   price: 160.00,
  //   oldPrice: 200.00,
  //   image: '../img/shop/banners/boiler-heater/card-1.png',
  //   images: [
  //     '../img/shop/banners/boiler-heater/card-1.jpg',
  //     '../img/shop/banners/boiler-heater/card-2.jpg',
  //     '../img/shop/banners/boiler-heater/card-3.jpg',
  //     '../img/shop/banners/boiler-heater/card-4.jpg',
  //     '../img/shop/banners/boiler-heater/card-5.jpg',
  //     '../img/shop/banners/boiler-heater/card-6.jpg',
  //   ],
  //   available: true,
  //   slug: 'boiler-switch-upgrade',
  //   // Additional details for product page
  //   fullDescription: `
  //     <p class="text-normal"><b>Control your boiler smartly and enjoy hot water exactly when you need it.</b></p>
  //     <p class="text-normal product-detail__desc-lead">Upgrade your existing boiler with smart automation — no replacement needed.</p>

  //     <p class="text-normal">
  //       We install a system that automatically controls your water heating, combining comfort and energy savings. <br/> Start your morning with hot water ready — no waiting for it to heat up.
  //     </p>

  //     <p class="text-normal product-detail__desc-heading"><b>What you get:</b></p>
  //     <ul class="product-detail__features-list">
  //       <li class="text-normal">Hot water ready in the morning or at your preferred time</li>
  //       <li class="text-normal">Smart home integration with Home Assistant</li>
  //       <li class="text-normal">Automatic schedules</li>
  //       <li class="text-normal">Save up to 30% on energy</li>
  //     </ul>

  //     <p class="text-normal product-detail__desc-heading"><b>How it works:</b></p>
  //     <p class="text-normal">
  //       Your existing boiler is upgraded with a smart controller using a 20A Wi‑Fi smart switch designed for boiler heaters.<br/>It is integrated into your smart home system via Home Assistant, where we set up automation and full control of your boiler.<br/> Water is heated automatically based on your preferred schedule and daily routines.
  //       No more waiting, no more wasted energy.
  //     </p>
  //   `,
  //   features: [
  //     'A smart switch for boiler heater 20A, Wi-Fi',
  //     'Professional installation by our technicians',
  //     'Integration with your smart home system via Home Assistant',
  //     'If you don’t have Home Assistant yet — choose the package with pre-installation for boiler integration and future smart home use',
  //     'Automation setup and control configuration',
  //     'Guidance on using and automating your new smart switch'
  //   ],
  //   benefits: [
  //     'Energy Efficiency — Automate your boiler heating to reduce energy consumption',
  //     'Smart Automation — Water heating runs automatically based on your daily routine',
  //     'Smart Home Integration — Powered by Home Assistant for a unified system',
  //     'Easy Expansion — Add new smart home services without paying for Home Assistant setup again'
  //   ],
  //   setupLabel: 'Choose your setup:',
  //   setupOptions: [
  //     {
  //       id: 'existing-home-assistant',
  //       title: 'Already have Home Assistant',
  //       iconBlue: '../img/shop/hass-blue.svg',
  //       iconWhite: '../img/shop/hass-white.svg',
  //       bullets: ['Boiler integration', 'Automation setup'],
  //       totalAdd: 0.00,
  //     },
  //     {
  //       id: 'new-home-assistant',
  //       title: 'New system Home Assistant',
  //       iconBlue: '../img/shop/hass-blue.svg',
  //       iconWhite: '../img/shop/hass-white.svg',
  //       bullets: ['Smart Home setup (one-time)', 'Boiler integration', 'Automation setup'],
  //       totalOld: 450.00,
  //       totalAdd: 150.00,
  //     }
  //   ],
  //   category: 'Smart Switches'
  // },
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



