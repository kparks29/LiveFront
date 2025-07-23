interface ShortLongEntry {
  short: string
  long: string
}

const defaultEntry: ShortLongEntry = { short: 'TBD', long: 'TBD' }


const monthMap = new Map<number, ShortLongEntry>([
  [0, { short: 'Jan', long: 'January' }],
  [1, { short: 'Feb', long: 'February' }],
  [2, { short: 'Mar', long: 'March' }],
  [3, { short: 'Apr', long: 'April' }],
  [4, { short: 'May', long: 'May' }],
  [5, { short: 'Jun', long: 'June' }],
  [6, { short: 'Jul', long: 'July' }],
  [7, { short: 'Aug', long: 'Auguest' }],
  [8, { short: 'Sept', long: 'September' }],
  [9, { short: 'Oct', long: 'October' }],
  [10, { short: 'Nov', long: 'November' }],
  [11, { short: 'Dec', long: 'December' }]
])

const dayMap = new Map<number, ShortLongEntry>([
  [0, { short: 'Sun', long: 'Sunday' }],
  [1, { short: 'Mon', long: 'Monday' }],
  [2, { short: 'Tue', long: 'Tuesday' }],
  [3, { short: 'Wed', long: 'Wednesday' }],
  [4, { short: 'Thu', long: 'Thursday' }],
  [5, { short: 'Fri', long: 'Friday' }],
  [6, { short: 'Sat', long: 'Saturday' }]
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