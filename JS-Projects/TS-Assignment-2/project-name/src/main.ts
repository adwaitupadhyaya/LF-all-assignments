import "./style.css";

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

const slides = document.querySelectorAll(".container__images img");

console.log(slides);
let slideIndex: number = 0;
let intervalId: number | undefined;

// initialize slider
const initializeSlider = () => {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 5000);
  }
};
document.addEventListener("DOMContentLoaded", initializeSlider);

const showSlide = (index: number) => {
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[index].classList.add("displaySlide");
};

if (prevButton) {
  prevButton.addEventListener("click", () => {
    slideIndex = (slideIndex - 1) % slides.length;
    console.log(slideIndex);
    showSlide(slideIndex);
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    console.log(slideIndex);
    showSlide(slideIndex);
  });
}
