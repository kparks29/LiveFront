import "@testing-library/jest-dom"

import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import Events from "./Events"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const mockQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const mockUseGetEvents = vi.fn(() => ({
  events: [],
  isError: false,
  isLoading: false,
  error: undefined,
  currentPage: 0,
  totalPages: 0,
  totalEvents: 0
}))

vi.mock('./src/hooks/api', async (importOriginal) => {
  const original = await importOriginal<typeof import("../hooks/api")>()
  return {
    ...original,
    useGetEvents: mockUseGetEvents
  }
})

test('Events component renders', () => {
  const queryClient = mockQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Events />
    </QueryClientProvider>
  )
  expect(screen.getByText('Events')).toBeInTheDocument()
})

test('Events show loading while api is being called', () => {

})