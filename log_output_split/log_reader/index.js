const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const logFile = 'shared/log.txt';

app.get('/logs', (req, res) => {
  try {
    const data = fs.readFileSync(logFile, 'utf8');
    res.type('text/plain').send(data || 'no logs yet');
  } catch (error) {
    res.send('file not found');
  }
});

app.listen(PORT, () => {
  console.log(`Reader server running on port ${PORT}`);
});
