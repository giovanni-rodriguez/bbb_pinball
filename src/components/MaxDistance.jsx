import React, { useState } from "react";
import "../styles/maxDistance.css"

const MaxDistance = ({ handleMaxDistanceChange }) => {
    const [maxDistance, setMaxDistance] = useState("50");

    const handleDistanceChange = (e) => {
        setMaxDistance(e.target.value);
        handleMaxDistanceChange(e.target.value);
    }
    return (
        <label className="max-distance-label" htmlFor="max-distance">Maximum Distance(miles):
            <input id="max-distance" className="max-distance-input" title="Enter Maximum Distance(in miles)" aria-label="Enter Maximum Distance(in miles)" type="text" value={maxDistance} placeholder={"Enter maximum distance"} onChange={handleDistanceChange} /></label>
    )
}

export default MaxDistance;