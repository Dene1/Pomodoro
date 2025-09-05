import { TIME } from './constants'
import { pomodoroTitle, shortTitle, longTitle, playSound } from './function'

const resetButton = document.querySelector('.main__controls__reset')
const nextButton = document.querySelector('.main__controls__next')
const logo = document.querySelector('.logo')
const textLogo = document.querySelectorAll('.header__logo__img')
const startButton = document.querySelector('.main__controls__start')

const body = document.body

const min = document.getElementById('minutes')
const sec = document.getElementById('seconds')

const chip = document.querySelector('.main__title')

const pomodoroTime = TIME.WORK_TIME
const shortBreak = TIME.SHORT_BREAK
const longBreak = TIME.LONG_BREAK

let currentTime = null
let defaultTimer = pomodoroTime
let timeLeft = defaultTimer

console.log(defaultTimer, timeLeft)

const status = {
  state: 'pomodoro',
  isRunning: false
}

//localhost

const getItemsFromLocalStorage = () => {
  const rawData = localStorage.getItem('timer')
  if (!rawData) {
    return []
  }

  try {
    const parsedData = JSON.parse(rawData)
    return parsedData ? parsedData : []
  } catch {
    console.error('Could not parse items from LocalStorage')
    return []
  }
}

let pomodoroCount =
  getItemsFromLocalStorage() == null ? 1 : getItemsFromLocalStorage()

const saveItemsToLocalStorage = () =>
  localStorage.setItem('timer', JSON.stringify(pomodoroCount))

logo.addEventListener('click', () => window.location.reload())

// Buttons //

resetButton.addEventListener('click', () => {
  body.classList.remove('darkmode')
  resetTimer()
  playSound()
})

startButton.addEventListener('click', () => {
  body.classList.toggle('darkmode')
  startTimer()
  playSound()
  console.log(status.state)
})

nextButton.addEventListener('click', () => {
  status.isRunning === true && body.classList.toggle('darkmode')
  switchMode()
  playSound()
})

// Timer buttons

const pomodoro = document.getElementById('pomodoro-session')
const short = document.getElementById('short-break')
const long = document.getElementById('long-break')

pomodoro.addEventListener('click', () => {
  playSound()

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'pomodoro') {
      status.state = 'pomodoro'
      chip.innerHTML = pomodoroTitle
      resetTimer()
      updateDisplay(pomodoroTime)
    }
  }

  status.state = 'pomodoro'
  chip.innerHTML = pomodoroTitle
  resetTimer()
  updateDisplay(pomodoroTime)
})

short.addEventListener('click', () => {
  playSound()

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'short') {
      status.state = 'short'
      chip.innerHTML = shortTitle
      updateDisplay(shortBreak)
      resetTimer()
    }
  }
  status.state = 'short'
  chip.innerHTML = shortTitle
  updateDisplay(shortBreak)
  resetTimer()
})

long.addEventListener('click', () => {
  playSound()

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'long') {
      status.state = 'short'
      chip.innerHTML = longTitle
      updateDisplay(longBreak)
      resetTimer()
    }
  }
  status.state = 'long'
  chip.innerHTML = longTitle
  updateDisplay(longBreak)
  resetTimer()
})

// Counter

const counter = document.getElementById('counter')
const counterReset = document.getElementById('counter-yes')
const counterClose = document.getElementById('counter-no')

const resetCounterContainer = document.querySelector('.main__overlay')
counter.addEventListener('click', () => {
  resetCounterContainer.classList.remove('visually-hidden')
  return modal.classList.add('visually-hidden')
})

counterReset.addEventListener('click', function () {
  console.log(localStorage.getItem('timer'))
  localStorage.setItem('timer', '1')
  counter.innerHTML = `#${(pomodoroCount = 1)}`
  resetCounterContainer.classList.add('visually-hidden')
})

counterClose.addEventListener('click', function () {
  return resetCounterContainer.classList.add('visually-hidden')
})

counter.innerHTML = `#${pomodoroCount}`

function pomodoroRender(a) {
  a
    ? (counter.innerHTML = `#${++pomodoroCount}`)
    : (counter.innerHTML = `#${pomodoroCount}`)
  saveItemsToLocalStorage()
}

// Timer //

function updateLogos() {
  const isDarkMode = document.body.classList.contains('darkmode')
  textLogo.forEach(
    (logo) =>
      (logo.src = isDarkMode ? logo.dataset.darkSrc : logo.dataset.lightSrc)
  )
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
        switchMode()
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
    timeLeft = shortBreak
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
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
    chip.innerHTML = shortTitle
    status.state = 'short'
  } else if (status.state === 'short') {
    if ((pomodoroCount + 1) % 4 === 0) {
      timeLeft = longBreak
      clearInterval(defaultTimer)
      updateLogos()
      startButton.textContent = 'Start'
      status.isRunning = false
      updateDisplay(timeLeft)
      chip.innerHTML = longTitle
      status.state = 'long'
    } else {
      timeLeft = pomodoroTime
      clearInterval(defaultTimer)
      updateLogos()
      startButton.textContent = 'Start'
      status.isRunning = false
      updateDisplay(timeLeft)
      pomodoroRender(1)
      chip.innerHTML = pomodoroTitle
      status.state = 'pomodoro'
    }
  } else if (status.state === 'long') {
    timeLeft = pomodoroTime
    clearInterval(defaultTimer)
    updateLogos()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
    chip.innerHTML = pomodoroTitle
    status.state = 'pomodoro'
    pomodoroRender(1)
  }
}

// Settings //

const buttonSetting = document.querySelector('.threedot')
const modal = document.querySelector('.settings')
const close = document.querySelector('.settings__header__close')
const soundSlider = document.querySelector('.switch input[type="checkbox"]')

buttonSetting.addEventListener('click', function () {
  modal.classList.add('visually-hidden')
  return modal.classList.remove('visually-hidden')
})

close.addEventListener('click', function () {
  return modal.classList.add('visually-hidden')
})

// soundSlider.addEventListener('change', () => {
//   playSound('break') // Останавливаем текущий звук
// })