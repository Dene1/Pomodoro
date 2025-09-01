let isSoundEnabled = true

export const playSound = function (isWorkTime) {
  if (!isSoundEnabled) return

  const workTime = new Audio('assets/sounds/sound-button-press.wav')
  const breakTime = new Audio('assets/sounds/alarm-digital.mp3')

  const audio = isWorkTime ? breakTime : workTime

  if (isWorkTime === 'break') {
    audio.pause()
    audio.currentTime = 0
    return
  }

  audio.play()
}