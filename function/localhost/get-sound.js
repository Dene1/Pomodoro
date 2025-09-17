export const getSoundStatus = () => {
  const rawData = localStorage.getItem('sound')
  if (!rawData) {
    return undefined
  }

  return JSON.parse(rawData)
}