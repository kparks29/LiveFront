import { latLngBounds, type LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useMemo } from "react";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import useGeolocation from "../../hooks/geoLocation.hook";
import type { EventVenue } from "../../types/EventVenue";
import { MapPopup } from "./MapPopup";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


interface MapProps {
  venue: EventVenue
}

// centers on seattle by default
const DEFAULT_COORDINATES: { lat: number, lng: number } = {
  lat: 47.620564,
  lng: -122.350616
}
const DEFAULT_ZOOM: number = 13

function getValidCoord(coord: number | null | '' | undefined): number | null {
  if (typeof coord === 'number' && !isNaN(coord)) {
    return coord
  }
  return null
}

export function Map({ venue }: MapProps) {
  const { location } = useGeolocation()
  const initialPosition: LatLngExpression = [
    getValidCoord(location?.latitude) || DEFAULT_COORDINATES.lat,
    getValidCoord(location?.longitude) || DEFAULT_COORDINATES.lng
  ]

  // helper function to get coordinates
  function getPosition(venue: EventVenue): LatLngExpression | null {
    const lat: Optional<number> = venue?.latitude ? parseFloat(venue?.latitude) : undefined
    const lng: Optional<number> = venue?.longitude ? parseFloat(venue?.longitude) : undefined
    if (lat === undefined || lng === undefined) {
      return null
    }

    const position: LatLngExpression = [lat, lng]
    return position
  }
  
  const markerPosition = useMemo(() => getPosition(venue), [venue])

  const marker = useMemo(() => {
    const position = getPosition(venue)
    return position && (
      <Marker position={position} key={venue.name}>
        <Popup>
          <MapPopup venue={venue} />
        </Popup>
      </Marker>
    )
  }, [venue])

  return (
    <MapContainer 
      center={initialPosition}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
      {markerPosition && <FitBoundsToMarkers markerPositions={[markerPosition]} />}
    </MapContainer>
  )
}

interface FitBoundsToMarkers {
  markerPositions: LatLngExpression[]
}

// subcomponent that fits the bounds of the map to all the components
function FitBoundsToMarkers({ markerPositions }: FitBoundsToMarkers) {
  const map = useMap();

  useEffect(() => {
    if (markerPositions && markerPositions.length > 0) {
      const bounds = latLngBounds(markerPositions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, markerPositions]);

  return null;
}