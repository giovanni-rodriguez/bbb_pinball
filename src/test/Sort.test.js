import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import Sort from "../components/Sort";
import sortLocations from "../utils/sorting";

describe("Sort component", () => {

    test("it should render the select elements with their options", () => {
        render(<Sort />);
        const sortBySelect = screen.getByLabelText("Sort by:");
        const sortOrderSelect = screen.getByLabelText("Sort order:");

        expect(sortBySelect).toBeInTheDocument();
        expect(sortOrderSelect).toBeInTheDocument();
        expect(sortBySelect.options.length).toBe(3);
        expect(sortOrderSelect.options.length).toBe(2);
    })

    test("it should call handleSortByChange when sort by select value changes", () => {
        const handleSortByChange = jest.fn();

        render(<Sort handleSortByChange={handleSortByChange} />)

        const sortBySelect = screen.getByLabelText("Sort by:");

        fireEvent.change(sortBySelect, { target: { value: "Name" } });

        expect(handleSortByChange).toHaveBeenCalled();
    })

    test("it should call handleSortOrderChange when sort order select value changes", () => {
        const handleSortOrderChange = jest.fn();

        render(<Sort handleSortOrderChange={handleSortOrderChange} />)

        const sortOrderSelect = screen.getByLabelText("Sort order:");

        fireEvent.change(sortOrderSelect, { target: { value: "Descending" } });

        expect(handleSortOrderChange).toHaveBeenCalled();
    })
})

describe("sortLocations Function", () => {
    test("it should sort the locations by distance in ascending order", () => {
        const locations = [{
            name: "Location 1", distance: 4, num_machines: 5
        }, {
            name: "Location 2", distance: 2, num_machines: 3
        }, {
            name: "Location 3", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Distance", "Ascending");
        expect(sortedLocations).toEqual([
            {
                name: "Location 2", distance: 2, num_machines: 3
            }, {
                name: "Location 3", distance: 3, num_machines: 4
            }, {
                name: "Location 1", distance: 4, num_machines: 5
            }
        ])
    })

    test("it should sort the locations by distance in descending order", () => {
        const locations = [{
            name: "Location 1", distance: 4, num_machines: 5
        }, {
            name: "Location 2", distance: 2, num_machines: 3
        }, {
            name: "Location 3", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Distance", "Descending");
        expect(sortedLocations).toEqual([
            {
                name: "Location 1", distance: 4, num_machines: 5
            },
            {
                name: "Location 3", distance: 3, num_machines: 4
            },
            {
                name: "Location 2", distance: 2, num_machines: 3
            }
        ])
    })

    test("it should sort the locations by name in ascending order", () => {
        const locations = [{
            name: "z", distance: 4, num_machines: 5
        }, {
            name: "m", distance: 2, num_machines: 3
        }, {
            name: "a", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Name", "Ascending");
        expect(sortedLocations).toEqual([
            {
                name: "a", distance: 3, num_machines: 4
            },
            {
                name: "m", distance: 2, num_machines: 3
            },
            {
                name: "z", distance: 4, num_machines: 5
            }
        ])
    })

    test("it should sort the locations by name in descending order", () => {
        const locations = [{
            name: "a", distance: 4, num_machines: 5
        }, {
            name: "m", distance: 2, num_machines: 3
        }, {
            name: "z", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Name", "Desending");
        expect(sortedLocations).toEqual([
            {
                name: "z", distance: 3, num_machines: 4
            },
            {
                name: "m", distance: 2, num_machines: 3
            },
            {
                name: "a", distance: 4, num_machines: 5
            }
        ])
    })

    test("it should sort the locations by number of machines in ascending order", () => {
        const locations = [{
            name: "Location 1", distance: 4, num_machines: 5
        }, {
            name: "Location 2", distance: 2, num_machines: 3
        }, {
            name: "Location 3", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Number of machines", "Ascending");
        expect(sortedLocations).toEqual([
            {
                name: "Location 2", distance: 2, num_machines: 3
            },
            {
                name: "Location 3", distance: 3, num_machines: 4
            },
            {
                name: "Location 1", distance: 4, num_machines: 5
            }
        ])
    })

    test("it should sort the locations by number of machines in descending order", () => {
        const locations = [{
            name: "Location 1", distance: 4, num_machines: 5
        }, {
            name: "Location 2", distance: 2, num_machines: 3
        }, {
            name: "Location 3", distance: 3, num_machines: 4
        }]
        const sortedLocations = sortLocations(locations, "Number of machines", "Descending");
        expect(sortedLocations).toEqual([
            {
                name: "Location 1", distance: 4, num_machines: 5
            },
            {
                name: "Location 3", distance: 3, num_machines: 4
            },
            {
                name: "Location 2", distance: 2, num_machines: 3
            }
        ])
    })
})