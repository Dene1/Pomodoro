export const playSound = function (isWorkTime) {
  const workTime = new Audio("assets/sounds/sound-button-press.wav");
  const breakTime = new Audio("assets/sounds/alarm-digital.mp3");


  const audio = isWorkTime ? breakTime : workTime

  audio.play()
}