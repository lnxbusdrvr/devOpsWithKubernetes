const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const imageFile = path.join(__dirname, 'current.jpg');


app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>The project App</h1>
        <img src="/image" alt="random image" width="600"/>
        <p>DevOps with Kubernetes 2025</p>
      </body>
    </html>
  `);
});

app.get('/image', (req, res) => {
  res.sendFile(imageFile);
});

app.listen(PORT, () => {
  console.log(`Log output server running on port ${PORT}`);
});
