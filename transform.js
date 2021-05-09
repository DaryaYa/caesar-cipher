const { Transform } = require('stream');
const cipherFunc = require("./cipher");

class TransformStream extends Transform {
  constructor(action, shift) {
    super(action, shift);
    this.action = action;
    this.shift = shift;
  }

  
  _transform(chunk, encoding, callBack) {
  
    let str = chunk.toString("utf8");
    if (chunk === "\u0003") {
      process.exit(1);
    }

    chunk = cipherFunc(this.shift,this.action, str) + "\n";

    callBack(null, chunk);
  }
}

module.exports = { TransformStream }; 
