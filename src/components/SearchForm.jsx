import React, { useState } from "react";



function SearchForm() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleNearMeClick = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => {
                console.log("Error getting location: ", error);
            }
        );
    };


    const handleSearchClick = () => {

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
                        onChange={e => setLatitude(e.target.value)}
                    />
                </label>
                <br />
                <label className="longitude-label">
                    Longitude:
                    <input
                        className="longitude-input"
                        type="text"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </label>
            </form>
            <button className="near-me-button" type="button" onClick={handleNearMeClick}  >
                Near Me
            </button>
            <button className="search-button" type="button" onClick={handleSearchClick}>
                Search
            </button>
        </div>
    );
}
export default SearchForm;