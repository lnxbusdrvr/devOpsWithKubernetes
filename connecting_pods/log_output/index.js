const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const PING_PONG_URL = 'http://pingpong-svc:3001/pings';

const FILE_PATH = '/usr/src/app/config/information.txt';
let fileContent = 'File content not found';
const MESSAGE = `env variable: ${process.env.MESSAGE}`;

try {
  fileContent = fs.readFileSync(FILE_PATH, 'utf8');
} catch (err) {
  console.error(`Error reading file ${FILE_PATH}:`, err);
}

const createHash = (() => {
  const fourRnm = Math.random().toString(36).substr(2, 4);
  return `${Math.random().toString(10).substr(2, 4)}${fourRnm}-${fourRnm}-${fourRnm}-${fourRnm}-${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 1)}`;
})();

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(PING_PONG_URL);
    const counter = data.count;
    const output = [
      fileContent,
      MESSAGE,
      `${new Date().toISOString()}`: ${createHash}.Ping / Pongs: ${counter}``
    ].join('\n');

    res.send(`${new Date().toISOString()}: ${createHash}\nPing / Pongs: ${counter}`);
  } catch (error) {
    console.log('Error fetching ping count:', error.message);
    res.status(500).send('Error fetching ping count');
  }
});


app.listen(PORT, () => {
  console.log(`Log output server running on port ${PORT}`);
});
