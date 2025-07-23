export interface EventVenueInterface {
  name: Optional<string>
  address: Optional<string>
  cityState: Optional<string>
  zip: Optional<string>
  distance: Optional<number>
  units: Optional<string>
  latitude: Optional<string>
  longitude: Optional<string>
}

export class EventVenue implements EventVenueInterface {
  name: Optional<string>
  address: Optional<string>
  cityState: Optional<string>
  zip: Optional<string>
  distance: Optional<number>
  units: Optional<string>
  latitude: Optional<string>
  longitude: Optional<string>

  constructor(
    name?: string, address?: string, cityState?: string, zip?: string,
    distance?: number, units?: string, location?: { latitude?: string, longitude?: string }
  ) {
    this.name = name
    this.address = address
    this.cityState = cityState
    this.zip = zip
    this.distance = distance
    this.units = units
    this.latitude = location?.latitude
    this.longitude = location?.longitude
  }
}