import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LocationSearchForm from "../components/LocationSearchForm";
import NearMeButton from "../components/NearMeButton";


test("renders near me button", () => {
    const handleLatitudeChange = jest.fn();
    const handleLongitudeChange = jest.fn();
    const handleGeoLocationError = jest.fn();

    render(<NearMeButton handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} handleGeoLocationError={handleGeoLocationError} />);
    const button = screen.getByText("Near me")
    expect(button).toBeInTheDocument();
})

test("NearMeButton updates latitude and longitude inputs with users current location", async () => {
    navigator.geolocation = {
        getCurrentPosition: jest.fn().mockImplementation((success) => {
            success({ coords: { latitude: 40.7035827, longitude: 1 } });
        })
    }
    render(<LocationSearchForm />);
    const latitudeInput = screen.getByPlaceholderText("Enter latitude");
    const longitudeInput = screen.getByPlaceholderText("Enter longitude");

    const button = screen.getByText("Near me")
    fireEvent.click(button);
    await waitFor(() => {
        expect(latitudeInput.value).toBe(String(40.7035827));
    })
    expect(longitudeInput.value).toBe(String(1));
})

test("calls the handleGeoLocationError function when there is an error getting the current location", () => {
    navigator.geolocation.getCurrentPosition = jest.fn((success, error) => error());
    const handleLatitudeChange = jest.fn();
    const handleLongitudeChange = jest.fn();
    const handleGeoLocationError = jest.fn();

    render(<NearMeButton handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} handleGeoLocationError={handleGeoLocationError} />)
    const button = screen.getByText("Near me");
    fireEvent.click(button);
    expect(handleGeoLocationError).toHaveBeenCalled();
})