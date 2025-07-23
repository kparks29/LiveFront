interface ShortLongEntry {
  short: string
  long: string
}

const defaultEntry: ShortLongEntry = { short: 'TBD', long: 'TBD' }


const monthMap = new Map<number, ShortLongEntry>([
  [1, { short: 'Jan', long: 'January' }],
  [2, { short: 'Feb', long: 'February' }],
  [3, { short: 'Mar', long: 'March' }],
  [4, { short: 'Apr', long: 'April' }],
  [5, { short: 'May', long: 'May' }],
  [6, { short: 'Jun', long: 'June' }],
  [7, { short: 'Jul', long: 'July' }],
  [8, { short: 'Aug', long: 'Auguest' }],
  [9, { short: 'Sept', long: 'September' }],
  [10, { short: 'Oct', long: 'October' }],
  [11, { short: 'Nov', long: 'November' }],
  [12, { short: 'Dec', long: 'December' }]
])

const dayMap = new Map<number, ShortLongEntry>([
  [1, { short: 'Sun', long: 'Sunday' }],
  [2, { short: 'Mon', long: 'Monday' }],
  [3, { short: 'Tue', long: 'Tuesday' }],
  [4, { short: 'Wed', long: 'Wednesday' }],
  [5, { short: 'Thu', long: 'Thursday' }],
  [6, { short: 'Fri', long: 'Friday' }],
  [7, { short: 'Sat', long: 'Saturday' }]
])

export function getMonth(date: Optional<string> | Date): ShortLongEntry {
  if (!date) {
    return defaultEntry
  }

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return monthMap.get(date.getMonth()) ?? defaultEntry
}

export function getDate(date: Optional<string> | Date): string {
  if (!date) {
    return defaultEntry.short
  }

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return `${date.getDate()}`
}

export function getDayOfTheWeek(date: Optional<string> | Date): ShortLongEntry {
  if (!date) {
    return defaultEntry
  }

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return dayMap.get(date.getDay()) ?? defaultEntry
}

export function getTime(date: Optional<string> | Date): string {
  if (!date) {
    return defaultEntry.short
  }

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return date.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true
  })
}