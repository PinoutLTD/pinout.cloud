// Portfolio projects. Add a new one by appending an object to this list.
//
// group: 'completed' | 'progress'
// layout: 'grid' (two columns) or 'stack' (one column)
// media: one item is still a slider. A slide is either
//   { type: 'image', src, width, height, alt: { en, ru } }
//   { type: 'video', src, poster, alt: { en, ru } }
// An empty media array renders the gray placeholder slide.
// specs: { icon, width, height, label: { en, ru } } or { spacer: true }
// Strings that differ by language are { en, ru }. A plain string is used for both.

const portfolioEmptyLabel = {
  en: 'Photo coming soon',
  ru: 'Фото будет позже',
};

const portfolioProjects = [
  {
    id: 'residence-28',
    group: 'completed',
    layout: 'grid',
    title: 'Residence 28',
    link: { href: 'https://stylianidesgroup.com', label: 'stylianidesgroup.com' },
    media: [
      {
        type: 'image',
        src: '/img/portfolio/residence-28.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'Residence 28 buildings with the pool and palm-lined courtyard',
          ru: 'Корпуса Residence 28 с бассейном и пальмами во дворе',
        },
      }
    ],
    meta: { en: 'Residential development', ru: 'Жилая застройка' },
    stat: { en: '28 apartments', ru: '28 квартир' },
    text: {
      en: "Every apartment has its own Home Assistant server, so lighting, climate, curtains, hot water and security work as one system from one iPad, and residents' data stays in the flat.",
      ru: 'В каждой квартире свой сервер Home Assistant: свет, климат, шторы, горячая вода и охрана работают как одна система с одного iPad, а данные жильцов не уходят из квартиры.',
    },
    specs: [
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'curtains', label: { en: 'Automated curtain control', ru: 'Автоматические шторы' } },
      { icon: 'lightning', label: { en: 'Lighting & master switch', ru: 'Освещение и мастер-выключатель' } },
      { icon: 'motion-sensor', label: { en: 'Motion sensors', ru: 'Датчики движения' } },
      { icon: 'underfloor-heating', label: { en: 'Underfloor heating', ru: 'Тёплый пол' } },
      { icon: 'door', label: { en: 'Door and window sensors', ru: 'Датчики дверей и окон' } },
      { icon: 'ac', label: { en: 'Air conditioning control', ru: 'Управление кондиционером' } },
      { icon: 'water-leak', label: { en: 'Water leak sensors in wet areas', ru: 'Датчики протечки во влажных зонах' } },
      { icon: 'water-heater', width: 20, label: { en: 'Smart water heater switch', ru: 'Умный выключатель бойлера' } },
      { icon: 'ipad-control-panel', width: 20, label: { en: 'Control via iPad', ru: 'Управление с iPad' } },
    ],
  },
  {
    id: 'inex-qube',
    group: 'completed',
    layout: 'grid',
    title: 'INEX Qube A & B',
    link: { href: 'https://inex-group.com', label: 'inex-group.com' },
    media: [
      {
        type: 'image',
        src: '/img/portfolio/qube.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'Street facade of INEX Qube',
          ru: 'Фасад INEX Qube со стороны улицы',
        },
      },
    ],
    meta: { en: 'Residential development', ru: 'Жилая застройка' },
    stat: { en: '20 + 8 smart apartments', ru: '20 + 8 умных квартир' },
    text: {
      en: 'Every apartment in both buildings was handed over with Wi-Fi 7 and one control panel for lighting, climate, hot water and the intercom. The same standard in all 28 apartments.',
      ru: 'Каждая квартира в обоих зданиях сдана с Wi-Fi 7 и одной панелью, которая управляет светом, климатом, горячей водой и домофоном. Один стандарт во всех 28 квартирах.',
    },
    specs: [
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'master-switch', width: 22, label: { en: 'Master switch', ru: 'Мастер-выключатель' } },
      { icon: 'lightning', label: { en: 'Lighting control', ru: 'Управление освещением' } },
      { icon: 'hot-water-control', width: 18, label: { en: 'Temperature-based hot water control', ru: 'Управление горячей водой по температуре' } },
      { icon: 'underfloor-heating', label: { en: 'Electric underfloor heating', ru: 'Электрический тёплый пол' } },
      { icon: 'hot-water-control', width: 20, label: { en: 'Hot water recirculation pump control', ru: 'Насос рециркуляции горячей воды' } },
      { icon: 'ac', label: { en: 'Air conditioning control', ru: 'Управление кондиционером' } },
      { icon: 'ipad-control-panel', width: 20, label: { en: 'Unified smart home control panel', ru: 'Единая панель управления умным домом' } },
      { icon: 'dimmable-light', label: { en: 'Dimmable lighting in bathrooms', ru: 'Диммируемый свет в ванных' } },
      { icon: 'intercom', label: { en: 'Intercom integrated into control panel', ru: 'Домофон в панели управления' } },
      { icon: 'led-light', width: 27, label: { en: 'LED lighting along windows', ru: 'LED-подсветка вдоль окон' } },
      { icon: 'wifi', label: { en: 'Wi-Fi 7 network infrastructure', ru: 'Сетевая инфраструктура Wi-Fi 7' } },
    ],
  },
  {
    id: '5-queens',
    group: 'completed',
    layout: 'grid',
    title: '5Queens Villa',
    link: { href: 'https://5queens.com', label: '5queens.com' },
    media: [
      {
        type: 'image',
        src: '/img/portfolio/5-queens.png',
        width: 2199,
        height: 1377,
        alt: {
          en: '5Queens Villa with palms and a lit courtyard',
          ru: 'Вилла 5Queens с пальмами и подсвеченным двором',
        },
      },
    ],
    meta: { en: 'Private villa · Smart home retrofit', ru: 'Частная вилла · Модернизация умного дома' },
    text: {
      en: "We took over the villa's existing INELS smart home, upgraded its core and brought lighting, climate, hot water and cameras back into one system on Home Assistant. The owners now run the villa from one dashboard and give guests their own access.",
      ru: 'Мы взяли на себя существующий умный дом INELS, обновили его центральный модуль и вернули свет, климат, горячую воду и камеры в одну систему на Home Assistant. Теперь владельцы управляют виллой с одной панели и выдают гостям свой доступ.',
    },
    specs: [
      { icon: 'INELS', width: 25, label: { en: 'INELS central module upgrade', ru: 'Обновление центрального модуля INELS' } },
      { icon: 'lightning', label: { en: 'Lighting system restoration', ru: 'Восстановление системы освещения' } },
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'climate-control', width: 25, label: { en: 'Climate control restoration', ru: 'Восстановление климат-контроля' } },
      { icon: 'ipad-control-panel', width: 35, label: { en: 'Custom smart home dashboard', ru: 'Своя панель умного дома' } },
      { icon: 'hot-water-control', width: 18, label: { en: 'Hot water circulation restoration', ru: 'Восстановление циркуляции горячей воды' } },
      { icon: 'access', width: 35, label: { en: 'Individual & guest access', ru: 'Индивидуальный и гостевой доступ' } },
      { icon: 'camera', width: 28, label: { en: 'Camera system restoration', ru: 'Восстановление системы камер' } },
      { spacer: true },
      { icon: 'camera', width: 23, label: { en: 'Ajax security system maintenance', ru: 'Обслуживание охранной системы Ajax' } },
    ],
  },
  {
    id: 'garden-villa',
    group: 'completed',
    layout: 'stack',
    title: 'Garden Villa',
    media: [
      {
        type: 'image',
        src: '/img/portfolio/garden-villa.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'Garden Villa at night with warm facade lighting',
          ru: 'Garden Villa ночью с тёплой подсветкой фасада',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/garden-villa/1.jpg',
        width: 4032,
        height: 3024,
        alt: {
          en: 'Garden Villa entrance at dusk with path lighting',
          ru: 'Вход Garden Villa в сумерках с подсветкой дорожки',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/garden-villa/2.jpg',
        width: 4032,
        height: 3024,
        alt: {
          en: 'Garden Villa pool terrace and lit facade at night',
          ru: 'Терраса с бассейном и подсвеченный фасад Garden Villa ночью',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/garden-villa/3.jpg',
        width: 4032,
        height: 3024,
        alt: {
          en: 'Garden Villa dining room opening onto the terrace',
          ru: 'Столовая Garden Villa с выходом на террасу',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/garden-villa/4.jpg',
        width: 3948,
        height: 2567,
        alt: {
          en: 'Garden Villa pool at night with garden lighting',
          ru: 'Бассейн Garden Villa ночью с подсветкой сада',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/garden-villa/5.jpg',
        width: 4032,
        height: 3024,
        alt: {
          en: 'Garden Villa street facade at night',
          ru: 'Фасад Garden Villa со стороны улицы ночью',
        },
      },
    ],
    meta: { en: 'Private villa · Smart home automation', ru: 'Частная вилла · Автоматизация умного дома' },
    text: {
      en: 'Wi-Fi with no dead zones on all three floors and the outdoor area, eleven perimeter cameras and around twenty outdoor lighting groups that switch on at sunset and off at midnight by themselves. All of it runs on one Home Assistant server.',
      ru: 'Wi-Fi без мёртвых зон на трёх этажах и на территории, одиннадцать камер по периметру и около двадцати групп уличного света, которые сами включаются на закате и гаснут в полночь. Всё работает на одном сервере Home Assistant.',
    },
    specs: [
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'wifi', label: { en: 'Seamless Wi-Fi — 3 floors + outdoor area', ru: 'Бесшовный Wi-Fi — 3 этажа и территория' } },
      { icon: 'camera', width: 28, label: { en: '11 perimeter cameras', ru: '11 камер по периметру' } },
      { icon: 'lightning', label: { en: 'Outdoor lighting automation', ru: 'Автоматизация наружного освещения' } },
      { icon: 'lightning', width: 27, label: { en: 'Approx. 20 lighting groups', ru: 'Около 20 групп освещения' } },
      { icon: 'light-sunset', width: 30, label: { en: 'Automatic lighting from sunset to midnight', ru: 'Автоматический свет от заката до полуночи' } },
    ],
  },
  {
    id: 'princess-court',
    group: 'completed',
    layout: 'stack',
    title: 'Princess Court 2 - PH 302',
    link: { href: 'https://samiotisgroup.com', label: 'samiotisgroup.com' },
    media: [
      {
        type: 'image',
        src: '/img/portfolio/princess-court.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'Princess Court 2 apartment building',
          ru: 'Жилой дом Princess Court 2',
        },
      },
    ],
    meta: { en: 'Apartment · Smart home automation', ru: 'Квартира · Автоматизация умного дома' },
    text: {
      en: 'Smart home automation for a private penthouse, integrating essential home systems into a convenient control environment.',
      ru: 'Автоматизация умного дома для частного пентхауса: основные системы дома в одной среде управления.',
    },
    specs: [
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'lightning', label: { en: 'Lighting control', ru: 'Управление освещением' } },
      { icon: 'climate-control', width: 25, label: { en: 'Climate control', ru: 'Климат-контроль' } },
      { icon: 'water-heater', width: 20, label: { en: 'Smart water heater control', ru: 'Управление бойлером' } },
    ],
  },
  {
    id: 'la-residenza',
    group: 'completed',
    layout: 'stack',
    title: 'La Residenza — Apt 203',
    link: { href: 'https://stylianidesgroup.com', label: 'stylianidesgroup.com' },
    media: [
      {
        type: 'image',
        src: '/img/portfolio/la-residenza.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'La Residenza apartment building',
          ru: 'Жилой дом La Residenza',
        },
      },
    ],
    meta: { en: 'Apartment · Smart home automation', ru: 'Квартира · Автоматизация умного дома' },
    text: {
      en: 'Smart home automation for a private apartment.',
      ru: 'Автоматизация умного дома для частной квартиры.',
    },
    specs: [
      { icon: 'hass-server-integration', label: { en: 'Home Assistant server integration', ru: 'Интеграция сервера Home Assistant' } },
      { icon: 'lightning', label: { en: 'Lighting control', ru: 'Управление освещением' } },
      { icon: 'climate-control', width: 25, label: { en: 'Climate control', ru: 'Климат-контроль' } },
      { icon: 'water-heater', width: 20, label: { en: 'Smart water heater control', ru: 'Управление бойлером' } },
      { icon: 'curtains', label: { en: 'Automated curtains', ru: 'Автоматические шторы' } },
    ],
  },
  {
    id: 'makarta',
    group: 'completed',
    layout: 'stack',
    title: 'Makarta',
    media: [
      {
        type: 'image',
        src: '/img/portfolio/makarta.png',
        width: 2199,
        height: 1377,
        alt: {
          en: 'Makarta boutique hotel with a Pinout van in front',
          ru: 'Бутик-отель Makarta и автомобиль Pinout у входа',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/makarta/1.jpg',
        width: 3072,
        height: 4080,
        alt: {
          en: 'Makarta electrical panels during installation',
          ru: 'Электрощиты Makarta во время монтажа',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/makarta/2.jpg',
        width: 3072,
        height: 4080,
        alt: {
          en: 'Security camera on a Makarta balcony',
          ru: 'Камера видеонаблюдения на балконе Makarta',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/makarta/3.jpg',
        width: 3072,
        height: 4080,
        alt: {
          en: 'Makarta outdoor cabinet with a UPS and network equipment',
          ru: 'Уличный шкаф Makarta с ИБП и сетевым оборудованием',
        },
      },
      {
        type: 'image',
        src: '/img/portfolio/makarta/4.jpg',
        width: 3072,
        height: 4080,
        alt: {
          en: 'Makarta interior with track lighting during fit-out',
          ru: 'Интерьер Makarta с трековым освещением во время отделки',
        },
      },
    ],
    meta: { en: 'Hospitality · Boutique hotel', ru: 'Гостеприимство · Бутик-отель' },
    text: {
      en: 'Wi-Fi on every floor, electronic door locks the owner manages from an app, and six perimeter cameras. The network, recorder and gateway sit in outdoor cabinets with UPS backup.',
      ru: 'Wi-Fi на каждом этаже, электронные замки, доступом к которым владелец управляет из приложения, и шесть камер по периметру. Сеть, регистратор и шлюз стоят в уличных шкафах с резервным питанием от ИБП.',
    },
    specs: [
      { icon: 'wifi', label: { en: 'Wi-Fi on every floor', ru: 'Wi-Fi на каждом этаже' } },
      { icon: 'camera', width: 28, label: { en: '6 perimeter cameras', ru: '6 камер по периметру' } },
      { icon: 'gateway', width: 25, label: { en: 'Outdoor equipment cabinets — UPS, NVR & network gateway', ru: 'Уличные шкафы — ИБП, NVR и сетевой шлюз' } },
      { icon: 'door', width: 23, label: { en: 'Electronic door locks & readers with remote access management via app', ru: 'Электронные замки и считыватели с удалённым управлением доступом через приложение' } },
    ],
  },
  {
    id: 'kap-villa',
    group: 'progress',
    layout: 'stack',
    title: 'KAP Villa',
    media: [],
    meta: { en: 'Private villa', ru: 'Частная вилла' },
    text: {
      en: 'Smart home project combining KNX automation with Home Assistant integration and future Digital Butler capabilities.',
      ru: 'Проект умного дома: автоматизация KNX, интеграция Home Assistant и будущие возможности Digital Butler.',
    },
    specs: [
      { icon: 'knx', width: 53, label: { en: 'KNX automation', ru: 'Автоматизация KNX' } },
      { icon: 'hass-server-integration', label: { en: 'Home Assistant integration', ru: 'Интеграция Home Assistant' } },
      { icon: 'butter', width: 20, label: { en: 'Future Digital Butler integration', ru: 'Будущая интеграция Digital Butler' } },
    ],
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioProjects, portfolioEmptyLabel };
}
