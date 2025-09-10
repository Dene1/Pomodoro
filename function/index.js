import { playSound } from './sound/play-sound.js'
import { convertTimeForDisplay } from './convert-for-display.js'
import { updateLogo } from './update-logo.js'
import { getCounterFromLocalStorage } from './localhost/get-counter.js'
import { getSoundStatus } from './localhost/get-sound.js'
import { getTimers } from './localhost/get-timers.js'
import { saveTimersToLocalStorage } from './localhost/save-timer.js'

export {
  playSound,
  convertTimeForDisplay,
  updateLogo,
  getCounterFromLocalStorage,
  getSoundStatus,
  getTimers,
  saveTimersToLocalStorage
}