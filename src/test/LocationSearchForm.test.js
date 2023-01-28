import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import LocationSearchForm from "../components/LocationSearchForm";


test("renders form with a label for latitude and longitude inputs", () => {
    render(<LocationSearchForm />);
    const latitude = screen.getByText(/Latitude/i);
    const longitude = screen.getByText(/Longitude/i);

    expect(latitude).toBeInTheDocument();
    expect(longitude).toBeInTheDocument();
})

test("renders NearMeButton component", () => {
    render(<LocationSearchForm />);
    const nearMeButton = screen.getByText(/Near Me/i);

    expect(nearMeButton).toBeInTheDocument();
});

test("renders search button", () => {
    render(<LocationSearchForm />);
    const searchButton = screen.getByText(/Search/);
    expect(searchButton).toBeInTheDocument();
});

test("displays error when invalid coordinates are entered", () => {
    render(<LocationSearchForm />);
    const searchButton = screen.getByText(/Search/);
    fireEvent.click(searchButton);
    expect(screen.getByText("Invalid Coordinates: Please enter a valid latitude and longitude.")).toBeInTheDocument();
});

