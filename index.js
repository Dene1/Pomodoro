import { TIME } from './constants'
import { playSound } from './function'

const resetButton = document.querySelector('.main__controls__reset')
const nextButton = document.querySelector('.main__controls__next')
const logo = document.querySelector('.logo')
const textLogo = document.querySelectorAll('.header__logo__img')
const startButton = document.querySelector('.main__controls__start')

const body = document.body

const min = document.getElementById('minutes')
const sec = document.getElementById('seconds')
const counter = document.getElementById('counter')
const pomodoro = document.getElementById('pomodoro-session')
const short = document.getElementById('short-break')
const long = document.getElementById('long-break')

const pomodoroTime = TIME.WORK_TIME
const shortBreak = TIME.SHORT_BREAK
const longBreak = TIME.LONG_BREAK

let currentTime = null
let defaultTimer = pomodoroTime
let timeLeft = defaultTimer

let pomodoroCount = 1

const status = {
  state: 'pomodoro',
  isRunning: false
}

logo.addEventListener('click', () => {
  window.location.reload()
})

// Buttons //

resetButton.addEventListener('click', () => {
  body.classList.remove('darkmode')
  resetTimer()
  playSound()
  // return resetButton.removeEventListener('click', () => resetTimer())
})

startButton.addEventListener('click', () => {
  body.classList.toggle('darkmode')
  startTimer()
  playSound()
})

nextButton.addEventListener('click', () => {
  status.isRunning === true && body.classList.toggle('darkmode')
  switchMode()
  playSound()
})

pomodoro.addEventListener('click', () => {
  currentTime = pomodoroTime
  updateDisplay(currentTime)
  playSound()
})

short.addEventListener('click', () => {
  currentTime = shortBreak
  updateDisplay(currentTime)
  playSound()
})

long.addEventListener('click', () => {
  currentTime = longBreak
  updateDisplay(currentTime)
  playSound()
})

// Counter
function pomodoroRender(a) {
  a
    ? (counter.innerHTML = `#${++pomodoroCount}`)
    : (counter.innerHTML = `#${pomodoroCount}`)
}

pomodoroRender()

function changeCounter() {
  status.state === 'short' && pomodoroCount % 4 === 0
    ? (status.state = 'long')
    : (status.state = 'pomodoro')
}

// Timer //

const checkStatus = () => {}

function updateLogos() {
  const isDarkMode = document.body.classList.contains('darkmode')
  textLogo.forEach((logo) => {
    logo.src = isDarkMode ? logo.dataset.darkSrc : logo.dataset.lightSrc
  })
}

function updateDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  min.textContent = String(minutes).padStart(2, '0')
  sec.textContent = String(seconds).padStart(2, '0')
}

function startTimer() {
  if (!status.isRunning) {
    status.isRunning = true
    startButton.textContent = 'Pause'
    updateLogos()
    defaultTimer = setInterval(() => {
      timeLeft--
      updateDisplay(timeLeft)
      console.log(timeLeft)
      console.log(defaultTimer)

      if (timeLeft <= 0) {
        clearInterval(defaultTimer)
        playSound(TIME.BREAK)
        // switchMode();
      }
    }, 1000)
  } else {
    pauseTimer(defaultTimer)
  }
}

function pauseTimer(defaultTimer) {
  status.isRunning = false
  clearInterval(defaultTimer)
  updateLogos()
  startButton.textContent = 'Start'
}

function resetTimer() {
  if (status.state === 'pomodoro') {
    timeLeft = pomodoroTime
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
  } else if (status.state === 'short') {
    timeLeft = longBreak
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
    status.state = 'long'
  } else if (status.state === 'long') {
    timeLeft = longBreak
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
  }
}

function switchMode() {
  if (status.state === 'pomodoro') {
    timeLeft = shortBreak
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
    status.state = 'short'
  } else if (status.state === 'short') {
    if ((pomodoroCount + 1) % 4 === 0) {
      timeLeft = longBreak
      clearInterval(defaultTimer)
      updateLogos()
      startButton.textContent = 'Start'
      status.isRunning = false
      updateDisplay(timeLeft)
      status.state = 'long'
    } else {
      timeLeft = pomodoroTime
      clearInterval(defaultTimer)
      updateLogos()
      startButton.textContent = 'Start'
      status.isRunning = false
      updateDisplay(timeLeft)
      pomodoroRender(1)
      status.state = 'pomodoro'
    }
  } else if (status.state === 'long') {
    timeLeft = pomodoroTime
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
    status.state = 'pomodoro'
    pomodoroRender(1)
  }
}

console.log(pomodoroCount)

//localhost

const getItemsFromLocalStorage = () => {
  const rawData = localStorage.getItem('timer')
  if (!rawData) {
    return []
  }

  try {
    const parsedData = JSON.parse(rawData)
    return Array.isArray(parsedData) ? parsedData : []
  } catch {
    console.error('Could not parse items from LocalStorage')
    return []
  }
}

const saveItemsToLocalStorage = () => {
  localStorage.setItem('timer', JSON.stringify(pomodoroCount.count))
}

// Settings //

const buttonSettings = document.querySelector('.threedot')
const modal = document.querySelector('.settings')
const close = document.querySelector('.settings__header__close')
const soundSlider = document.querySelector('.switch input[type="checkbox"]')

buttonSettings.addEventListener('click', function () {
  modal.classList.add('visually-hidden')
  return modal.classList.remove('visually-hidden')
})

close.addEventListener('click', function () {
  return modal.classList.add('visually-hidden')
})

// soundSlider.addEventListener('change', () => {
//   playSound('break') // Останавливаем текущий звук
// })