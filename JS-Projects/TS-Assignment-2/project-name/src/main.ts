import "./style.css";

const prevButton = document.querySelector(".prev");
if (prevButton) {
  prevButton.addEventListener("click", () => {
    console.log("prev clicked");
    // prevSlide();
  });
}

const nextButton = document.querySelector(".next");
if (nextButton) {
  nextButton.addEventListener("click", () => {
    console.log("next clicked");
    // nextSlide();
  });
}

const slides = document.querySelectorAll(".container__images img");
let slideIndex: number = 0;
let intervalId: number | null = null;

// initialize slider
const initializeSlider = () => {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }
};
document.addEventListener("DOMContentLoaded", initializeSlider);

const showSlide = (index: number) => {
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[index].classList.add("displaySlide");
};

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length; // Use modulo operator for wrap-around
  showSlide(slideIndex);
};
