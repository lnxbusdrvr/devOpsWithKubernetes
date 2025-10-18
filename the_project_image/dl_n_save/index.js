const fs = require('fs');
const path = require('path');
const https = require('https');

const imageFile = path.join(__dirname, 'current.jpg');
const timestampFile = path.join(__dirname, 'timestamps.txt');

let shouldDownload = true;
if (fs.existsSync(timestampFile) && fs.existsSync(imageFile)) {
  const last = parseInt(fs.readFileSync(timestampFile, 'utf8'));
  const now = Date.now();
  if (now - last < 10 * 60 * 1000) { // less than 10 min
    shouldDownload = false;
  }
}

if (shouldDownload) {
  const url = 'https://picsum.photos/1200';
  const file = fs.createWriteStream(imageFile);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      fs.writeFileSync(timestampFile, Date.now().toString());
      console.log('Downloaded new image');
    });
  });
}

