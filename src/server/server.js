
import fetch from 'node-fetch';
import express from "express"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/locations', async (req, res) => {

    try {
        const { lat, lon, send_all_within_distance, max_distance } = req.query;
        const url = `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${lat}&lon=${lon}&send_all_within_distance=${send_all_within_distance}&max_distance=${max_distance}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Error fetching data from API'
        })
    }
})

app.use((req, res) => res.status(404).send('Unknown route'));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080")
})