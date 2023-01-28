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
    const [maxDistance, setMaxDistance] = useState("50");

    useEffect(() => {
        setShowResults(false);
    }, [latitude, longitude, maxDistance])


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
        setLocations([]);
        console.log('maxdistance', maxDistance)
        const validCoordinates = coordinateValidation(latitude, longitude);
        if (validCoordinates) {
            setShowResults(true)
            const url = `http://localhost:8080/api/locations?lat=${latitude}&lon=${longitude}&send_all_within_distance=${"true"}&max_distance=${maxDistance}`;
            const requestionOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(url, requestionOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data["errors"]) {
                        setError("No locations within 50 miles.");
                        setLocations([]);
                        setShowResults(false);
                    } else {
                        setLocations(data["locations"]);
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

    const handleMaxDistanceChange = (e) => {
        setError("")
        setMaxDistance(e.target.value);
        return;
    }

    return (
        <form className="form">
            <label className="latitude-label">
                Latitude:
                <input
                    className="latitude-input"
                    type="text"
                    value={latitude}
                    placeholder={"Enter latitude"}
                    onChange={handleLatitudeChange} />
            </label>
            <br />
            <label className="longitude-label">
                Longitude:
                <input
                    className="longitude-input"
                    type="text"
                    value={longitude}
                    placeholder={"Enter longitude"}
                    onChange={handleLongitudeChange} />
            </label>
            <br />
            <NearMeButton handleGeoLocationError={handleGeoLocationError} handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} />
            <br />
            <label className="max-distance-label">Maximum Distance(miles):
                <input className="max-distance-input" type="text" value={maxDistance} placeholder={"Enter maximum distance"} onChange={handleMaxDistanceChange} /></label>
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
            <br />
            {error && <p className="error-message"> {error}</p>}
            {showResults && <div className="search-results"> <SearchResults locations={locations} /> </div>}
        </form>
    )
}

export default LocationSearchForm;