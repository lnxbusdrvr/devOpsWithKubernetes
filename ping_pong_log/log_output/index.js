const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const pingpongLogFile = 'shared/pingpong.txt';

const createHash = (() => {
  const fourRnm = Math.random().toString(36).substr(2, 4);
  return `${Math.random().toString(10).substr(2, 4)}${fourRnm}-${fourRnm}-${fourRnm}-${fourRnm}-${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 1)}`;
})();

app.get('/', (req, res) => {
  let counter = 0;
  try {
    counter = fs.readFileSync(pingpongLogFile, 'utf8');
  } catch (error) {
    counter = '0';
  }
  res.send(`${new Date().toISOString()}: ${createHash}.<br>Ping / Pongs: ${counter}`)
});

app.listen(PORT, () => {
  console.log(`Log output server running on port ${PORT}`);
});
