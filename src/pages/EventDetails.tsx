import { NavLink, useParams } from "react-router-dom";
import Hero from "../components/common/Hero";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useGetEventDetails } from "../hooks/api";
import { Map } from "../components/common/Map";
import { useMemo } from "react";
import { getDate, getDayOfTheWeek, getMonth, getTime } from "../utils/dateUtil";


export default function EventDetails() {
  const { eventId } = useParams()
  const { event } = useGetEventDetails(eventId)

  const eventMonth = useMemo(() => getMonth(event.dates.start), [event.dates.start])
  const eventDate = useMemo(() => getDate(event.dates.start), [event.dates.start])
  const eventDay = useMemo(() => getDayOfTheWeek(event.dates.start), [event.dates.start])
  const eventTime = useMemo(() => getTime(event.dates.start), [event.dates.start])
  
  const SpecialNotes = useMemo(() => {
    if (!event.notes) {
      return null
    }

    return (
      <p>
        <strong>Special Notes:</strong> {event.notes}
      </p>
    )
  }, [event.notes])

  const HomePageLink = useMemo(() => {
    if (!event.homepage) {
      return null
    }

    return (
      <p>
        <strong>Artist's Website:</strong>
        <a href={event.homepage} target="_blank" className="text-blue-500 underline pl-2">Visit</a>
      </p>
    )
  }, [event.homepage])

  const BuyTicketButton = useMemo(() => {
    if (!event.url) {
      return null
    }

    return (
      <div className="flex justify-center">
        <a href={event.url} target="_blank"
          className="border-1 border-green-50 bg-green-400 text-white rounded-lg hover:bg-green-300 \
          hover:shadow-xs w-40 text-center p-2 mt-2"
        >Get Tickets</a>
      </div>
    )
  }, [event.url])

  return (
    <main>
      <div className="relative h-full flex flex-col">
        <div className="w-full h-1/2 md:h-[50vh]">
        <Hero imageUrl={event.image} title={event.name} subtitle={event.genre} />
        <div className="absolute text-white left-5 top-5">
          <NavLink to="/events" aria-label="Back to Event List">
            <ChevronLeftIcon className="h-10 w-10"></ChevronLeftIcon>
          </NavLink>
        </div>
        </div>
        <div className="md:flex w-full h-1/2 md:h-96 lg:h-[50vh]">
          <div className="flex-1 h-full p-4">
            <Map venue={event.venue} />
          </div>
          <div className="flex-1 h-full p-4 flex flex-col gap-2">
            <p><strong>Event Date:</strong> {eventDay.short} {eventMonth.long} {eventDate} {eventTime ?  <span className="font-light">{`@ ${eventTime}`}</span> : null}</p>
            <p><strong>Venue Location:</strong> {event.venue.address} {event.venue.name ? <span className="font-light">{`@ ${event.venue.name}`}</span> : null}</p>
            {SpecialNotes}
            {HomePageLink}
            {BuyTicketButton}
          </div>
        </div>
      </div>
    </main>
  )
}