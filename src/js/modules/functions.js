// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
export function goTop() {
  const goTop = document.querySelector('.to-top')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 1100) {
      goTop.classList.remove('hidden')
    } else {
      goTop.classList.add('hidden')
    }
  })
}
export function isBurger() {
  const burgerBtn = document.querySelector('.burger-btn')
  const burgerMenu = document.querySelector('.burger-menu')
  const overlay = document.querySelector('.overlay')
  burgerBtn.addEventListener('click', () => {
    if (!burgerMenu.classList.contains('burger-menu_active')) {
      document.querySelector('html').style.overflowY = 'hidden'
    } else {
      console.log(1);
      document.querySelector('html').style.overflowY = 'auto'
    }
    burgerMenu.classList.toggle('burger-menu_active')
    burgerBtn.classList.toggle('burger-btn_active')
    overlay.classList.toggle('overlay_active')
  })
  overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('burger-menu_active')
    burgerBtn.classList.remove('burger-btn_active')
    overlay.classList.remove('overlay_active')
    document.querySelector('html').style.overflowY = 'auto'
  })
}
export function isModal() {
  const modal = document.querySelector('.modal')
  if (modal) {
    const modalHide = (e) => {
      if (!e.target.closest('.modal__content') || e.target.closest('.modal__close')) {
        document.querySelectorAll('[data-modal]').forEach(modal => {
          modal.classList.remove('modal__content_active')
        })
        modal.classList.remove('modal_active')
      }
    }
    document.querySelectorAll('[data-modal-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const thisModal = document.querySelector(`[data-modal="${btn.dataset.modalBtn}"]`)
        thisModal.classList.add('modal__content_active')
        modal.classList.add('modal_active')
      })
    })
    document.querySelector('.modal').addEventListener('click', modalHide)
    document.querySelector('.modal__close').addEventListener('click', modalHide)
  }
}
export function isAccordion() {
  document.querySelectorAll('.accordion__btn').forEach(accordionBtn => {
    const accordionItem = accordionBtn.parentElement
    const accordionPanel = accordionBtn.nextElementSibling
    if (accordionItem.classList.contains('accordion__item_active')) {
      accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px'
    } else {
      accordionPanel.style.maxHeight = 0
    }
    accordionBtn.addEventListener('click', () => {
      if (accordionItem.classList.contains('accordion__item_active')) {
        accordionItem.classList.remove('accordion__item_active')
        accordionPanel.style.maxHeight = 0
      } else {
        accordionItem.classList.add('accordion__item_active')
        accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px'
      }
    })
  })
}
export function isVideo() {
  const videoBlock = document.querySelector('.video-block')
  if (videoBlock) {
    const videoBtn = videoBlock.querySelector('.video-block__play')
    const video = videoBlock.querySelector('.video-block__video')
    videoBtn.addEventListener('click', () => {
      videoBlock.classList.add('video-block_played')
      video.play()
      video.setAttribute('controls', 'controls')
      videoBtn.classList.add('hidden')
    })
    video.onpause = () => {
      videoBlock.classList.remove('video-block_played')
      videoBtn.classList.remove('hidden')
      video.removeAttribute('controls')
    }
  }
}
export function inputFileChange() {
  document.querySelectorAll('.attach input').forEach(input => {
    if (input) {
      input.addEventListener('change', () => {
        const attach = input.closest('.attach')
        attach.classList.add('attach_active')
        input.files[0] ? attach.querySelector('span').innerHTML = input.files[0].name : null
      })
    }
  })
}
export function setShadowVacancyBtn() {
  const vacancyBtns = document.querySelectorAll('.vacancy__item-btn')
  if (vacancyBtns) {
    vacancyBtns.forEach(vacancyBtn => {
      vacancyBtn.addEventListener('mouseover', shadow)
      vacancyBtn.addEventListener('focus', shadow)
      vacancyBtn.addEventListener('mouseout', shadowDel)
      vacancyBtn.addEventListener('blur', shadowDel)

      function shadow() {
        const vacancyItem = vacancyBtn.closest('.vacancy__item')
        vacancyItem.style.boxShadow = '0px 80px 80px -20px rgba(154, 156, 165, 0.08), 0px 30px 24px -10px rgba(154, 156, 165, 0.05), 0px 12px 10px -6px rgba(154, 156, 165, 0.04), 0px 4px 4px -4px rgba(30, 33, 44, 0.03)'
      }

      function shadowDel() {
        const vacancyItem = vacancyBtn.closest('.vacancy__item')
        vacancyItem.style.boxShadow = 'none'
      }
    })
  }
}
export function createModal() {
  document.querySelectorAll('.vacancy__item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector('[data-modal="vacancy"]')
      const title = btn.closest('li').querySelector('.vacancy__item-title').innerHTML
      modal.querySelector('.positions-modal__title').innerHTML = title
    })
  })
}
export function setDisableField() {
  if (document.querySelectorAll('.field, .checkbox, .radio, .select, .attach')) {
    document.querySelectorAll('.field input').forEach(input => {
      if (input.hasAttribute('disabled')) {
        input.parentElement.classList.add('disabled')
      }
    })
  }
}
export function setCircleProgress() {
  let i = 0
  document.querySelectorAll('.statistics__progress-circle').forEach((circle) => {
    const fillingPercente = [98, 67, 75, 100]
    const percentageProgress = Math.floor(fillingPercente[i])
    const radius = circle.getAttribute('r')
    const circleLenghth = 2 * Math.PI * radius
    circle.setAttribute('stroke-dasharray', circleLenghth)
    circle.setAttribute('stroke-dashoffset', circleLenghth - circleLenghth * percentageProgress / 100)
    i++
  })
}
