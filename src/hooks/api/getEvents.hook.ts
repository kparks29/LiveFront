
import { Event } from "../../types/Event"
import { useQuery } from "@tanstack/react-query"
import useGeolocation from "../geoLocation.hook"
import fetchEvents from "./fetchEvents"


interface GetEventsReturn {
  events: Event[],
  currentPage: number,
  totalPages: number,
  totalEvents: number
  isLoading: boolean,
  isError: boolean,
  error: Error | null
}

export default function useGetEvents(page: number): GetEventsReturn {
  const { location, isLoading: isLocationLoading, isError: isLocationError } = useGeolocation()

  const { data, isLoading: isQueryLoading, isError, error } = useQuery({
    queryKey: ['getEvents', page, location?.latitude, location?.longitude],
    queryFn: () => fetchEvents(isLocationLoading || isLocationError ? undefined : location, page),
  })

  const isLoading = isLocationLoading || isQueryLoading
  const events = data?._embedded?.events?.map(dto => Event.fromDto(dto)) || []
  const currentPage = data?.page.number ?? 0
  const totalPages = data?.page.totalPages ?? 0
  const totalEvents = data?.page.totalElements ?? 0

  return {
    events,
    currentPage,
    totalPages,
    totalEvents,
    isLoading,
    isError,
    error
  }
}