
import { Event } from "../../types/Event"
import { useQuery } from "@tanstack/react-query"
import type EventDto from "../../types/EventDto.interface"
import fetchEventDetails from "./fetchEventDetails"


interface GetEventsReturn {
  event: Event,
  isLoading: boolean,
  isError: boolean,
  error: Error | null
}

export default function useGetEventDetails(eventId: Optional<string>): GetEventsReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getEventDetails', eventId],
    queryFn: () => fetchEventDetails(eventId),
  })

  const event = Event.fromDto(data as EventDto)

  return {
    event,
    isLoading,
    isError,
    error
  }
}