import "./style.css";

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slidesContainer = document.querySelector(
  ".slides-container"
) as HTMLElement;
const containerImages = document.querySelector(
  ".container__images"
) as HTMLElement;
const dots = document.querySelectorAll(".container__button--dots");

let slideIndex: number = 0;
const slideWidth: number = slidesContainer ? containerImages.clientWidth : 0;
const totalSlides: number = slidesContainer
  ? slidesContainer.children.length
  : 0;

// Initialize slider
const initializeSlider = () => {
  if (slidesContainer && slideWidth) {
    slidesContainer.style.transform = `translateX(-${
      slideIndex * slideWidth
    }px)`;
    updateDots();
    startAutoSlide();
  }
};
document.addEventListener("DOMContentLoaded", initializeSlider);

// Update dots
const updateDots = () => {
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === slideIndex) {
      dot.classList.add("active");
    }
  });
};

const goToSlide = (index: number) => {
  slideIndex = index;
  if (slidesContainer && slideWidth) {
    slidesContainer.style.transform = `translateX(-${
      slideIndex * slideWidth
    }px)`;
    updateDots();
    stopAutoSlide();
    startAutoSlide();
  }
};

let slideInterval: number | null = null;
let intervalDuration = 7000;
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    slideIndex = (slideIndex + 1) % totalSlides;
    goToSlide(slideIndex);
    console.log();
  }, intervalDuration);
};

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

if (prevButton && nextButton && slidesContainer && slideWidth) {
  prevButton.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    goToSlide(slideIndex);
    stopAutoSlide();
  });

  nextButton.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % totalSlides;
    goToSlide(slideIndex);
    stopAutoSlide();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});
