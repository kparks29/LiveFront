import { useGetEvents } from "../../hooks/api"
import EventItem from "./EventItem"
import { useMemo, useState, type MouseEvent } from "react"
import { ChevronDownIcon } from "@radix-ui/react-icons"

export default function EventList() {
  const [page, setPage] = useState<number>(0)
  const { events, isLoading, isError, error, currentPage, totalEvents, totalPages } = useGetEvents(page)
  const progressPercentage = useMemo<number>(() => {
    if (totalEvents === 0) {
      return 0
    }

    return Math.ceil((events.length / totalEvents))
  }, [events.length, totalEvents])

  const handleLoadMore = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setPage(currentPage + 1)
  }

  if (isLoading) {
    return (
      <div>
        Loading Events...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        {error?.message || 'Unable to load Events'}
      </div>
    )
  }

  return (
    <div className="p-8">
      <ul className="flex flex-col justify-between gap-x-6 mb-8 gap-4">
      {events.map(event => <EventItem key={event.id} event={event} />)}
      </ul>
      <div className="flex flex-col gap-2 flex-wrap w-full items-center justify-center">
        <div className=" rounded-2xl bg-gray-300 p-4 w-64 text-center">
          <p>Loaded {events.length} out of {totalEvents}</p>
          <div className="h-1 bg-gray-400 w-[90%] left-[5%] relative overflow-hidden">
            <div
              className={`absolute left-0 h-full bg-gray-700`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        {currentPage < totalPages && <button onClick={handleLoadMore} className="flex items-center justify-center gap-2 border-1 border-gray-800 rounded-3xl p-4">Load More <ChevronDownIcon className="size-6" /></button>}
      </div>
    </div>
  )
}