import { EventDates, type EventDatesInterface } from "./EventDates"
import { EventVenue, type EventVenueInterface } from "./EventVenue"
import type EventDto from "./EventDto.interface"

export interface EventInterface {
  id: Optional<string>
  name: Optional<string>
  genre: Optional<string>
  description: Optional<string>
  dates: EventDatesInterface
  venue: EventVenueInterface
  image: Optional<string>
}

export class Event implements EventInterface {
  id: Optional<string>
  name: Optional<string>
  genre: Optional<string>
  description: Optional<string>
  dates: EventDates
  venue: EventVenue
  image: Optional<string>
  url: Optional<string>
  notes: Optional<string>
  homepage: Optional<string>

  constructor() {
    this.dates = new EventDates()
    this.venue = new EventVenue()
  }

  static fromDto(dto: EventDto): Event {
    const newEvent = new Event()

    if (!dto) {
      return newEvent
    }

    newEvent.id = dto.id
    newEvent.name = dto.name
    newEvent.genre = dto.classifications[0]?.genre?.name
    newEvent.description = dto.description || dto.info
    newEvent.url = dto.url
    newEvent.notes = dto.pleaseNote
    newEvent.dates = new EventDates(
      dto.dates?.start?.dateTime,
    )

    const venue = dto?._embedded?.venues[0]

    newEvent.venue = new EventVenue(
      venue?.name,
      `${venue?.address?.line1 || ''} ${venue?.address?.line2 || ''}`,
      `${venue?.city?.name || ''} ${venue?.state?.stateCode || ''}`,
      venue?.postalCode,
      venue?.distance,
      venue?.units,
      venue?.location
    )

    newEvent.image = dto.images?.find(image => image.ratio === '16_9' && image.height > 500)?.url

    if (dto?._embedded?.attractions && dto?._embedded?.attractions.length > 0) {
      const attraction = dto?._embedded?.attractions[0]
      if (attraction.externalLinks?.homepage && attraction.externalLinks?.homepage.length > 0) {
        newEvent.homepage = attraction?.externalLinks?.homepage[0]?.url
      }
    }

    return newEvent
  }
}