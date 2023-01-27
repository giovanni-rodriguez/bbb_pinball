import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults.jsx";



function SearchForm() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState("");
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setError("")
    }, [latitude, longitude])

    const handleNearMeClick = () => {
        setError("");
        navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => {
                console.log(error)
                setError("Error getting location. Please ensure that location services are enabled on your device and try again.");
            }
        );
    };

    const validateCoordinates = () => {
        if (!isFinite(latitude) || latitude <= -90 || latitude >= 90 || !latitude) {
            setError("Invalid coordinates. Please enter a valid latitude and longitude.");
            return false;
        }
        else if (!isFinite(longitude) || longitude <= -180 || longitude >= 180 || !longitude) {
            setError("Invalid coordinates. Please enter a valid latitude and longitude.");
            return false;
        }
        return true;
    }


    const handleSearchClick = () => {
        const validCoordinates = validateCoordinates();
        if (validCoordinates) {
            const url = `http://localhost:8080/api/locations?lat=${latitude}&lon=${longitude}`;
            const requestionOptions = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch(url, requestionOptions)
                .then((res) => res.json())
                .then((data) => {
                    const allLocations = [];
                    for (let key in data) {
                        allLocations.push(data[key]);
                    }
                    setShowResults(true);
                    setLocations(allLocations);
                })
                .catch((err) => {
                    console.log(err)
                    console.log("error getting pinball locations from api")
                })

        }
    }

    const handleLatitudeChange = (e) => {
        setError("")
        setLatitude(e.target.value)
    }

    const handleLongitudeChange = (e) => {
        setError("")
        setLongitude(e.target.value)
    }
    return (
        <><div className="form-container">
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
            </form>
            <button className="near-me-button" type="button" onClick={handleNearMeClick}>
                Near Me
            </button>
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
            <br />
            {error && <p className="error-message"> {error}</p>}
        </div><div>
                {showResults && <SearchResults locations={locations} />}
            </div></>

    );
}
export default SearchForm;