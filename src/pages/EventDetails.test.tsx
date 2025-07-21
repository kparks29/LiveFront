import "@testing-library/jest-dom"

import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import EventDetails from "./EventDetails";

test('Events component renders', () => {
  render(<EventDetails />);
  expect(screen.getByText('Event Details')).toBeInTheDocument();
});