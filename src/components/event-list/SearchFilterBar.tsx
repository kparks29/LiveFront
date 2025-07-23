import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import LocationFiler from "./LocationFilter";
import SearchBar from "./SearchBar";

export default function SearchFilterBar() {
  return (
    <section className="min-h-20 w-full shadow-2xl flex items-center justify-center gap-1">
      <div className="flex-5/6 md:flex-1/4">
        <SearchBar />
      </div>
      <div className="visible flex-1/6 md:hidden text-right pr-5 hover:cursor-pointer">
        <button className="border-1 border-gray-300 rounded-xl p-3 hover:shadow-sm transition-shadow duration-200">
          <MixerHorizontalIcon className="size-6" />
        </button>
      </div>
      <div className="hidden md:visible md:flex-3/4 md:flex justify-items-start">
        <LocationFiler />
      </div>
    </section>
  )
}