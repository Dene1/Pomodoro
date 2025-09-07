export const getCounterFromLocalStorage = () => {
  const rawData = localStorage.getItem('timer')
  if (!rawData) {
    return []
  }

  try {
    const parsedData = JSON.parse(rawData)
    return parsedData ? parsedData : []
  } catch {
    console.error('Could not parse items from LocalStorage')
    return []
  }
}