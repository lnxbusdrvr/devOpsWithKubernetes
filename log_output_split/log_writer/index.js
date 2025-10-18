const fs = require('fs');
const file = 'shared/log.txt'
//const file = '/home/vadenn/src/oma/k8s/devOpsWithKubernetes/log_output_split/app/shared/log.txt'


const createHash = (() => {
  const fourRnm = Math.random().toString(36).substr(2, 4);
  return `${Math.random().toString(10).substr(2, 4)}${fourRnm}-${fourRnm}-${fourRnm}-${fourRnm}-${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 1)}`;
})();

const writeLog = () => {
  const line = `${new Date().toISOString()} ${createHash}\n`;
  fs.appendFileSync(file, line);
  console.log(`wrote ${new Date().toISOString()}: ${createHash} to ${file}`);
  setTimeout(writeLog, 5000);
};

fs.mkdirSync('shared', { recursive: true});
writeLog();

