import type EventDto from "./EventDto.interface"

interface TicketMasterPagination {
  size: number,
  number: number,
  totalElements: number,
  totalPages: number
}

interface EventList {
  events: EventDto[]
}

export interface TicketMasterGetEventsApiResponse {
  _embedded?: EventList,
  page: TicketMasterPagination
}

