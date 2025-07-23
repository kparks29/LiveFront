import { NavLink } from "react-router-dom"
import type { Event } from "../../types/Event"
import { getDate, getDayOfTheWeek, getMonth, getTime } from "../../utils/dateUtil"
import { useMemo } from "react"
import { ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons"

interface EventItemProps {
  event: Event
}

export default function EventItem({ event }: EventItemProps) {
  const eventMonth = useMemo(() => getMonth(event.dates.start), [event.dates.start])
  const eventDate = useMemo(() => getDate(event.dates.start), [event.dates.start])
  const eventDay = useMemo(() => getDayOfTheWeek(event.dates.start), [event.dates.start])
  const eventTime = useMemo(() => getTime(event.dates.start), [event.dates.start])

  return (
    <li className="h-48 md:h-24 p-3 shadow-md cursor-pointer transition-shadow hover:shadow-lg">
      <NavLink to={`/events/${event.id}`}>
        <div className="h-full flex flex-row gap-3 items-center">
          <div className="w-20 text-center">
            <p className="text-lg" aria-label={`Event Month ${eventMonth.long}`}>{eventMonth.short}</p>
            <p className="text-2xl font-semibold">{eventDate}</p>
          </div>
          <div className="flex-1">
            <p className="flex flex-row items-center text-gray-600 font-extralight">
              {eventDay.short}
              <DotFilledIcon className="mx-1 text-gray-600 font-extralight" />
              {eventTime}
            </p>
            <p className="text-sm"><strong>{event.name}</strong></p>
            <p className="flex flex-row items-center text-gray-600 font-extralight">
              {event.venue.cityState}
              <DotFilledIcon className="mx-1 text-gray-600 font-extralight hidden md:block" />
              <span className="hidden md:block">{event.venue.name}</span>
            </p>
            <p className="block md:hidden">{event.venue.name}</p>
          </div>
          <div className="w-10 md:w-30">
            {event.url !== undefined ? 
              <a 
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-20 w-full flex items-center justify-end hover:text-blue-500 hover:cursor-pointer"
                aria-label={`Get Tickets Link for ${event.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="hidden md:block">Get Tickets</span>
                <ChevronRightIcon className="mx-2" />
              </a>
            : null}
          </div>
        </div>
      </NavLink>
    </li>
  )
}