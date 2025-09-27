export const getTheme = () => {
  const rawData = localStorage.getItem('mode')
  if (!rawData) {
    return 'light'
  }
  return JSON.parse(rawData)
}