const makeAPIRequest = (latitude, longitude, maxDistance) => {
    const url = `http://localhost:8080/api/locations?lat=${latitude}&lon=${longitude}&send_all_within_distance=${"true"}&max_distance=${maxDistance}`;
    const requestionOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, requestionOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data["errors"]) {
                return "No Locations";
            } else {
                return data["locations"];
            }
        })
        .catch((err) => {
            console.log(err)
            console.log("error getting pinball locations from api")
            return "Error"
        })
}

export default makeAPIRequest;