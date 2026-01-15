// Special Offer Swiper
const swiperSpecialOffer = new Swiper('.swiper-solutions', {

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

// Product Detail Swiper with Thumbnails
  const thumbsSwiper = new Swiper('.product-detail__thumbs', {
    spaceBetween: 10,
    slidesPerView: 5,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: true,
    allowTouchMove: true,

    touchRatio: 1,
    touchAngle: 45,
    threshold: 10,

    // Prevent free mode to keep slides aligned
    freeMode: false,
    
    // Ensure slides stay within bounds
    resistance: true,
    resistanceRatio: 0.85,

    direction: 'vertical',
    breakpoints: {
      0: {
        direction: 'horizontal',
        slidesPerView: 5,
      },
      871: {
        direction: 'vertical',
        slidesPerView: 5,
      }
    }
  });

  const mainSwiper = new Swiper('.product-detail__swiper', {
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: {
      el: '.product-detail__swiper .swiper-pagination',
      clickable: true,
      type: 'bullets'
    },
    navigation: {
      nextEl: '.product-detail__swiper-button-next',
      prevEl: '.product-detail__swiper-button-prev',
      hideOnClick: false,
    },
    thumbs: {
      swiper: thumbsSwiper
    }
  });

  // Make swiper accessible globally for color switching
  if (mainSwiper) {
    window.mainSwiper = mainSwiper;
  }

