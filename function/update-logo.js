// const textLogo = document.querySelectorAll('.header__logo__img')
//
// export const updateLogo = function () {
//   const currentTheme = localStorage.getItem('theme')
//   console.log(currentTheme)
//   const isDarkMode = document.body.classList.contains('darkmode')
//
//   textLogo.forEach(
//     (logo) =>
//       (logo.src = isDarkMode ? logo.dataset.darkSrc : logo.dataset.lightSrc)
//   )
// }

const textLogo = document.querySelector('.header__logo__img')

export const updateLogo = function () {
  const currentTheme = localStorage.getItem('theme') || 'red'
  const isDarkMode = document.documentElement.classList.contains('darkmode')

  console.log(currentTheme)
  // Определяем правильный источник изображения
  let logoSrc

  if (currentTheme === 'red') {
    logoSrc = isDarkMode ? textLogo.dataset.darkSrc : textLogo.dataset.lightSrc
  } else if (currentTheme === 'blue') {
    logoSrc = isDarkMode
      ? textLogo.dataset.blueDarkSrc
      : textLogo.dataset.blueLightSrc
  } else if (currentTheme === 'green') {
    logoSrc = isDarkMode
      ? textLogo.dataset.greenDarkSrc
      : textLogo.dataset.greenLightSrc
  }

  // Обновляем src
  textLogo.src = logoSrc
  textLogo.setAttribute('data-theme', currentTheme)

  console.log(
    `Logo updated: ${currentTheme} theme, ${isDarkMode ? 'dark' : 'light'} mode`
  )
}