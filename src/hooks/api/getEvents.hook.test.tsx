import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import useGetEvents from "./getEvents.hook"
import { vi } from "vitest"

const mockLocation = { latitude: 47.6061, longitude: -122.3328 }
const mockApiResponse: TicketMasterGetEventsApiResponse = {
  _embedded: {
    events: [
      {
        id: '123',
        name: 'Test Concert',
        type: 'event',
        locale: 'en-us',
        url: 'https://www.ticketmaster.com/event/123',
        images: [],
        dates: {
          start: { dateTime: '2025-07-23T00:00:00Z' }, status: { code: 'onsale' }
        },
        classifications: [{
          segment: {
            name: 'Music'
          },
          genre: {
            name: 'Alternative'
          }
        }],
        description: "",
        additionalInfo: "",
        info: "",
        _embedded: {
          venues: [
            {
              name: "",
              address: {
                line1: "",
                line2: ""
              },
              city: {
                name: ""
              },
              state: {
                stateCode: "",
                name: ""
              },
              postalCode: ""
            }
          ]
        }
      },
      {
        id: '234',
        name: 'Test Play',
        type: 'event',
        locale: 'en-us',
        url: 'https://www.ticketmaster.com/event/234',
        images: [],
        dates: {
          start: { dateTime: '2025-07-23T00:00:00Z' }, status: { code: 'onsale' }
        },
        classifications: [{
          segment: {
            name: 'Play'
          },
          genre: {
            name: 'Theater'
          }
        }],
        description: "",
        additionalInfo: "",
        info: "",
        _embedded: {
          venues: [
            {
              name: "",
              address: {
                line1: "",
                line2: ""
              },
              city: {
                name: ""
              },
              state: {
                stateCode: "",
                name: ""
              },
              postalCode: ""
            }
          ]
        }
      },
    ],
  },
  page: { number: 0, size: 25, totalElements: 2, totalPages: 1 },
}
const mockApiResponseEmpty = {
  _embedded: { events: [] },
  page: { number: 0, size: 25, totalElements: 0, totalPages: 0 },
}

const mockGeolocationReturn = {
  location: { latitude: undefined, longitude: undefined },
  isLoading: true,
  isError: false,
  error: undefined
}
vi.mock('../geoLocation.hook', () => ({
  default: vi.fn()
}))
import useGeolocation from "../geoLocation.hook"
const mockedUseGeolocation = vi.mocked(useGeolocation)

vi.mock('./fetchEvents', () => ({
  default: vi.fn()
}))
import fetchEvents from "./fetchEvents"
import { act } from "react"
import type { TicketMasterGetEventsApiResponse } from "../../types/TicketMasterApiResponse"
const mockedFetchEvents = vi.mocked(fetchEvents)

const mockQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      gcTime: 0
    }
  }
})


describe('useGetEvents', () => {
  let queryClient = mockQueryClient()

  beforeEach(() => {
    queryClient = mockQueryClient()
    mockedFetchEvents.mockReset()
    mockedUseGeolocation.mockReset()
    mockedUseGeolocation.mockReturnValue(mockGeolocationReturn)
  })

  const createRenderHook = (page: number) => {
  return renderHook(() => useGetEvents(page), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  })
}

  it('should be loading when useGeolocation is also loading', async () => {
    await act(async () => {
      mockedUseGeolocation.mockReturnValue({
        location: { latitude: undefined, longitude: undefined},
        isError: false,
        isLoading: true,
        error: undefined
      })
      mockedFetchEvents.mockResolvedValueOnce(mockApiResponse)
    })

    const { result } = createRenderHook(0)

    expect(result.current.isLoading).toBe(true)
    expect(result.current.events).toEqual([])
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should successfully call fetchEvents when geoLocation is available', async () => {
    await act(async () => {
      mockedUseGeolocation.mockReturnValue({
        location: mockLocation,
        isError: false,
        isLoading: false,
        error: undefined
      })
      mockedFetchEvents.mockResolvedValueOnce(mockApiResponse)
    })

    const { result } = createRenderHook(0)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockedFetchEvents).toHaveBeenCalledTimes(1)
    expect(mockedFetchEvents).toHaveBeenCalledWith(mockLocation, 0)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.events).toEqual([
      expect.objectContaining({ id: '123', name: 'Test Concert'}),
      expect.objectContaining({ id: '234', name: 'Test Play'})
    ])
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.currentPage).toBe(mockApiResponse.page.number)
    expect(result.current.totalPages).toBe(mockApiResponse.page.totalPages)
    expect(result.current.totalEvents).toBe(mockApiResponse.page.totalElements)
  })

  it('should successfully call fetchEvents when geoLocation has error', async () => {
    const mockGeoError = 'Unable to get location'

    await act(async () => {
      mockedUseGeolocation.mockReturnValue({
        location: { latitude: undefined, longitude: undefined },
        isLoading: false,
        isError: true,
        error: mockGeoError ,
      })
      mockedFetchEvents.mockResolvedValueOnce(mockApiResponse)
    })

    const { result } = createRenderHook(0)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockedFetchEvents).toHaveBeenCalledTimes(1)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.events).toEqual([
      expect.objectContaining({ id: '123', name: 'Test Concert'}),
      expect.objectContaining({ id: '234', name: 'Test Play'}),
    ])
  })

  it('should return error when fetchEvents fails', async () => {
    const mockApiError = new Error('Error getting events')

    await act(async () => {
      mockedUseGeolocation.mockReturnValue({
        location: mockLocation,
        isLoading: false,
        isError: false,
        error: undefined,
      })
      mockedFetchEvents.mockRejectedValueOnce(mockApiError)
    })

    const { result } = createRenderHook(0)

    await waitFor(async () => {
      expect(result.current.isError).toBe(true)
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 2000 })

    expect(mockedFetchEvents).toHaveBeenCalledTimes(1)
    expect(result.current.events).toEqual([])
    expect(result.current.error).toEqual(mockApiError)
  })

  it('should return empty array if fetchEvents returns no events', async () => {
    await act(async () => {
      mockedUseGeolocation.mockReturnValue({
        location: mockLocation,
        isLoading: false,
        isError: false,
        error: undefined,
      })
      mockedFetchEvents.mockResolvedValueOnce(mockApiResponseEmpty)
    })

    const { result } = createRenderHook(0)

    await waitFor(async () => {
      expect(result.current.isError).toBe(false)
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 2000 })

    expect(mockedFetchEvents).toHaveBeenCalledTimes(1)
    expect(result.current.events).toEqual([])
    expect(result.current.totalEvents).toBe(0)
    expect(result.current.error).toBeNull()

  })
})