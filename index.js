import {
  playSound,
  convertTimeForDisplay,
  updateLogo,
  getCounterFromLocalStorage,
  getSoundStatus,
  getTimers,
  saveTimersToLocalStorage,
  getTheme,
  updateButtonIcon
} from './function'
import { pomodoroTitle, shortTitle, longTitle } from './status-ui'

const resetButton = document.querySelector('.main__controls__reset')
const nextButton = document.querySelector('.main__controls__next')
const logo = document.querySelector('.logo')
const startButton = document.querySelector('.main__controls__start')
const statusUI = document.querySelector('.main__title')

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
  mode: getTheme(),
  color: 'red',
  sound: true,
  isRunning: false,
  counter: getCounterFromLocalStorage()
}

logo.addEventListener('click', () => window.location.reload())

// color theme
const colorPicker = document.getElementById('colorPicker')

colorPicker.addEventListener('change', function () {
  const selectedTheme = this.value

  //Сохраняем тему
  localStorage.setItem('theme', selectedTheme)

  //Применяем тему к документу
  document.documentElement.setAttribute('data-theme', selectedTheme)

  // Обновляем логотип
  updateLogo()
})

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('theme') || 'red'
  colorPicker.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
  updateLogo()
})

//localhost

let pomodoroCount = status.counter

const saveItemsToLocalStorage = (status) =>
  localStorage.setItem('counter', JSON.stringify(status))

saveItemsToLocalStorage(pomodoroCount)

// Buttons //

resetButton.addEventListener('click', () => {
  resetTimer()
  playSound()
})

startButton.addEventListener('click', () => {
  updateButtonIcon(status.isRunning)
  startTimer()
  playSound()
})

nextButton.addEventListener('click', () => {
  switchMode()
  playSound()
})

// timer

const pomodoro = document.getElementById('pomodoro-session')
const short = document.getElementById('short-break')
const long = document.getElementById('long-break')

pomodoro.addEventListener('click', () => {
  playSound()
  timeLeft = pomodoroTime

  if (status.isRunning === true) {
    if (status.state !== 'pomodoro') {
      status.state = 'pomodoro'
      statusUI.innerHTML = pomodoroTitle
      resetTimer()
    }
  }
  updateButtonIcon(status.isRunning)
  status.state = 'pomodoro'
  statusUI.innerHTML = pomodoroTitle
  convertTimeForDisplay(pomodoroTime)
})

short.addEventListener('click', () => {
  playSound()
  timeLeft = shortBreak

  if (status.isRunning === true) {
    if (status.state !== 'short') {
      status.state = 'short'
      statusUI.innerHTML = shortTitle
      resetTimer()
    }
  }
  updateButtonIcon(status.isRunning)
  status.state = 'short'
  statusUI.innerHTML = shortTitle
  convertTimeForDisplay(shortBreak)
})

