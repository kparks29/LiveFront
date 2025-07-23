export interface EventDatesInterface {
  start: Optional<string>
  end: Optional<string>
  timezone: Optional<string>
  startTime: Optional<string>
  endTime: Optional<string>
}

export class EventDates implements EventDatesInterface {
  start: Optional<string>
  end: Optional<string>
  timezone: Optional<string>
  startTime: Optional<string>
  endTime: Optional<string>

  constructor(start?: string, end?: string, timezone?: string, startTime?: string, endTime?: string) {
    this.start = start
    this.end = end
    this.timezone = timezone
    this.startTime = startTime
    this.endTime = endTime
  }
}