document.addEventListener('DOMContentLoaded', () => {

  const burger = document?.querySelector(".burger");
  const menu = document?.querySelector('.header__nav');
  const solutionsPopup = document?.querySelector('#popup-drag');

  // burger button for mobile menu
  burger?.addEventListener("click", (e) => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');

    if (menu?.classList.contains('header__nav--active')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Close menu');
      stopScroll();
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Open menu');
      getScroll();
    }
  })

  // activate current nav link
  const navList = document.querySelector('.header__list');
  const navItems = navList?.querySelectorAll('.nav__item') ?? [];
  const currentPathname = window.location.pathname.replace(/\/+$/, '') || '/';

  navItems.forEach((item) => {
    const anchor = item.querySelector('.nav__link');
    if (!anchor?.href) return;

    let linkPathname = '/';
    try {
      linkPathname = new URL(anchor.href).pathname.replace(/\/+$/, '') || '/';
    } catch (_) {
      return;
    }

    const isExactMatch = linkPathname === currentPathname;
    const isShopSectionMatch = currentPathname.startsWith('/shop') && linkPathname === '/shop';

    if (isExactMatch || isShopSectionMatch) {
      item.classList.add('nav__item--active');
    }
  });


  // plans details drag&drop
  document.querySelector('#popup-drag')?.addEventListener('dragstart', (event) => dragStart(event));
  document.querySelector('.solutions')?.addEventListener('dragenter', (event) => dragEnter(event));
  document.querySelector('.solutions')?.addEventListener('drop', (event) => dragDrop(event));
  document.querySelector('.solutions')?.addEventListener('dragover', (event) => dragOver(event));

  // show popup only in solutions section
  const showPopupInSolutions = () => {
    const section = document.querySelector('.solutions');
    const position = section.getBoundingClientRect();

    // Checking whether the specified section is visible
    if (position.top < window.innerHeight && position.bottom >= 600) {
      document.querySelector('#popup-drag').style.display = "block";
      return;
    } else {
      document.querySelector('#popup-drag').style.display = "none";
    }
  }

  if(solutionsPopup) {
    window.addEventListener("scroll", showPopupInSolutions);
  }


  // 404 page animation trigger
  document.querySelector('.page-404__link')?.addEventListener("mouseover", (event) => {
    document.querySelector('.page-404__img').classList.add('animate');
  });
  document.querySelector('.page-404__link')?.addEventListener("mouseleave", (event) => {
    document.querySelector('.page-404__img').classList.remove('animate');
  });

  // animation on viewport

  const element = document?.querySelector('.about-us-rocket');
  const observer = new IntersectionObserver(entries => {
    element.classList.toggle( 'landing', entries[0].isIntersecting );
  });

  if(element) {
    observer.observe( element )
  }

})
