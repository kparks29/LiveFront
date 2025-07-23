import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import EventDetails from "./EventDetails"
import { vi } from "vitest"
import { Event } from "../types/Event"

const mockQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const mockEvent = {
  id: '123',
  name: 'Test Concert',
  dates: { start: '2025-07-23T00:00:00Z' },
  venue: { address: '123 test st', name: 'test venue'}
} as Event


vi.mock('../hooks/api', () => ({
  useGetEventDetails: vi.fn()
}))
import { useGetEventDetails } from "../hooks/api"
const mockedUseGetEventDetails = vi.mocked(useGetEventDetails)

vi.mock('../components/common/Map', () => ({
  Map: vi.fn().mockImplementation(() => <></>)
}))
import { Map } from '../components/common/Map'
const mockedMapComponent = vi.mocked(Map)

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>()

  return {
    ...original,
    useParams: vi.fn(),
    NavLink: vi.fn().mockImplementation(({ to, children }: { to: string, children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ))
  }
})

import { NavLink, useParams } from "react-router-dom"

const mockedUseParams = vi.mocked(useParams)
const mockedNavLink = vi.mocked(NavLink)


describe('<EventDetails />', () => {
  beforeEach(() => {
    mockedUseGetEventDetails.mockReset()
    mockedUseParams.mockReset()
    mockedNavLink.mockReset()
    mockedMapComponent.mockReset()
  })

  it('EventDetails component renders', () => {
    const queryClient = mockQueryClient()

    mockedUseGetEventDetails.mockReturnValue({
      event: mockEvent,
      isError: false,
      isLoading: false,
      error: null,
    })
    mockedUseParams.mockReturnValue({ eventId: '123' })

    render(
      <QueryClientProvider client={queryClient}>
        <EventDetails />
      </QueryClientProvider>
    )

    expect(mockedUseGetEventDetails).toHaveBeenCalled()
    expect(mockedUseGetEventDetails).toHaveBeenCalledWith('123')
  })
})