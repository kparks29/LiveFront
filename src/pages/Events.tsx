import Hero from "../components/common/Hero";
import SearchFilterBar from "../components/event-list/SearchFilterBar";
import EventList from "../components/event-list/EventList";

export default function Events() {
  return (
    <main>
      <Hero title="Events" />
      <SearchFilterBar />
      <EventList />
    </main>
  )
}