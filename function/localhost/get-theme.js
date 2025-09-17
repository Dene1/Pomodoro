export const getTheme = () => {
  const rawData = localStorage.getItem('theme')
  if (!rawData) {
    return 'light'
  }
  return JSON.parse(rawData)
}