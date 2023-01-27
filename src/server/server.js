
import fetch from 'node-fetch';
import express from "express"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/locations', (req, res) => {
    const url = `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${req.query.lat}&lon=${req.query.lon}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: 'Error fetching data from API'
            })
        })
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080")
})