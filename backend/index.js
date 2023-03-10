require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../frontend');

app.use(cors());
app.use(express.static(publicDirectoryPath));

app.get('/api/weather', async (req, res) => {
    const loc = req.query.loc;
    const weather = await axios({
        method: 'get',
        url: `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${loc}`
    })
    .then(result => {return result.data});
    res.send(weather);
});

app.listen(3000, () => {console.log('Listening on port 3000')});