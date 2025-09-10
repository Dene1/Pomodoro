const min = document.getElementById('minutes')
const sec = document.getElementById('seconds')

export const convertTimeForDisplay = function (timeLeft) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  min.textContent = String(minutes).padStart(2, '0')
  sec.textContent = String(seconds).padStart(2, '0')

  console.log(
    minutes,
    seconds,
    (min.textContent = String(minutes).padStart(2, '0')),
    (sec.textContent = String(seconds).padStart(2, '0'))
  )
}