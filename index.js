const { createReadStream, createWriteStream } = require("fs");
const { pipeline } = require("stream");

const args = require("./args");
const { TransformStream } = require("./transform");
const { checkActionShift, checkFile } = require("./errors");

const options = args();

let readable = process.stdin;
if (options.hasOwnProperty("input")) {
  checkFile(options.input);
  readable = createReadStream(options.input, "utf8");
}

let writable = process.stdout;
if (options.hasOwnProperty("output")) {
 // checkFile(options.output);
  writable = createWriteStream(options.output, { flags: "a" });
}

checkActionShift(options.action, options.shift);

const transformStream = new TransformStream(options.action, options.shift);

pipeline(
  readable, 
  transformStream, 
  writable, 
  (error) => {
  if (error) {
    process.stderr("smth went wrong");
  } else {
    console.log("finished");
  }
});
