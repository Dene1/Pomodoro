export const getSoundStatus = () => {
  const rawData = localStorage.getItem('sound')
  if (!rawData) {
    return []
  }

  const parsedData = JSON.parse(rawData)
  return !!parsedData
}