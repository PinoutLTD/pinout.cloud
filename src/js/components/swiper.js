const swiperSpecialOffer = new Swiper('.swiper', {

  speed: 400,
  slidesPerView: 1,
  slidesPerGroup: 1,
  grid: {
    rows: 1,
  },
  spaceBetween: 32,
  fadeEffect: {
    crossFade: true,
  },

  navigation: {
    nextEl: '.solutions__button-next',
    prevEl: '.solutions__button-prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,

  },

  a11y: {
    prevSlideMessage: 'Previous',
    nextSlideMessage: 'Next',
  }

});
