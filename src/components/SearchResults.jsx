import React from "react"

const SearchResults = (locations) => {
    console.log('locations', locations)

    return (
        locations.locations.map((location) => {
            return (
                <div key={location.id}>
                    <p> Name: {location.name}</p>
                    <p> Adress: {location.street} {location.city}, {location.state} {location.zip} </p>
                    <p> Phone Number: {location.phone}</p>
                </div>
            )
        })
    )
}

export default SearchResults