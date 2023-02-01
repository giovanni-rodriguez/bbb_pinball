import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LocationSearch from "../components/LocationSearch";



describe("LocationSearch component", () => {
    test("renders form with a label for latitude and longitude inputs", () => {
        render(<LocationSearch />);
        const latitude = screen.getByText("Latitude:");
        const longitude = screen.getByText("Longitude:");

        expect(latitude).toBeInTheDocument();
        expect(longitude).toBeInTheDocument();
    })

    test("renders NearMeButton component", () => {
        render(<LocationSearch />);
        const nearMeButton = screen.getByText("Near me");
        expect(nearMeButton).toBeInTheDocument();
    });

    test("renders search button", () => {
        render(<LocationSearch />);
        const searchButton = screen.getByText("Search");
        expect(searchButton).toBeInTheDocument();
    });

    test("it should display an error latitude and longitude are not provided", () => {
        render(<LocationSearch />);
        const searchButton = screen.getByText(/Search/);
        fireEvent.click(searchButton);
        expect(screen.getByText("Invalid Coordinates: Please enter a valid latitude and longitude.")).toBeInTheDocument();
        expect(screen.queryByText("Location Name")).not.toBeInTheDocument();
    });
    test("it should display an error when invalid coordinates are entered", () => {
        render(<LocationSearch />);
        const latitude = screen.getByLabelText("Latitude:");
        const searchButton = screen.getByText("Search");
        fireEvent.change(latitude, { target: { value: "-200" } });
        fireEvent.click(searchButton);
        expect(screen.getByText("Invalid Coordinates: Please enter a valid latitude and longitude.")).toBeInTheDocument();
        expect(screen.queryByText("Location Name")).not.toBeInTheDocument();
    });

    // server must be running for the test below

    // test("it should display the SearchResults component when user inputs valid coordinates and there are nearby locations", async () => {
    //     render(<LocationSearch />);
    //     const latitudeInput = screen.getByLabelText(/Latitude/);
    //     const longitudeInput = screen.getByLabelText(/Longitude/);
    //     const searchButton = screen.getByText(/Search/);
    //     fireEvent.change(latitudeInput, { target: { value: '40.7031743' } });
    //     fireEvent.change(longitudeInput, { target: { value: '1' } });
    //     fireEvent.click(searchButton);
    //     await waitFor(() => {
    //         expect(screen.getByText(/Location Name/)).toBeInTheDocument();
    //     })
    //     expect(screen.getByText(/16 Carrer del Vendrell Salou/)).toBeInTheDocument();
    //     expect(screen.getByText(/CT/)).toBeInTheDocument();
    //     expect(screen.getByText(/43840/)).toBeInTheDocument();
    //     expect(screen.getByText(/Machine Names/)).toBeInTheDocument();
    //     expect(screen.queryByText("No locations within 50 miles")).not.toBeInTheDocument();

    // });

    test("it should display an error when invalid max distance is entered", () => {
        render(<LocationSearch />);
        const latitudeInput = screen.getByLabelText("Latitude:");
        const longitudeInput = screen.getByLabelText("Longitude:");
        const maxDistanceInput = screen.getByLabelText("Maximum Distance(miles):")
        const searchButton = screen.getByText("Search");

        fireEvent.change(latitudeInput, { target: { value: '40.7031743' } });
        fireEvent.change(longitudeInput, { target: { value: '1' } });
        fireEvent.change(maxDistanceInput, { target: { value: "1001" } });

        fireEvent.click(searchButton);
        expect(screen.getByText("Please enter maximum distance between 1 and 1000")).toBeInTheDocument();
    });

    test("Search button makes appropriate API call", () => {
        render(<LocationSearch />);
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
})