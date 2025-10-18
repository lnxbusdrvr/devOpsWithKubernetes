const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const counterFile = '/usr/src/app/shared/pingpong.txt';

app.get('/pingpong', (req, res) => {
  let counter = 0;
  try {
    counter = parseInt(fs.readFileSync(counterFile, 'utf8') || 0 );
  } catch (error) {
    console.log(error);
  }

  counter++;
  fs.writeFileSync(counterFile, counter.toString());
  res.send(`pong ${counter}`)
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

