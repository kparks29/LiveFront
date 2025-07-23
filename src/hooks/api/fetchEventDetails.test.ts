import axios from "axios";
import { vi } from "vitest";
import fetchEventDetails from "./fetchEventDetails";


vi.mock("axios", () => ({
  default: {
    get: vi.fn()
  }
}))

const mockedAxiosGet = vi.mocked(axios.get);

describe('fetchEventDetails', () => {
  beforeEach(() => {
    mockedAxiosGet.mockReset()
    process.env.VITE_TM_API_KEY = 'test_key'
  })

  it('should fetch successfully', async () => {
    const mockResponse = { id: 'event2', name: 'Test Play' }

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEventDetails('123')

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://app.ticketmaster.com/discovery/v2/events/123.json",
      {
        params: {
          apikey: "test_key"
        }
      }
    )
  })

  it('should use empty string in there is no api key provided', async () => {
    delete process.env.VITE_TM_API_KEY;
    const mockResponse = {}

    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })

    await fetchEventDetails('213')

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
    const mockError = new Error('call failed')

    mockedAxiosGet.mockRejectedValueOnce(mockError)

    await expect(fetchEventDetails('123')).rejects.toThrow('call failed')

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
  })
})