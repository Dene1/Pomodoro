export const playSound = function (sound) {
  const soundStatus = JSON.parse(localStorage.getItem('sound') || 'true')

  if (!soundStatus) return

  const workTime = new Audio('assets/sounds/sound-button-press.wav')
  const breakTime = new Audio('assets/sounds/alarm-digital.mp3')

  workTime.play()

  sound === 'break' && breakTime.play()
}