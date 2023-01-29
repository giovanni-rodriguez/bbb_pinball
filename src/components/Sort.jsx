import React from "react";

const Sort = ({ handleSortByChange, handleSortOrderChange }) => {
    return (
        <><label>
            Sort by:
            <select onChange={handleSortByChange}>
                <option value="Distance">Distance</option>
                <option value="Name">Name</option>
                <option value="Number of machines">Number of machines</option>
            </select>
        </label><label>
                Sort order:
                <select onChange={handleSortOrderChange}>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </label></>
    )
}

export default Sort;