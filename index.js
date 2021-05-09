//const fs = require('fs');
const { createReadStream, createWriteStream } = require("fs");
const { pipeline, Transform } = require("stream");
// const path = require('path');
const cipherFunc = require('./cipher');
const args = require('./args');

const options = args();

let readable = process.stdin;
if (options.hasOwnProperty("input")) {
 // checkFile(options.input);
 readable = createReadStream(options.input, "utf8");
}

let writable = process.stdout;
if (options.hasOwnProperty("output")) {
  writable = createWriteStream("out.txt")
}

const TransformStream = new Transform();

TransformStream._transform = (chunk, encoding, callback) => {
  const str = chunk.toString();
 // console.log(str);
  const cT = cipherFunc(str);
  console.log(cT);
  //callback();
  return cT;
};

 //process.stdin.pipe(TransformStream);

pipeline(
  readable,
 //process.stdin,
// createReadStream('in.txt', 'utf8'),
 TransformStream,
 writable,
 // createWriteStream("out.txt"),
  (error) => {
    if (error) {process.stderr('smth went wrong')}
   else {console.log('finished')}
  })
