import React from "react";
import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import LocationSearchForm from "../components/LocationSearchForm";



test("renders form with a label for latitude and longitude inputs", () => {
    render(<LocationSearchForm />);
    const latitude = screen.getByText("Latitude:");
    const longitude = screen.getByText("Longitude:");

    expect(latitude).toBeInTheDocument();
    expect(longitude).toBeInTheDocument();
})

test("renders NearMeButton component", () => {
    render(<LocationSearchForm />);
    const nearMeButton = screen.getByText("Near me");
    expect(nearMeButton).toBeInTheDocument();
});

test("renders search button", () => {
    render(<LocationSearchForm />);
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
});

test("displays error latitude and longitude are not provided", () => {
    render(<LocationSearchForm />);
    const searchButton = screen.getByText(/Search/);
    fireEvent.click(searchButton);
    expect(screen.getByText("Invalid Coordinates: Please enter a valid latitude and longitude.")).toBeInTheDocument();
    expect(screen.queryByText("Location Name")).not.toBeInTheDocument();
});
test("displays error when invalid coordinates are entered", () => {
    render(<LocationSearchForm />);
    const latitude = screen.getByLabelText("Latitude:");
    const searchButton = screen.getByText("Search");
    fireEvent.change(latitude, { target: { value: "-200" } });
    fireEvent.click(searchButton);
    expect(screen.getByText("Invalid Coordinates: Please enter a valid latitude and longitude.")).toBeInTheDocument();
    expect(screen.queryByText("Location Name")).not.toBeInTheDocument();
});

test("displays SearchResults component when user inputs valid coordinates and there are nearby locations", async () => {
    render(<LocationSearchForm />);
    const latitudeInput = screen.getByLabelText(/Latitude/);
    const longitudeInput = screen.getByLabelText(/Longitude/);
    const searchButton = screen.getByText(/Search/);
    fireEvent.change(latitudeInput, { target: { value: '40.7031743' } });
    fireEvent.change(longitudeInput, { target: { value: '1' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
        expect(screen.getByText(/Location Name/)).toBeInTheDocument();
    })
    expect(screen.getByText(/16 Carrer del Vendrell Salou/)).toBeInTheDocument();
    expect(screen.getByText(/CT/)).toBeInTheDocument();
    expect(screen.getByText(/43840/)).toBeInTheDocument();
    expect(screen.getByText(/Machine Names/)).toBeInTheDocument();
    expect(screen.queryByText("No locations within 50 miles")).not.toBeInTheDocument();

});

test("Search button makes appropriate API call", () => {
    render(<LocationSearchForm />);
    const fakeFetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({})
    });
    window.fetch = fakeFetch;
    const latitudeInput = screen.getByLabelText(/Latitude/);
    const longitudeInput = screen.getByLabelText(/Longitude/);
    const distanceInput = screen.getByLabelText(/Maximum/)
    const searchButton = screen.getByText(/Search/);


    fireEvent.change(latitudeInput, { target: { value: 40.7031743 } })
    fireEvent.change(longitudeInput, { target: { value: 1 } })
    fireEvent.change(distanceInput, { target: { value: 10 } })
    fireEvent.click(searchButton);

    expect(fakeFetch).toHaveBeenCalledWith("http://localhost:8080/api/locations?lat=40.7031743&lon=1&send_all_within_distance=true&max_distance=10",
        {
            "headers": {
                "Content-type": "application/json"
            },
            "method": "GET"
        });
})

