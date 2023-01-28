import React, { useEffect, useState } from "react";
import NearMeButton from "./NearMeButton";
import SearchResults from "./SearchResults";
import coordinateValidation from "../utils/validation.js";

function LocationSearchForm() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")
    const [locations, setLocations] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setShowResults(false);
    }, [latitude, longitude])


    const handleLatitudeChange = (e) => {
        setError("")
        if (!e.target) {
            setLatitude(e);
        }
        else {
            setLatitude(e.target.value)
        }
        return;
    }
    const handleLongitudeChange = (e) => {
        setError("")
        if (!e.target) {
            setLongitude(e);
        }
        else {
            setLongitude(e.target.value)
        }
        return;
    }
    const handleGeoLocationError = () => {
        setError("Please enable location services in your browser or device settings to allow for accurate geolocation.")
        return;
    }

    const handleSearchClick = () => {
        const validCoordinates = coordinateValidation(latitude, longitude);
        if (validCoordinates) {
            const url = `http://localhost:8080/api/locations?lat=${latitude}&lon=${longitude}`;
            const requestionOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(url, requestionOptions)
                .then((res) => res.json())
                .then((data) => {
                    const allLocations = [];
                    for (let key in data) {
                        allLocations.push(data[key]);
                    }
                    if (allLocations[0] === "No locations within 50 miles.") {
                        setError("No locations within 50 miles.");
                    } else {
                        setShowResults(true)
                        setLocations(allLocations);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    console.log("error getting pinball locations from api")
                })
        }
        else {
            setError("Invalid Coordinates: Please enter a valid latitude and longitude.");
        }
    }

    return (
        <form className="form">
            <label className="latitude-label">
                Latitude:
                <input
                    className="latitude-input"
                    type="text"
                    value={latitude}
                    onChange={handleLatitudeChange} />
            </label>
            <br />
            <label className="longitude-label">
                Longitude:
                <input
                    className="longitude-input"
                    type="text"
                    value={longitude}
                    onChange={handleLongitudeChange} />
            </label>
            <br />
            <NearMeButton handleGeoLocationError={handleGeoLocationError} handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} />
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
            <br />
            {error && <p className="error-message"> {error}</p>}
            {showResults && <div className=".search-results"> <SearchResults locations={locations} /> </div>}
        </form>
    )
}

export default LocationSearchForm;