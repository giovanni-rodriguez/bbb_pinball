import React from "react"

const SearchResults = ({ locations }) => {
    return (
        locations.map((location, index) => {
            return (
                <div className="location" key={index} >
                    <h3 className="location-name" > Location Name: {location.name}</h3>
                    <p className="location-adress" > Address: {location.street} {location.city}, {location.state} {location.zip} </p>
                    {location.phone && <p> Phone Number: {location.phone}</p>}
                    <p className="machine-name-label" >Machine Names: </p>
                    {location.machine_names && <div className="machine-name" key={location.id}> {location.machine_names.map((el, index) => {
                        return (
                            <p key={index}>{el}</p>
                        )
                    })}</div>}
                </div>
            )
        })
    )
}


export default SearchResults