import React, { useEffect, useState } from "react";
import NearMeButton from "./NearMeButton";
import SearchResults from "./SearchResults";
import coordinateValidation from "../utils/validation.js";
import MaxDistance from "./MaxDistance";
import sortLocations from "../utils/sorting";
import Sort from "./Sort";

const cache = {};


const LocationSearchForm = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")
    const [locations, setLocations] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState("");
    const [maxDistance, setMaxDistance] = useState("50");
    const [sortBy, setSortBy] = useState("Distance");
    const [sortOrder, setSortOrder] = useState("Ascending");

    useEffect(() => {
        setShowResults(false);
    }, [latitude, longitude, maxDistance])

    useEffect(() => {
    }, [locations]);

    const handleLatitudeChange = (e) => {
        setError("")
        setLatitude(!e.target ? e : e.target.value);
        return;
    }
    const handleLongitudeChange = (e) => {
        setError("")
        setLongitude(!e.target ? e : e.target.value);
        return;
    }
    const handleGeoLocationError = () => {
        setError("Please enable location services in your browser or device settings to allow for accurate geolocation.")
        return;
    }

    const handleSearchClick = () => {
        setLocations([]);
        const validCoordinates = coordinateValidation(latitude, longitude);
        const validMaxDistance = maxDistance <= 1000 && maxDistance >= 1;
        if (validCoordinates && validMaxDistance) {
            const cacheKey = `${latitude},${longitude},${maxDistance}`;
            if (cache[cacheKey]) {
                const sortedLocations = sortLocations(cache[cacheKey], sortBy, sortOrder);
                setLocations(sortedLocations);
                setShowResults(true);
                return;
            }
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
                        cache[cacheKey] = data["locations"];
                        const sortedLocations = sortLocations(data["locations"], sortBy, sortOrder);
                        setLocations(sortedLocations);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    console.log("error getting pinball locations from api")
                })
        }
        else {
            if (!validMaxDistance) {
                setError("Please enter maximum distance between 1 and 1000");
                return;
            }
            else {
                setError("Invalid Coordinates: Please enter a valid latitude and longitude.");
                return;
            }
        }
    }

    const handleMaxDistanceChange = (distance) => {
        setError("")
        setMaxDistance(distance);
        return;
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
            <MaxDistance handleMaxDistanceChange={handleMaxDistanceChange} />
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
            <Sort handleSortByChange={handleSortByChange} handleSortOrderChange={handleSortOrderChange} />
            <br />
            {error && <p className="error-message"> {error}</p>}
            {showResults && <div className="search-results"> <SearchResults locations={locations} /> </div>}
        </form>
    )
}

export default LocationSearchForm;
