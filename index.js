import { TIME } from "./constants"
import { playSound } from "./function"

const resetButton = document.querySelector(".main__controls__reset");
const nextButton = document.querySelector(".main__controls__next");
const logo = document.querySelectorAll(".header__logo__img");
const min = document.getElementById("minutes");
const sec = document.getElementById("seconds");
const startButton = document.querySelector(".main__controls__start");
const body = document.body;


let currentState = TIME.WORK_TIME;
let timeLeft = currentState;
let timerId = null;
let timerInterval;
let isRunning = false;

startButton.addEventListener("click", () => {
  body.classList.toggle("darkmode");
  startTimer();
});

resetButton.addEventListener("click", () => {
  body.classList.remove("darkmode");
  resetTimer()
  return resetButton.removeEventListener("click", () => resetTimer())
});

function updateLogos() {
  const isDarkMode = document.body.classList.contains("darkmode");
  logo.forEach(logo => {
    logo.src = isDarkMode
      ? logo.dataset.darkSrc
      : logo.dataset.lightSrc;
  });
}

function updateDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  min.textContent = String(minutes).padStart(2, "0");
  sec.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {

  if (!isRunning) {
    isRunning = true;
    startButton.textContent = "Pause";
    playSound();
    updateLogos();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay(timeLeft);
      console.log(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        playSound(TIME.BREAK);
        // switchMode();
      }
    }, 1000);
  } else {
    pauseTimer();
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  playSound()
  updateLogos()
  startButton.textContent = "Start";
}

function resetTimer() {
  clearInterval(timerInterval);
  updateLogos();
  playSound()
  isRunning = false;
  startButton.textContent = "Start";
  timeLeft = currentState;
  updateDisplay(timeLeft);
}