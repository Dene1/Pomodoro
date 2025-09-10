export const getTimers = () => {
  const rawData = localStorage.getItem('timers')

  if (rawData) {
    const timer = JSON.parse(rawData)

    document.getElementById('work').value = timer.pomodoro
    document.getElementById('short-break').value = timer.short
    document.getElementById('long-break').value = timer.long

    return timer
  }
  return {
    pomodoro: 25,
    short: 5,
    long: 15
  }
}