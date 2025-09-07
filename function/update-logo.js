const textLogo = document.querySelectorAll('.header__logo__img')

export const updateLogo = function () {
  const isDarkMode = document.body.classList.contains('darkmode')
  textLogo.forEach(
    (logo) =>
      (logo.src = isDarkMode ? logo.dataset.darkSrc : logo.dataset.lightSrc)
  )
}