import React, { useState } from "react";

const MaxDistance = ({ handleMaxDistanceChange }) => {
    const [maxDistance, setMaxDistance] = useState("50");

    const handleDistanceChange = (e) => {
        setMaxDistance(e.target.value);
        handleMaxDistanceChange(e.target.value);
    }
    return (
        <label className="max-distance-label">Maximum Distance(miles):
            <input className="max-distance-input" type="text" value={maxDistance} placeholder={"Enter maximum distance"} onChange={handleDistanceChange} /></label>
    )
}

export default MaxDistance