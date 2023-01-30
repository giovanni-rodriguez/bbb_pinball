const merge = (left, right, sortBy, sortOrder) => {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (sortBy === "Distance") {
            if (sortOrder === "Ascending") {
                if (left[i].distance < right[j].distance) {
                    result.push(left[i]);
                    i++
                } else {
                    result.push(right[j]);
                    j++
                }
            } else {
                if (left[i].distance > right[j].distance) {
                    result.push(left[i]);
                    i++
                }
                else {
                    result.push(right[j]);
                    j++
                }
            }
        } else if (sortBy === "Name") {
            if (sortOrder === "Ascending") {
                if (left[i].name.localeCompare(right[j].name) < 0) {
                    result.push(left[i]);
                    i++
                } else {
                    result.push(right[j]);
                    j++
                }
            } else {
                if (left[i].name.localeCompare(right[j].name) > 0) {
                    result.push(left[i]);
                    i++
                } else {
                    result.push(right[j]);
                    j++
                }
            }
        } else if (sortBy === "Number of machines") {
            if (sortOrder === "Ascending") {
                if (left[i].num_machines < right[j].num_machines) {
                    result.push(left[i]);
                    i++
                } else {
                    result.push(right[j]);
                    j++
                }
            } else {
                if (left[i].num_machines > right[j.num_machines]) {
                    result.push(left[i]);
                    i++
                } else {
                    result.push(right[j]);
                    j++
                }
            }
        }
    }
    while (i < left.length) {
        result.push(left[i]);
        i++
    }
    while (j < right.length) {
        result.push(right[j]);
        j++
    }
    return result;
}

const mergeSort = (locations, sortBy, sortOrder) => {
    if (locations.length < 2) {
        return locations;
    }

    const middle = Math.floor(locations.length / 2);
    const left = locations.slice(0, middle);
    const right = locations.slice(middle);

    return merge(mergeSort(left, sortBy, sortOrder), mergeSort(right, sortBy, sortOrder), sortBy, sortOrder);
}

const sortLocations = (locations, sortBy, sortOrder) => {
    return mergeSort(locations, sortBy, sortOrder)
}

export default sortLocations;