export const saveTimersToLocalStorage = (type, value) => {
  // 1. Сначала получаем ВСЕ текущие настройки из localStorage
  const allTimers = JSON.parse(localStorage.getItem('timers')) || {
    pomodoro: 25,
    short: 5,
    long: 15
  }
  // 2. Обновляем ТОЛЬКО нужный таймер, сохраняя остальные без изменений
  allTimers[type] = value
  // 3. Сохраняем обратно ВЕСЬ объект
  localStorage.setItem('timers', JSON.stringify(allTimers))
}