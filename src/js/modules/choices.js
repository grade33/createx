import Choices from "choices.js";
document.querySelectorAll('.choice').forEach((el) => {
  let choices = new Choices(el, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
  })
})
