//const fs = require('fs');
const { createReadStream, createWriteStream } = require("fs");
const { pipeline, Transform } = require("stream");
// const path = require('path');
 const cipherFunc = require('./cipher');
const args = require('./args');
const { TransformStream } = require("./transform");

const options = args();

let readable = process.stdin;
if (options.hasOwnProperty("input")) {
 // checkFile(options.input);
 readable = createReadStream(options.input, "utf8");
}

let writable = process.stdout;
if (options.hasOwnProperty("output")) {
  writable = createWriteStream(options.output, { flags: "a" });
}

 const transformStream = new TransformStream(options.action, options.shift);


TransformStream._transform = (chunk, encoding, callback) => {
  const str = chunk.toString("utf8");
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
 transformStream,
 writable,
 // createWriteStream("out.txt"),
  (error) => {
    if (error) {process.stderr('smth went wrong')}
   else {console.log('finished')}
  })
