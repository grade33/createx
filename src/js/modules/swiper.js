import Swiper, {
  Navigation,
  Pagination,
  Autoplay,
  Thumbs,
  Keyboard
} from 'swiper';

const swiperDef = new Swiper('.banner__swiper', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  speed: 1000,
  simulateTouch: false,
  watchSlidesProgress: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<button class="' + className + '" type="button">' + ((index + 1) < 10 ? '0' : '') + (index + 1) + '<span class="swiper-pagination-bullet-bar"></span>' + "</button>";
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

const swiperPojects = new Swiper('.projects__swiper', {
  modules: [Navigation, Keyboard],
  loop: true,
  speed: 500,
  simulateTouch: false,
  slidesPerView: 1,
  watchSlidesProgress: true,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
    pageUpDow: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
    },
    // when window width is >= 1201px
    1201: {
      slidesPerView: 3,
    }
  }
})

const swiperReview = new Swiper('.review__swiper', {
  modules: [Navigation],
  speed: 500,
  simulateTouch: false,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

const swiperWorkThumb = new Swiper('.swiper-preview__swiper-thumb', {
  modules: [Navigation],
  spaceBetween: 10,
  slidesPerView: 5,
  watchSlidesProgress: true,
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
    // when window width is >= 1201px
    1201: {
      slidesPerView: 10,
      spaceBetween: 20,
    }
  }
})

const swiperWork = new Swiper('.swiper-preview__swiper', {
  modules: [Navigation, Thumbs],
  loop: true,
  speed: 400,
  simulateTouch: false,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperWorkThumb,
  },
})

const swiperHistory = new Swiper('.history__swiper', {
  modules: [Navigation, Keyboard],
  simulateTouch: false,
  speed: 500,
  slidesPerView: 1,
  watchSlidesProgress: true,
  keyboard: {
    enabled: true,
    pageUpDow: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

if (swiperHistory) {
  document.querySelectorAll('.history__nav-btn').forEach((historyBtn, number) => {
    historyBtn.setAttribute('data-index', number)
    if (historyBtn.dataset.index == swiperHistory.activeIndex) {
      historyBtn.classList.add('history__nav-btn_active')
    }
    historyBtn.addEventListener('click', () => {
      document.querySelectorAll('.history__nav-btn').forEach(el => {
        el.classList.remove('history__nav-btn_active')
      })
      historyBtn.classList.add('history__nav-btn_active')
      swiperHistory.slideTo(historyBtn.dataset.index)
    })
  })

  swiperHistory.on('slideChange', () => {
    document.querySelectorAll('.history__nav-btn').forEach(el => {
      el.classList.remove('history__nav-btn_active')
    })
    document.querySelector(`[data-index="${swiperHistory.activeIndex}"]`).classList.add('history__nav-btn_active')
  })
}

// All swipers tabindex settings
const swipers = [swiperDef, swiperPojects, swiperReview, swiperWorkThumb, swiperWork, swiperHistory]
swipers.forEach(swiper => {
  if (swiper.$el) {
    const swiperDom = swiper.$el[0]
    swiperDom.querySelectorAll('.swiper-slide').forEach(slide => {
      if (!slide.classList.contains('swiper-slide-visible')) {
        slide.setAttribute('tabindex', -1)
      }
    })
    swiper.on('slideChange', () => {
      swiperDom.querySelectorAll('.swiper-slide').forEach(slide => {
        if(slide.classList.contains('swiper-slide-visible')) {
          slide.setAttribute('tabindex', 0)
        }
        else {
          slide.setAttribute('tabindex', -1)
        }
      })
    })
  }
})
