export default interface EventDto {
  id: string,
  name: string,
  type: string,
  description: string,
  additionalInfo: string,
  info: string
  locale: string,
  url: string,
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
  _embedded: {
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
      postalCode: string
    }[]
  }
}