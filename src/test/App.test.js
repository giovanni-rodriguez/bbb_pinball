import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";


test("renders without crashing", () => {
  render(<App />);
  const linkElement = screen.getByText("Pinball Finder");
  expect(linkElement).toBeInTheDocument();
});

test("renders LocationSearchForm Component on initial load", () => {
  render(<App />);
  const latitudeLabel = screen.getByText("Latitude:");
  const longitudeLabel = screen.getByText("Longitude:");
  expect(latitudeLabel).toBeInTheDocument();
  expect(longitudeLabel).toBeInTheDocument();
});
