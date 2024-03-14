const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const tvShows = [
    {
        title: 'Sherlock',
        seasons: 4,
        episodes: 13,
        year: '2010-2017',
        cast: ['Benedict Cumberbatch', 'Martin Freeman'],
        type: 'Crime, Drama, Mystery',
        rating: 9.1,
        poster: 'sherlock-poster.jpg',
        directors: ['Mark Gatiss', 'Steven Moffat']
    },
];

app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    try {
        const apiResponse = await axios.get('https://api.tvmaze.com/search/shows?q=horatio%20hornblower');
        const showData = apiResponse.data[0].show;
        const combinedData = { ...tvShows[0], poster: showData.image.medium, title: showData.name };
        res.render('index', { tvShow: combinedData });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('An error occurred while fetching data.');
    }
});

app.get('/episodes', async (req, res) => {
    try {
        const episodesResponse = await axios.get('https://api.tvmaze.com/shows/1632/episodes');
        const episodes = episodesResponse.data;
        res.json(episodes);
    } catch (error) {
        console.error('Error fetching episodes:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching episodes.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
