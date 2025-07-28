const startButton = document.querySelector(".main__controls__start");
const resetButton = document.querySelector(".main__controls__reset");
const nextButton = document.querySelector(".main__controls__next");

const title = document.querySelector(".main__title");

const timer = document.querySelector(".main__timer");


startButton.addEventListener("click", () => {
  timer.classList.toggle("timer--active");
  startButton.classList.toggle("button__main--active");
  // Для вторичных кнопок
  resetButton.classList.toggle("button__secondary--active");
  nextButton.classList.toggle("button__secondary--active");
  title.classList.toggle("main__title--active");

  document.body.style.backgroundColor = "var(--color-red-95)";

  // Для теста - добавьте console.log
  console.log("Классы resetButton:", resetButton.classList);
  console.log("Классы nextButton:", nextButton.classList);


});