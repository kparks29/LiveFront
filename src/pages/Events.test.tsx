import "@testing-library/jest-dom"

import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Events from "./Events";

test('Events component renders', () => {
  render(<Events />);
  expect(screen.getByText('Events')).toBeInTheDocument();
});