export function updateButtonIcon(isRunning) {
  const playIcon = document.querySelector('.icon-play')
  const pauseIcon = document.querySelector('.icon-pause')

  if (!playIcon || !pauseIcon) {
    console.error('Иконки не найдены!')
    return
  }

  if (isRunning) {
    playIcon.classList.add('visually-hidden')
    pauseIcon.classList.remove('visually-hidden')
  } else {
    pauseIcon.classList.add('visually-hidden')
    playIcon.classList.remove('visually-hidden')
  }
}