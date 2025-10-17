const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const createHash = (() => {
  const fourRnm = Math.random().toString(36).substr(2, 4);
  return `${Math.random().toString(10).substr(2, 4)}${fourRnm}-${fourRnm}-${fourRnm}-${fourRnm}-${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 1)}`;
})();

const printHash = () => {
  console.log(`${new Date().toISOString()}: ${createHash}`);
  setTimeout(printHash, 5000);
};

printHash();

app.get('/status', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    hash: createHash
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
