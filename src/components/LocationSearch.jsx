import React, { useEffect, useState } from "react";
import NearMeButton from "./NearMeButton";
import SearchResults from "./SearchResults";
import MaxDistance from "./MaxDistance";
import Sort from "./Sort";
import coordinateValidation from "../utils/validation.js";
import sortLocations from "../utils/sorting";
import makeAPIRequest from "../utils/makeAPIRequest";
import "../styles/locationSearch.css";

const cache = {};


const LocationSearch = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")
    const [locations, setLocations] = useState([]);
    const [maxDistance, setMaxDistance] = useState("50");
    const [sortBy, setSortBy] = useState("Distance");
    const [sortOrder, setSortOrder] = useState("Ascending");
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setShowResults(false);
    }, [latitude, longitude, maxDistance])

    const handleLatitudeChange = (e) => {
        setError("")
        setLatitude(!e.target ? e : e.target.value);
    }
    const handleLongitudeChange = (e) => {
        setError("")
        setLongitude(!e.target ? e : e.target.value);
    }
    const handleGeoLocationError = () => {
        setError("Please enable location services in your browser or device settings to allow for accurate geolocation.")
    }

    const handleSearchClick = async () => {
        setLocations([]);
        const validCoordinates = coordinateValidation(latitude, longitude);
        const validMaxDistance = maxDistance <= 1000 && maxDistance >= 1;
        if (validCoordinates && validMaxDistance) {
            const cacheKey = `${latitude},${longitude},${maxDistance}`;
            if (cache[cacheKey]) {
                const sortedLocations = sortLocations(cache[cacheKey], sortBy, sortOrder);
                setLocations(sortedLocations);
                setShowResults(true);
            }
            else {
                const response = await makeAPIRequest(latitude, longitude, maxDistance);
                if (response === "No Locations") {
                    setError(`No locations within ${maxDistance} miles.`);
                    setLocations([]);
                    setShowResults(false);
                } else if (Array.isArray(response)) {
                    cache[cacheKey] = response;
                    const sortedLocations = sortLocations(response, sortBy, sortOrder);
                    setLocations(sortedLocations);
                    setShowResults(true);
                } else if (response === "Error") {
                    setError("Sorry, there was a problem retrieving data. Please try again later.")
                }
            }
        }
        else {
            if (!validMaxDistance) {
                setError("Please enter maximum distance between 1 and 1000");
            }
            else {
                setError("Invalid Coordinates: Please enter a valid latitude and longitude.");
            }
        }
    }

    const handleMaxDistanceChange = (distance) => {
        setError("")
        setMaxDistance(distance);
    }

    const handleSortByChange = (e) => {
        const sortBySelection = e.target.value;
        setSortBy(sortBySelection)
        if (locations.length > 1) {
            const newLocations = sortLocations(locations, sortBySelection, sortOrder);
            setLocations(newLocations);
        }
    }

    const handleSortOrderChange = (e) => {
        const sortOrderSelection = e.target.value;
        setSortOrder(sortOrderSelection)
        if (locations.length > 1) {
            const newLocations = sortLocations(locations, sortBy, sortOrderSelection);
            setLocations(newLocations);
        }
    }

    return (
        <form className="form">
            <label id="latitude-label" className="latitude-label" htmlFor="latitude-input">
                Latitude:
                <input
                    className="latitude-input"
                    type="text"
                    value={latitude}
                    placeholder={"Enter latitude"}
                    onChange={handleLatitudeChange}
                    aria-labelledby="latitude-label" />
            </label>
            <br />
            <label id="longitude-label" className="longitude-label" htmlFor="longitude-input">
                Longitude:
                <input
                    className="longitude-input"
                    type="text"
                    value={longitude}
                    placeholder={"Enter longitude"}
                    aria-labelledby="longitude-label"
                    onChange={handleLongitudeChange} />
            </label>
            <br />
            <NearMeButton handleGeoLocationError={handleGeoLocationError} handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} aria-label="Use current location" />
            <br />
            <MaxDistance handleMaxDistanceChange={handleMaxDistanceChange} aria-label="Set max distance" />
            <button className="search-button" type="button" onClick={handleSearchClick} aria-label="Search">
                Search
            </button>
            <br />
            <Sort handleSortByChange={handleSortByChange} handleSortOrderChange={handleSortOrderChange} aria-label="Sort options" />
            <br />
            {error && <p className="error-message" role="alert"> {error}</p>}
            {showResults && <div className="search-results"> <SearchResults locations={locations} /> </div>}
        </form>
    )
}

export default LocationSearch;
