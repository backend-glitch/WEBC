const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");

let index = 0;

document.querySelector(".next").addEventListener("click", () => {
    index++;
    if (index >= slides.length) index = 0;
    updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
    index--;
    if (index < 0) index = slides.length - 1;
    updateSlider();
});

function updateSlider() {
    slider.style.transform = `translateX(${-600 * index}px)`;
}
