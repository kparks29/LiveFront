import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import Events from './pages/Events.tsx'
import EventDetails from './pages/EventDetails.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />}></Route>
        <Route path="events">
          <Route index element={<Events />} />
          <Route path=":eventId" element={<EventDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
