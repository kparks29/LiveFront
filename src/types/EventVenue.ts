export interface EventVenueInterface {
  name: Optional<string>
  address: Optional<string>
  cityState: Optional<string>
  zip: Optional<string>
}

export class EventVenue implements EventVenueInterface {
  name: Optional<string>
  address: Optional<string>
  cityState: Optional<string>
  zip: Optional<string>

  constructor(name?: string, address?: string, cityState?: string, zip?: string) {
    this.name = name
    this.address = address
    this.cityState = cityState
    this.zip = zip
  }
}