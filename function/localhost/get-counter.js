export const getCounterFromLocalStorage = () => {
  const rawData = localStorage.getItem('counter')
  if (!rawData) {
    return undefined
  }

  try {
    const parsedData = JSON.parse(rawData)
    return parsedData ? parsedData : []
  } catch {
    console.error('Could not parse items from LocalStorage')
    return undefined
  }
}