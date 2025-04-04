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
  const navLinks = document.querySelector('.header__list').querySelectorAll('.nav__item');
  navLinks.forEach(link => {
    if(link.querySelector('.nav__link').href === window.location.href){
        if(!document.body.classList.contains('dark')) {
          link.style.backgroundColor = '#191919'
          link.style.color = '#ffffff'
          link.style.padding = '2px 5px'
        } else {
          link.style.backgroundColor = '#ffffff'
          link.style.color = '#191919'
          link.style.padding = '2px 5px'
        }
    }
  })


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

  // comment placeholder
  // const packOptions = document?.querySelectorAll('.solutions__want-link');
  // const comment = document?.querySelector('#mce-COMMENT')
  // packOptions.forEach(opt => {
  //   opt.addEventListener('click', (e) => {
  //     comment.value = e.target.dataset.comment
  //   })
  // })

})
