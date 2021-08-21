const hamburger = document.querySelector('.menu');
const sliderContainer = document.querySelector('.slider-container');

hamburger.addEventListener('click', () => {
    sliderContainer.classList.toggle('show-menu')
})