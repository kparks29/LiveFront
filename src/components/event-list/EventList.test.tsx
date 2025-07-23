import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import EventList from "./EventList"
import type { Event } from "../../types/Event"

vi.mock('../../hooks/api', () => ({
  useGetEvents: vi.fn()
}))
import { useGetEvents } from "../../hooks/api"
const mockedUseGetEvents = vi.mocked(useGetEvents)

vi.mock('./EventItem', () => {
  return {
    default: ({ event }: { event: { id: string, name: string }}) => (
      <li data-testid="event-test">{event.name}</li>
    )
  }
})

describe('<EventList />', () => {
  beforeEach(() => {
    mockedUseGetEvents.mockReset()
  })

  it('should render a loading state', () => {
    mockedUseGetEvents.mockReturnValue({
      events: [],
      isLoading: true,
      isError: false,
      error: null,
      currentPage: 0,
      totalEvents: 0,
      totalPages: 0
    })

    render(<EventList />);

    expect(screen.getByText('Loading Events...')).toBeInTheDocument()
  })

  it('should render error state', () => {
    mockedUseGetEvents.mockReturnValue({
      events: [],
      isLoading: false,
      isError: true,
      error: new Error('Test Error'),
      currentPage: 0,
      totalEvents: 0,
      totalPages: 0
    })

    render(<EventList />);

    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })

  it('should render item progress information', () => {
    const mockedEvents = [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
      { id: '3', name: 'Event 3' }
    ] as Event[]
    mockedUseGetEvents.mockReturnValue({
      events: mockedEvents,
      isLoading: false,
      isError: false,
      error: null,
      currentPage: 0,
      totalEvents: 100,
      totalPages: 4
    })

    render(<EventList />);

    expect(screen.getByText('Loaded 3 out of 100')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Load More/i })).toBeInTheDocument()
  })

  it('should render events when successful', () => {
    const mockedEvents = [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
      { id: '3', name: 'Event 3' }
    ] as Event[]
    mockedUseGetEvents.mockReturnValue({
      events: mockedEvents,
      isLoading: false,
      isError: false,
      error: null,
      currentPage: 0,
      totalEvents: 3,
      totalPages: 0
    })

    render(<EventList />);

    expect(screen.getAllByTestId('event-test')).toHaveLength(mockedEvents.length);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
    expect(screen.getByText('Loaded 3 out of 3')).toBeInTheDocument()
    expect(screen.queryByText('Load More')).toBeNull()
  })

  it('should handle empty array for events', () => {
    mockedUseGetEvents.mockReturnValue({
      events: [],
      isLoading: false,
      isError: false,
      error: null,
      currentPage: 0,
      totalEvents: 0,
      totalPages: 0
    })

    render(<EventList />);

    expect(screen.queryAllByTestId('event-test')).toHaveLength(0)
    expect(screen.getByText('Loaded 0 out of 0')).toBeInTheDocument()
    expect(screen.queryByText('Load More')).toBeNull()
  })
})