import axios, { type AxiosResponse } from "axios"
import type EventDto from "../../types/EventDto.interface"

interface GetEventDetailsParams {
  apikey: string,
}

export default async function fetchEventDetails(eventId: Optional<string>): Promise<EventDto> {
  const params: GetEventDetailsParams = {
    apikey: import.meta.env.VITE_TM_API_KEY || ''
  }
  const { data }: AxiosResponse<EventDto> = await axios.get<EventDto>(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json`, { params })
  return data
}