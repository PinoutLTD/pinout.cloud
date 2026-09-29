function portfolioLocale() {
  return document.documentElement.lang === 'ru' ? 'ru' : 'en';
}

function portfolioText(value, locale) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.en || '';
}

function portfolioSlide(item, locale) {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide';

  if (!item) {
    const note = document.createElement('p');
    note.className = 'visually-hidden';
    note.textContent = portfolioText(
      typeof portfolioEmptyLabel !== 'undefined' ? portfolioEmptyLabel : '',
      locale
    );
    slide.appendChild(note);
    return slide;
  }

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.className = 'portfolio-project__video';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', portfolioText(item.alt, locale));
    if (item.poster) video.poster = item.poster;
    const source = document.createElement('source');
    source.src = item.src;
    source.type = item.mime || 'video/mp4';
    video.appendChild(source);
    slide.appendChild(video);
    return slide;
  }

  const img = document.createElement('img');
  img.src = item.src;
  img.alt = portfolioText(item.alt, locale);
  if (item.width) img.width = item.width;
  if (item.height) img.height = item.height;
  if (item.width && item.height && item.height > item.width) {
    slide.classList.add('portfolio-project__slide--tall');
  }
  slide.appendChild(img);
  return slide;
}

function portfolioSpec(spec, locale) {
  const item = document.createElement('li');
  if (spec.spacer) {
    item.className = 'portfolio-spec portfolio-spec--spacer';
    item.setAttribute('aria-hidden', 'true');
    return item;
  }

  item.className = 'portfolio-spec';
  const icon = document.createElement('img');
  icon.className = 'portfolio-spec__icon';
  icon.src = `/img/portfolio/icons/${spec.icon}.svg`;
  icon.alt = '';
  icon.width = spec.width || 24;
  icon.height = spec.height || 25;
  const label = document.createElement('span');
  label.className = 'text-normal';
  label.textContent = portfolioText(spec.label, locale);
  item.append(icon, label);
  return item;
}

function portfolioArticle(project, locale) {
  const article = document.createElement('article');
  article.className = 'portfolio-project';

  const media = document.createElement('div');
  const slides = project.media && project.media.length ? project.media : [null];
  media.className = slides[0]
    ? 'portfolio-project__media'
    : 'portfolio-project__media portfolio-project__media--empty';

  const slider = document.createElement('div');
  slider.className = 'swiper portfolio-project__slider';
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  slides.forEach((item) => wrapper.appendChild(portfolioSlide(item, locale)));
  const dots = document.createElement('div');
  dots.className = 'portfolio-project__dots';
  slider.append(wrapper, dots);
  media.appendChild(slider);

  const body = document.createElement('div');
  body.className = 'portfolio-project__body';

  const meta = document.createElement('p');
  meta.className = 'text-normal portfolio-project__meta';
  meta.textContent = portfolioText(project.meta, locale);

  const title = document.createElement('h3');
  title.className = 'subtitle portfolio-project__title';
  title.textContent = portfolioText(project.title, locale);

  body.append(meta, title);

  if (project.stat) {
    const stat = document.createElement('p');
    stat.className = 'text-normal text-uppercase portfolio-project__stat';
    stat.textContent = portfolioText(project.stat, locale);
    body.appendChild(stat);
  }

  const text = document.createElement('p');
  text.className = 'text-normal portfolio-project__text';
  text.textContent = portfolioText(project.text, locale);
  body.appendChild(text);

  if (project.specs && project.specs.length) {
    const list = document.createElement('ul');
    list.className = project.layout === 'stack'
      ? 'portfolio-project__specs portfolio-project__specs--stack'
      : 'portfolio-project__specs';
    project.specs.forEach((spec) => list.appendChild(portfolioSpec(spec, locale)));
    body.appendChild(list);
  }

  if (project.link && project.link.href) {
    const link = document.createElement('a');
    link.className = 'text-normal portfolio-project__link';
    link.href = project.link.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = project.link.label || project.link.href;
    body.appendChild(link);
  }

  article.append(media, body);
  return article;
}

function initPortfolioSlider(root) {
  if (typeof Swiper === 'undefined') return;

  const dots = root.querySelector('.portfolio-project__dots');
  const swiper = new Swiper(root, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    watchOverflow: false,
    pagination: {
      el: dots,
      clickable: true,
      type: 'bullets',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  swiper.on('slideChangeTransitionStart', () => {
    root.querySelectorAll('video').forEach((video) => video.pause());
  });
}

function renderPortfolio() {
  if (typeof portfolioProjects === 'undefined') return;

  const locale = portfolioLocale();
  document.querySelectorAll('[data-portfolio-group]').forEach((mount) => {
    const group = mount.getAttribute('data-portfolio-group');
    const projects = portfolioProjects.filter((project) => project.group === group);
    mount.replaceChildren(...projects.map((project) => portfolioArticle(project, locale)));
    mount.querySelectorAll('.portfolio-project__slider').forEach(initPortfolioSlider);
  });
}

if (document.querySelector('[data-portfolio-group]')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPortfolio);
  } else {
    renderPortfolio();
  }
}