long.addEventListener('click', () => {
  playSound()
  timeLeft = longBreak

  if (status.isRunning === true) {
    if (status.state !== 'long') {
      status.state = 'long'
      statusUI.innerHTML = longTitle
      resetTimer()
      timeLeft = longBreak
    }
  }
  updateButtonIcon(status.isRunning)
  status.state = 'long'
  statusUI.innerHTML = longTitle
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

  if (status.isRunning === true) {
    status.isRunning = false
    if (status.state !== 'pomodoro') {
      status.state = 'pomodoro'
      statusUI.innerHTML = pomodoroTitle
      resetTimer()
    }
  }

  localStorage.setItem('counter', '1')
  counter.innerHTML = `#${(pomodoroCount = 1)}`
  resetCounterContainer.classList.add('visually-hidden')
  status.state = 'pomodoro'
  statusUI.innerHTML = pomodoroTitle
  resetTimer()
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
  saveItemsToLocalStorage(pomodoroCount)
}

// Timer
let time

function startTimer() {
  if (!status.isRunning) {
    status.isRunning = true
    updateLogo()
    updateButtonIcon(status.isRunning)
    time = setInterval(() => {
      timeLeft--
      convertTimeForDisplay(timeLeft)
      console.log(timeLeft)
      console.log(timer)
      if (timeLeft === 0) {
        clearInterval(time)
        status.state === 'pomodoro' && playSound('break')
        switchMode()
        updateLogo()
      }
    }, 1000)
  } else {
    pauseTimer(time)
    playSound()
  }
}

function pauseTimer(timer) {
  status.isRunning = false
  clearInterval(timer)
  updateLogo()
  updateButtonIcon(status.isRunning)
}

function resetTimer() {
  if (status.state === 'pomodoro') {
    timeLeft = pomodoroTime
    status.isRunning = false
    clearInterval(time)
    updateLogo()
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(pomodoroTime)
  } else if (status.state === 'short') {
    clearInterval(time)
    updateLogo()
    status.isRunning = false
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(shortBreak)
  } else if (status.state === 'long') {
    clearInterval(time)
    updateLogo()
    status.isRunning = false
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(longBreak)
  }
}

function switchMode() {
  if (status.state === 'pomodoro') {
    timeLeft = shortBreak
    clearInterval(time)
    updateLogo()
    status.isRunning = false
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(timeLeft)
    statusUI.innerHTML = shortTitle
    status.state = 'short'
    if (pomodoroCount % 4 === 0) {
      timeLeft = longBreak
      clearInterval(time)
      updateLogo()
      status.isRunning = false
      updateButtonIcon(status.isRunning)
      convertTimeForDisplay(timeLeft)
      statusUI.innerHTML = longTitle
      status.state = 'long'
    }
  } else if (status.state === 'short') {
    timeLeft = pomodoroTime
    clearInterval(time)
    updateLogo()
    status.isRunning = false
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(timeLeft)
    pomodoroRender(1)
    statusUI.innerHTML = pomodoroTitle
    status.state = 'pomodoro'
  } else if (status.state === 'long') {
    timeLeft = pomodoroTime
    clearInterval(time)
    updateLogo()
    status.isRunning = false
    updateButtonIcon(status.isRunning)
    convertTimeForDisplay(timeLeft)
    statusUI.innerHTML = pomodoroTitle
    status.state = 'pomodoro'
    pomodoroRender(1)
  }
}

// Settings //

const buttonSetting = document.querySelector('.threedot')
const modal = document.querySelector('.settings')
const close = document.querySelector('.settings__header__close')

let soundStatus = getSoundStatus() === undefined ? true : getSoundStatus()
const soundSlider = document.getElementById('sound')

const saveStatusSound = (status) =>
  localStorage.setItem('sound', JSON.stringify(status))

saveStatusSound(soundStatus)

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
  soundStatus = this.checked
  status.state = this.checked
})

const focusTime = document.getElementById('work')
const shortBreakTime = document.getElementById('short')
const longBreakTime = document.getElementById('long')

focusTime.addEventListener('input', function () {
  playSound()
  pomodoroTime = Number(this.value) * 60
  saveTimersToLocalStorage('pomodoro', this.value)
  status.state === 'pomodoro' && convertTimeForDisplay(pomodoroTime)
})

shortBreakTime.addEventListener('input', function () {
  playSound()
  shortBreak = Number(this.value) * 60
  saveTimersToLocalStorage('short', this.value)
  status.state === 'short' && convertTimeForDisplay(shortBreak)
})

longBreakTime.addEventListener('input', function () {
  playSound()
  longBreak = Number(this.value) * 60
  saveTimersToLocalStorage('long', this.value)
  status.state === 'long' && convertTimeForDisplay(longBreak)
})

// darkmode

const themeSlider = document.getElementById('darkmode')

const saveStatusTheme = (status) =>
  localStorage.setItem('mode', JSON.stringify(status))

saveStatusTheme(status.mode)

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
  // Восстанавливаем настройки
  const savedTheme = localStorage.getItem('theme') || 'red'
  const savedMode = JSON.parse(localStorage.getItem('mode') || '"light"')

  // Применяем настройки theme-change
  document.documentElement.setAttribute('data-theme', savedTheme)

  // Применяем темный режим
  if (savedMode === 'dark') {
    document.documentElement.classList.add('darkmode')
    themeSlider.checked = true
  }

  status.color = savedTheme
  status.mode = savedMode
  updateLogo()
})

colorPicker.addEventListener('change', function () {
  const selectedTheme = this.value

  // theme-change автоматически применит тему через data-attributes
  document.documentElement.setAttribute('data-theme', selectedTheme)
  localStorage.setItem('theme', selectedTheme)

  // Обновляем статус для логотипа
  status.color = selectedTheme
  updateLogo()
})

// Обработчик темного режима - нужно реализовать отдельно
themeSlider.addEventListener('change', function () {
  const isDarkMode = this.checked

  if (isDarkMode) {
    document.documentElement.classList.add('darkmode')
    status.mode = 'dark'
  } else {
    document.documentElement.classList.remove('darkmode')
    status.mode = 'light'
  }

  localStorage.setItem('mode', JSON.stringify(status.mode))
  updateLogo()
})