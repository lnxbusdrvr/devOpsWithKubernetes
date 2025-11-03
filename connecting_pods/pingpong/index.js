const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let counter = 0;

app.get('/pingpong', (req, res) => {
  counter++;
  res.send(`pong ${counter}`)
});

app.get('/pings', (req, res) => {
  res.json({ count: counter })
});


app.listen(PORT, () => {
  console.log(`Ping pong app listening on port ${PORT}`);
});

