import { TIME } from './constants'
import {
  playSound,
  convertTimeForDisplay,
  updateLogo,
  getCounterFromLocalStorage,
  getSoundStatus,
  getTimers,
  saveTimersToLocalStorage
} from './function'
import { pomodoroTitle, shortTitle, longTitle } from './status-ui'

const resetButton = document.querySelector('.main__controls__reset')
const nextButton = document.querySelector('.main__controls__next')
const logo = document.querySelector('.logo')
const startButton = document.querySelector('.main__controls__start')

const body = document.body
const chip = document.querySelector('.main__title')

const timer = getTimers()

let pomodoroTime = Number(timer.pomodoro) * 60
let shortBreak = Number(timer.short) * 60
let longBreak = Number(timer.long) * 60

console.log(getTimers())
console.log(pomodoroTime, shortBreak, shortBreak, longBreak)

let timeLeft = pomodoroTime
convertTimeForDisplay(timeLeft)

const status = {
  state: 'pomodoro',
  isRunning: false
}

logo.addEventListener('click', () => window.location.reload())

// display

//localhost

let pomodoroCount =
  getCounterFromLocalStorage() === undefined ? 1 : getCounterFromLocalStorage()

const saveItemsToLocalStorage = () =>
  localStorage.setItem('counter', JSON.stringify(pomodoroCount))

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

// timer

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
    }
  }

  //clearInterval(timer)
  //     updateLogo()
  //     startButton.textContent = 'Start'
  //     status.isRunning = false
  //     convertTimeForDisplay(pomodoroTime)

  status.state = 'pomodoro'
  chip.innerHTML = pomodoroTitle
  convertTimeForDisplay(pomodoroTime)
})

short.addEventListener('click', () => {
  playSound()

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'short') {
      status.state = 'short'
      chip.innerHTML = shortTitle
      resetTimer()
    }
  }

  status.state = 'short'
  chip.innerHTML = shortTitle
  convertTimeForDisplay(shortBreak)
})

long.addEventListener('click', () => {
  playSound()

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'long') {
      status.state = 'short'
      chip.innerHTML = longTitle
      resetTimer()
    }
  }
  status.state = 'long'
  chip.innerHTML = longTitle
  convertTimeForDisplay(longBreak)
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
  localStorage.setItem('counter', '1')
  counter.innerHTML = `#${(pomodoroCount = 1)}`
  resetCounterContainer.classList.add('visually-hidden')

  if (status.isRunning === true) {
    body.classList.toggle('darkmode')
    if (status.state !== 'pomodoro') {
      status.state = 'pomodoro'
      chip.innerHTML = pomodoroTitle
      resetTimer()
    }
  }

  status.state = 'pomodoro'
  chip.innerHTML = pomodoroTitle
  convertTimeForDisplay(pomodoroTime)
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

// Timer
let time

function startTimer() {
  if (!status.isRunning) {
    status.isRunning = true
    startButton.textContent = 'Pause'
    updateLogo()
    time = setInterval(() => {
      timeLeft--
      convertTimeForDisplay(timeLeft)
      console.log(timeLeft)
      console.log(timer)

      if (timeLeft === 0) {
        clearInterval(time)
        status.state === 'pomodoro' && playSound('break')
        switchMode()
        body.classList.toggle('darkmode')
        updateLogo()
      }
    }, 1000)
  } else {
    pauseTimer(time)
    playSound()
    body.classList.toggle('darkmode')
  }
}

function pauseTimer(timer) {
  status.isRunning = false
  clearInterval(timer)
  updateLogo()
  body.classList.toggle('darkmode')
  startButton.textContent = 'Start'
}

function resetTimer() {
  if (status.state === 'pomodoro') {
    timeLeft = pomodoroTime
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(pomodoroTime)
  } else if (status.state === 'short') {
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(shortBreak)
  } else if (status.state === 'long') {
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(longBreak)
  }
}

function switchMode() {
  if (status.state === 'pomodoro') {
    timeLeft = shortBreak
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(timeLeft)
    chip.innerHTML = shortTitle
    status.state = 'short'
    if (pomodoroCount % 4 === 0) {
      timeLeft = longBreak
      clearInterval(time)
      updateLogo()
      startButton.textContent = 'Start'
      status.isRunning = false
      convertTimeForDisplay(timeLeft)
      chip.innerHTML = longTitle
      status.state = 'long'
    }
  } else if (status.state === 'short') {
    timeLeft = pomodoroTime
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(timeLeft)
    pomodoroRender(1)
    chip.innerHTML = pomodoroTitle
    status.state = 'pomodoro'
  } else if (status.state === 'long') {
    timeLeft = pomodoroTime
    clearInterval(time)
    updateLogo()
    startButton.textContent = 'Start'
    status.isRunning = false
    convertTimeForDisplay(timeLeft)
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

soundSlider.addEventListener('change', function () {
  saveStatusSound(this.checked)
})

const focusTime = document.getElementById('work')
const shortBreakTime = document.getElementById('short')
const longBreakTime = document.getElementById('long')

focusTime.addEventListener('input', function () {
  console.log('Новое значение pomo:', this.value)
  // Тут можно обновлять ваш таймер или другие элементы
  playSound()

  pomodoroTime = Number(this.value) * 60
  convertTimeForDisplay(pomodoroTime)
  saveTimersToLocalStorage('pomodoro', this.value)
})

shortBreakTime.addEventListener('input', function () {
  console.log('Новое значение short:', this.value)
  // Тут можно обновлять ваш таймер или другие элементы
  playSound()

  shortBreak = Number(this.value) * 60
  convertTimeForDisplay(shortBreak)
  saveTimersToLocalStorage('short', this.value)
})

longBreakTime.addEventListener('input', function () {
  console.log('Новое значение long:', this.value)
  playSound()

  // Тут можно обновлять ваш таймер или другие элементы
  longBreak = Number(this.value) * 60
  convertTimeForDisplay(longBreak)
  saveTimersToLocalStorage('long', this.value)
})