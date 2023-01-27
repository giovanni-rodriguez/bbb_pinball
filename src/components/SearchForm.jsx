import React, { useEffect, useState } from "react";



function SearchForm() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [error, setError] = useState("");

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
        }
        else if (!isFinite(longitude) || longitude <= -180 || longitude >= 180 || !longitude) {
            setError("Invalid coordinates. Please enter a valid latitude and longitude.");
        }
    }


    const handleSearchClick = () => {
        validateCoordinates();
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
        <div className="form-container">
            <form className="form">
                <label className="latitude-label">
                    Latitude:
                    <input
                        className="latitude-input"
                        type="text"
                        value={latitude}
                        onChange={handleLatitudeChange}
                    />
                </label>
                <br />
                <label className="longitude-label">
                    Longitude:
                    <input
                        className="longitude-input"
                        type="text"
                        value={longitude}
                        onChange={handleLongitudeChange}
                    />
                </label>
            </form>
            <button className="near-me-button" type="button" onClick={handleNearMeClick}  >
                Near Me
            </button>
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
            <br />
            {error && <p className="error-message"> {error}</p>}
        </div>
    );
}
export default SearchForm;