function SettingsButton() {
  const buttonSettings = document.querySelector('.threedot')

  buttonSettings.addEventListener('click', function () {
    buttonSettings.classList.toggle('active')
  })

  return buttonSettings
}