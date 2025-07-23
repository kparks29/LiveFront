import type { EventVenueInterface } from "../../types/EventVenue"

interface MapPopupProps {
  venue: EventVenueInterface
}

export function MapPopup({ venue }: MapPopupProps) {
  return (
    <div className="p-3 bg-white rounded-lg max-w-xs flex flex-col gap-1">
      <div className="font-bold text-lg text-gray-900 leading-tight">
        {venue.name}
      </div>

      <div className="text-sm text-gray-600">
        {venue.address}
      </div>

      <div className="text-xs text-gray-500 mt-1">
        {(venue.distance || '')} {(venue.units || '').toLowerCase()}
      </div>
    </div>
  )
}