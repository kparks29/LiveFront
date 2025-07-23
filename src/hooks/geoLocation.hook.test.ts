import { act, renderHook } from "@testing-library/react"
import useGeolocation from "./geoLocation.hook"
import { vi } from "vitest";

const mockGeolocation = {
  getCurrentPosition: vi.fn()
}

beforeEach(() => {
  mockGeolocation.getCurrentPosition.mockReset();

  Object.defineProperty(global, 'navigator', {
    value: {
      geolocation: mockGeolocation
    },
    writable: true
  })

  Object.defineProperty(global, 'GeolocationPositionError', {
    value: {
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    },
    writable: true,
    configurable: true
  })
})

describe('useGeolocation', () => {
  it('should return an initial loading state', () => {
    const { result } = renderHook(() => useGeolocation())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })

  it('should return location on successful geolocation retrieval', async () => {
    const mockPosition = {
      coords: {
        latitude: 47.6061,
        longitude: -122.3328
      }
    }

    mockGeolocation.getCurrentPosition.mockImplementationOnce((onSuccess) => {
      onSuccess(mockPosition)
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})


    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.location).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude
    })
  })

  it('should return error if geolocation is not supported', async () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBe('Geolocation not supported by this browser')
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })

  it('should return error if user denied permission', async () => {
    const mockError = {
      code: GeolocationPositionError.PERMISSION_DENIED,
      message: 'User Denied Geolocation Permission'
    }
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_onSuccess, onError) => {
      onError(mockError)
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe('User Denied the request to get Location')
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })

  it('should return error if timed out', async () => {
    const mockError = {
      code: GeolocationPositionError.TIMEOUT,
      message: 'Geolocation timed out'
    }
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_onSuccess, onError) => {
      onError(mockError)
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe('Request to get Location has timed out')
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })

  it('should return error if position is unavailable', async () => {
    const mockError = {
      code: GeolocationPositionError.POSITION_UNAVAILABLE,
      message: 'No Position available'
    }
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_onSuccess, onError) => {
      onError(mockError)
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe('Location information is unavailable')
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })

  it('should return error on unknown geolocation error', async () => {
    const mockError = {
      code: 22,
      message: 'unknown'
    }
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_onSuccess, onError) => {
      onError(mockError)
    })

    const { result } = renderHook(() => useGeolocation())

    await act(async () => {})

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe('An unknown error occurred getting location')
    expect(result.current.location).toEqual({ latitude: undefined, longitude: undefined })
  })
})