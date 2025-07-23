import './index.css'
import "leaflet/dist/leaflet.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Events from './pages/Events.tsx'
import EventDetails from './pages/EventDetails.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
queryClient.clear()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />}></Route>
          <Route path="events">
            <Route index element={<Events />} />
            <Route path=":eventId" element={<EventDetails />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
)
