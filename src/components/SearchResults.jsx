import React from "react"
import "../styles/searchResults.css";

const SearchResults = ({ locations }) => {
    return (
        <ul aria-label="Search Results">
            {locations.map((location, index) => {
                const distance = Math.round(location.distance * 10) / 10;
                return (
                    <li className="location" key={location.id} >
                        <h3 className="location-name" aria-label={`Location Name: ${location.name}`}> Location Name: {location.name}</h3>
                        <p className="location-adress" aria-label={`Address: ${location.street} ${location.city}, ${location.state} ${location.zip}`}> Address: {location.street} {location.city}, {location.state} {location.zip} </p>
                        <p className="location-distance" aria-label={`Distance: ${distance} miles`}>{distance} mi</p>
                        {location.phone && <p aria-label={`Phone Number: ${location.phone}`}> Phone Number: {location.phone}</p>}
                        <p className="machine-name-label" aria-label="Machine Names:">Machine Names: </p>
                        {location.machine_names && <ul className="machine-name" key={location.id}> {location.machine_names.map((el, index) => {
                            return (
                                <li key={index} aria-label={`Machine Name: ${el}`}>{el}</li>
                            )
                        })}</ul>}
                    </li>
                )
            })}
        </ul>
    )
}


export default SearchResults