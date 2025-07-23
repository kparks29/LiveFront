export default interface EventDto {
  id: string,
  name: string,
  type: string,
  description: string,
  additionalInfo: string,
  info: string
  locale: string,
  url: string,
  pleaseNote: string
  images: {
    url: string,
    ratio: string,
    height: number,
    width: number
  }[],
  dates: {
    start: {
      dateTime: string
    },
    status: {
      code: 'onsale' | 'offsale' | 'canceled' | 'postponed' | 'rescheduled'
    }
  },
  classifications: {
    segment: {
      name: string,
    },
    genre: {
      name: string
    }
  }[],
  _embedded?: {
    attractions?: {
      externalLinks?: {
        homepage?: {
          url: string
        }[]
      }
    }[],
    venues: {
      name: string,
      address: {
        line1: string,
        line2: string
      },
      city: {
        name: string
      },
      state: {
        stateCode: string,
        name: string
      },
      postalCode: string,
      distance: number,
      units: string,
      location: {
        latitude: string,
        longitude: string
      }
    }[],
  }
}