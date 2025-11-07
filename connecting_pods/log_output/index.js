# log_output/index.js
const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT;

const PING_PONG_URL = process.env.PING_PONG_URL;

const FILE_PATH = process.env.CONFIG_FILE_PATH:
let fileContent = 'File content not found';
const MESSAGE = `env variable: ${process.env.MESSAGE}`;

try {
  fileContent = fs.readFileSync(FILE_PATH, 'utf8').trim();
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
