import Hero from "../components/common/Hero";
import SearchFilterBar from "../components/event-list/SearchFilterBar";
import EventList from "../components/event-list/EventList";

export default function Events() {
  return (
    <main>
      <div className="h-1/2 md:h-[50vh]">
        <Hero title="Concerts and Theater Events" />
      </div>
      <SearchFilterBar />
      <EventList />
    </main>
  )
}