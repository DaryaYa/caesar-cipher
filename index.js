const fs = require('fs');
const { pipeline, Readable } = require("stream");
const path = require('path');

const line = 'this is a secret message';
//const readable = Readable.from([line]);
//const filepath = path.resolve(__dirname, "./out.txt");

pipeline(
  //readable,
  fs.createReadStream('in.txt', 'utf8'),
  fs.createWriteStream("out.txt"),
  (error) => {
    if (error) {console.log('smth went wrong')}
   else { console.log('finished')}
  })