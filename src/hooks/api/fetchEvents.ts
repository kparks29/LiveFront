import axios, { type AxiosResponse } from "axios"
import type GeoCoordinate from "../../types/GeoCoordinate.interface"
import type { TicketMasterGetEventsApiResponse } from "../../types/TicketMasterApiResponse"

const CONCERT_SEGMENT_KEY = "KZFzniwnSyZfZ7v7nJ"
const THEATER_SEGMENT_KEY = "KZFzniwnSyZfZ7v7na"

interface GetEventParams {
  apikey: string,
  geoPoint?: string,
  radius: number,
  unit: string,
  classificationId: string,
  page: number,
  size: number,
  sort: string
}

export default async function fetchEvents(location?: GeoCoordinate, page: number = 0): Promise<TicketMasterGetEventsApiResponse> {
  const params: GetEventParams = {
    apikey: import.meta.env.VITE_TM_API_KEY || '',
    radius: 50,
    unit: "miles",
    classificationId: `${CONCERT_SEGMENT_KEY},${THEATER_SEGMENT_KEY}`,
    page,
    size: 25,
    sort: 'date,asc'
  }
  if (location && location.latitude && location.longitude) {
    params.geoPoint = `${location.latitude},${location.longitude}`
  }

  const { data }: AxiosResponse<TicketMasterGetEventsApiResponse> = await axios.get<TicketMasterGetEventsApiResponse>("https://app.ticketmaster.com/discovery/v2/events.json", { params })
  return data
}