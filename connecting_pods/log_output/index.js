const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

const PING_PONG_URL = 'http://pingpong-svc:3001/pings';

const createHash = (() => {
  const fourRnm = Math.random().toString(36).substr(2, 4);
  return `${Math.random().toString(10).substr(2, 4)}${fourRnm}-${fourRnm}-${fourRnm}-${fourRnm}-${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 1)}`;
})();

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(PING_PONG_URL);
    const counter = data.count;
    res.send(`${new Date().toISOString()}: ${createHash}\nPing / Pongs: ${counter}`);
  } catch (error) {
    console.log('Error fetching ping count:', error.message);
    res.status(500).send('Error fetching ping count');
  }
});


app.listen(PORT, () => {
  console.log(`Log output server running on port ${PORT}`);
});
