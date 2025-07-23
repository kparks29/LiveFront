import { useEffect, useState } from "react";
import type GeoCoordinate from "../types/GeoCoordinate.interface";

interface GeolocationReturn {
  location: GeoCoordinate,
  isLoading: boolean,
  isError: boolean,
  error: Optional<string>
}

export default function useGeolocation(): GeolocationReturn {
  const [location, setLocation] = useState<GeoCoordinate>({ latitude: undefined, longitude: undefined })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Optional<string>>()
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser")
      setIsLoading(false)
      return
    }

    const handleSuccess = (position: GeolocationPosition): void => {
      setLocation(position.coords)
      setIsLoading(false)
      setIsError(false)
    }

    const handleError = (error: GeolocationPositionError): void => {
      switch (error.code) {
        case GeolocationPositionError.TIMEOUT:
          setError("Request to get Location has timed out")
          break
        case GeolocationPositionError.PERMISSION_DENIED:
          setError("User Denied the request to get Location")
          break
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          setError("Location information is unavailable")
          break
        default:
          setError("An unknown error occurred getting location")
      }
      setIsError(true)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }, [])

  return { location, isLoading, isError, error }
}