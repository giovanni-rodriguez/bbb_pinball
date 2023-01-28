import React from "react"

const SearchResults = ({ locations }) => {
    return (
        locations.map((location) => {
            console.log(location)
            return (
                <div className="location" key={location.id}>
                    <h3 className="location-name"> Location Name: {location.name}</h3>
                    <p className="location-adress"> Address: {location.street} {location.city}, {location.state} {location.zip} </p>
                    {location.phone && <p> Phone Number: {location.phone}</p>}
                    <p className="machine-name-label">Machine Names: </p>
                    <div className="machine-name"> {location.machine_names.map(el => {
                        return (
                            <p>{el}</p>
                        )
                    })}</div>
                </div>
            )
        })
    )
}


export default SearchResults