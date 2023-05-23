function toHoursAndMinutes (totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { h: hours, m: minutes, s: seconds }
}

export default toHoursAndMinutes
