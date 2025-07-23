
import { Event } from "../../types/Event"
import { useQuery } from "@tanstack/react-query"
import useGeolocation from "../geoLocation.hook"
import fetchEvents from "./fetchEvents"
import { useEffect, useMemo, useState } from "react"


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
  const [events, setEvents] = useState<Event[]>([])
  const [storedPages, setStoredPages] = useState<Set<number>>(new Set<number>()) 

  const { data, isLoading: isQueryLoading, isError, error } = useQuery({
    queryKey: ['getEvents', page, location?.latitude, location?.longitude],
    queryFn: () => fetchEvents(isLocationLoading || isLocationError ? undefined : location, page),
  })

  const isLoading = useMemo(() => (isLocationLoading || isQueryLoading), [isLocationLoading, isQueryLoading])
  const currentPage = useMemo(() => (data?.page.number ?? 0), [data?.page.number])
  const totalPages = useMemo(() => (data?.page.totalPages ?? 0), [data?.page.totalPages])
  const totalEvents = useMemo(() => (data?.page.totalElements ?? 0), [data?.page.totalElements])
  

  useEffect(() => {
    const newPage = data?.page.number
    if (newPage !== undefined && !storedPages.has(newPage)) {
      const newEvents = (data?._embedded?.events?.map(dto => Event.fromDto(dto)) || [])
      
      setEvents(prev => [...prev, ...newEvents])
      setStoredPages(prev => prev.add(newPage))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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