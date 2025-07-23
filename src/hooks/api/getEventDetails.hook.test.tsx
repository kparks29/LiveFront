import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import useGetEventDetails from "./getEventDetails.hook"
import { vi } from "vitest"
import { act } from "react"
import type EventDto from "../../types/EventDto.interface"

const mockEvent: EventDto = {
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
}

vi.mock('./fetchEventDetails', () => ({
  default: vi.fn()
}))
import fetchEventDetails from "./fetchEventDetails"
const mockedFetchEventDetails = vi.mocked(fetchEventDetails)

const mockQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      gcTime: 0
    }
  }
})


describe('useGetEventDetails', () => {
  let queryClient = mockQueryClient()

  beforeEach(() => {
    queryClient = mockQueryClient()
    mockedFetchEventDetails.mockReset()
  })

  const createRenderHook = (eventId: string) => {
  return renderHook(() => useGetEventDetails(eventId), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  })
}

  it('should be have loading state', async () => {
    await act(async () => {
      mockedFetchEventDetails.mockResolvedValueOnce(mockEvent)
    })

    const { result } = createRenderHook('123')

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should successfully call fetchEventDetails', async () => {
    await act(async () => {
      mockedFetchEventDetails.mockResolvedValueOnce(mockEvent)
    })

    const { result } = createRenderHook('123')

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockedFetchEventDetails).toHaveBeenCalledTimes(1)
    expect(mockedFetchEventDetails).toHaveBeenCalledWith('123')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.event).toEqual(expect.objectContaining({ id: mockEvent.id, name: mockEvent.name}))
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should return error when fetchEventDetails fails', async () => {
    const mockApiError = new Error('Error getting event details')

    await act(async () => {
      mockedFetchEventDetails.mockRejectedValueOnce(mockApiError)
    })

    const { result } = createRenderHook('123')

    await waitFor(async () => {
      expect(result.current.isError).toBe(true)
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 2000 })

    expect(mockedFetchEventDetails).toHaveBeenCalledTimes(1)
    expect(result.current.error).toEqual(mockApiError)
  })
})