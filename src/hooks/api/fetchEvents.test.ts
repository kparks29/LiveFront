import axios from "axios";
import { vi } from "vitest";
import fetchEvents from "./fetchEvents";


vi.mock("axios", () => ({
  default: {
    get: vi.fn()
  }
}))

const mockedAxiosGet = vi.mocked(axios.get);

describe('fetchEvents', () => {
  beforeEach(() => {
    mockedAxiosGet.mockReset()
    process.env.VITE_TM_API_KEY = 'test_key'
  })

  it('should fetch successfully with location', async () => {
    const mockLocation = {
      latitude: 47.6061,
      longitude: -122.3328
    };
    const mockPage = 1;
    const mockResponse = {
      _embedded: { events: [
        { id: 'event1', name: 'Test Concert' },
        { id: 'event2', name: 'Test Play' },
      ]},
      page: { number: 2, size: 25, totalElements: 2, totalPages: 1 },
    }

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEvents(mockLocation, mockPage)

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: "test_key",
          radius: 50,
          unit: "miles",
          classificationId: "KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7na",
          page: mockPage,
          size: 25,
          sort: 'date,asc',
          geoPoint: `${mockLocation.latitude},${mockLocation.longitude}`
        }
      }
    )
  })

  it('should fetch successfully without location', async () => {
    const mockPage = 1;
    const mockResponse = {
      _embedded: { events: [
        { id: 'event1', name: 'Test Concert' },
        { id: 'event2', name: 'Test Play' },
      ]},
      page: { number: 2, size: 25, totalElements: 2, totalPages: 1 },
    }

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEvents(undefined, mockPage)

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: "test_key",
          radius: 50,
          unit: "miles",
          classificationId: "KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7na",
          page: mockPage,
          size: 25,
          sort: 'date,asc',
        }
      }
    )
  })

  it('should default to page 0 if param not provided', async () => {
    const mockLocation = {
      latitude: 47.6061,
      longitude: -122.3328
    };
    const mockResponse = {
      _embedded: { events: [] },
      page: { number: 0, size: 25, totalElements: 0, totalPages: 0 },
    }

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEvents(mockLocation)

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          page: 0
        })
      })
    )
  })

  it('should use empty string in there is no api key provided', async () => {
    delete process.env.VITE_TM_API_KEY;

    const mockLocation = {
      latitude: 47.6061,
      longitude: -122.3328
    };
    const mockPage = 1;
    const mockResponse = {
      _embedded: { events: [] },
      page: { number: 0, size: 25, totalElements: 0, totalPages: 0 },
    }

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEvents(mockLocation, mockPage)

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          apikey: ''
        })
      })
    )
  })

  it('should throw error is call fails', async () => {
    const mockLocation = {
      latitude: 47.6061,
      longitude: -122.3328
    };
    const mockPage = 1;
    const mockError = new Error('call failed')

    mockedAxiosGet.mockRejectedValueOnce(mockError)

    await expect(fetchEvents(mockLocation, mockPage)).rejects.toThrow('call failed')

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
  })
})