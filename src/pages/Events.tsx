import Hero from "../components/common/Hero";
import SearchFilterBar from "../components/SearchFilterBar";
import EventList from "../components/EventList";

export default function Events() {
  return (
    <main>
      <Hero title="Events" />
      <SearchFilterBar />
      <EventList />
    </main>
  )
}