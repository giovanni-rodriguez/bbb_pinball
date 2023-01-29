const sortLocations = (locations, sortBy, sortOrder) => {
    if (sortBy === "Distance") {
        locations = locations.sort((a, b) => sortOrder === "Ascending" ? a.distance - b.distance : b.distance - a.distance);
    }
    else if (sortBy === "Name") {
        locations = locations.sort((a, b) => sortOrder === "Ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }
    else if (sortBy === "Number of machines") {
        locations = locations.sort((a, b) => sortOrder === "Ascending" ? a.num_machines - b.num_machines : b.num_machines - a.num_machines);
    }
    return locations
}

export default sortLocations