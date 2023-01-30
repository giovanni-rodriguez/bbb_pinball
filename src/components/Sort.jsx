import React from "react";

const Sort = ({ handleSortByChange, handleSortOrderChange }) => {
    return (
        <><label className="sort-by-label" htmlFor="sort-by-select">
            Sort by:
            <select id="sort-by-select" className="sort-by-select" aria-label="Sort by" onChange={handleSortByChange}>
                <option value="Distance">Distance</option>
                <option value="Name">Name</option>
                <option value="Number of machines">Number of machines</option>
            </select>
        </label><label className="sort-order-label" htmlFor="sort-order-select">
                Sort order:
                <select className="sort-order-select" id="sort-order-select" aria-label=" Sort order" onChange={handleSortOrderChange}>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </label></>
    )
}

export default Sort;