import { NavLink, useParams } from "react-router-dom";
import Hero from "../components/common/Hero";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useGetEventDetails } from "../hooks/api";


export default function EventDetails() {
  const { eventId } = useParams()
  const { event } = useGetEventDetails(eventId)

  return (
    <main>
      <div className="relative h-full">
        <Hero imageUrl={event.image} title={event.name} subtitle={event.genre} />
        <div className="absolute text-white left-5 top-5">
          <NavLink to="/events" aria-label="Back to Event List">
            <ChevronLeftIcon className="h-10 w-10"></ChevronLeftIcon>
          </NavLink>
        </div>
      </div>
    </main>
  )
}