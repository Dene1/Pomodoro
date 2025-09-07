import { TIME } from './constants'
import {
  playSound,
  updateDisplay,
  updateLogo,
  getCounterFromLocalStorage,
  getSoundStatus
} from './function'
import { pomodoroTitle, shortTitle, longTitle } from './status-ui'

const resetButton = document.querySelector('.main__controls__reset')
const nextButton = document.querySelector('.main__controls__next')
const logo = document.querySelector('.logo')
const startButton = document.querySelector('.main__controls__start')

const body = document.body

const chip = document.querySelector('.main__title')

const pomodoroTime = TIME.WORK_TIME
const shortBreak = TIME.SHORT_BREAK
const longBreak = TIME.LONG_BREAK

let defaultTimer = pomodoroTime
let timeLeft = defaultTimer

console.log(defaultTimer, timeLeft)

const status = {
  state: 'pomodoro',
  isRunning: false
}

logo.addEventListener('click', () => window.location.reload())

//localhost

let pomodoroCount =
  getCounterFromLocalStorage() == null ? 1 : getCounterFromLocalStorage()

const saveItemsToLocalStorage = () =>
  localStorage.setItem('timer', JSON.stringify(pomodoroCount))

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
  playSound()
  resetCounterContainer.classList.remove('visually-hidden')
  return modal.classList.add('visually-hidden')
})

counterReset.addEventListener('click', function () {
  playSound()
  console.log(localStorage.getItem('timer'))
  localStorage.setItem('timer', '1')
  counter.innerHTML = `#${(pomodoroCount = 1)}`
  resetCounterContainer.classList.add('visually-hidden')
})

counterClose.addEventListener('click', function () {
  playSound()
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

function startTimer() {
  if (!status.isRunning) {
    status.isRunning = true
    startButton.textContent = 'Pause'
    updateLogo()
    defaultTimer = setInterval(() => {
      timeLeft--
      updateDisplay(timeLeft)
      console.log(timeLeft)
      console.log(defaultTimer)

      if (timeLeft === 0) {
        clearInterval(defaultTimer)
        status.state === 'pomodoro' && playSound('break')
        switchMode()
        body.classList.toggle('darkmode')
        updateLogo()
      }
    }, 1000)
  } else {
    pauseTimer(defaultTimer)
    playSound()
    body.classList.toggle('darkmode')
  }
}

function pauseTimer(defaultTimer) {
  status.isRunning = false
  clearInterval(defaultTimer)
  updateLogo()
  body.classList.toggle('darkmode')
  startButton.textContent = 'Start'
}

function resetTimer() {
  if (status.state === 'pomodoro') {
    timeLeft = pomodoroTime
    clearInterval(defaultTimer)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
  } else if (status.state === 'short') {
    timeLeft = shortBreak
    clearInterval(defaultTimer)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
  } else if (status.state === 'long') {
    timeLeft = longBreak
    clearInterval(defaultTimer)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
  }
}

function switchMode() {
  if (status.state === 'pomodoro') {
    timeLeft = shortBreak
    clearInterval(defaultTimer)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    updateDisplay(timeLeft)
    chip.innerHTML = shortTitle
    status.state = 'short'
  } else if (status.state === 'short') {
    if ((pomodoroCount + 1) % 4 === 0) {
      timeLeft = longBreak
      clearInterval(defaultTimer)
      updateLogo()
      startButton.textContent = 'Start'
      status.isRunning = false
      updateDisplay(timeLeft)
      chip.innerHTML = longTitle
      status.state = 'long'
    } else {
      timeLeft = pomodoroTime
      clearInterval(defaultTimer)
      updateLogo()
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
    updateLogo()
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

let soundStatus = getSoundStatus() === true
const soundSlider = document.getElementById('sound')

const saveStatusSound = (status) =>
  localStorage.setItem('sound', JSON.stringify(status))

saveStatusSound(soundStatus)
soundSlider.checked = soundStatus

buttonSetting.addEventListener('click', function () {
  modal.classList.add('visually-hidden')
  playSound()
  return modal.classList.remove('visually-hidden')
})

close.addEventListener('click', function () {
  playSound()
  return modal.classList.add('visually-hidden')
})

console.log(getSoundStatus(), soundStatus, typeof soundStatus)

soundSlider.addEventListener('change', function () {
  saveStatusSound(this.checked)
})