//const fs = require('fs');
const { createReadStream, createWriteStream } = require("fs");
const { pipeline, Readable, Transform } = require("stream");
const path = require('path');

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].join('');

//const line = 'this is a secret message';
//const readable = Readable.from([line]);
//const filepath = path.resolve(__dirname, "./out.txt");

const cipherFunc = (string) => {
 let number = -3;
  if (!string || !number) {
    throw new Error();
  }    

  let cipherText = "";

  for (let i = 0; i < string.length; i++ ) {
    if (LETTERS.includes(string[i])) {
      let index = LETTERS.indexOf(string[i]) ;
      let indexShift = 0;
      if (index+number >=0) {
        indexShift = (index + number) % LETTERS.length;
      } else if (index+number < 0) {
        indexShift = LETTERS.length - Math.abs((index + number) % LETTERS.length);
      }
      cipherText += LETTERS[indexShift] ;  
    } else {
      cipherText += string[i];
    }
  }
  return cipherText;
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
 // readable,
 //process.stdin,
 createReadStream('in.txt', 'utf8'),
 TransformStream,
  createWriteStream("out.txt"),
  (error) => {
    if (error) {process.stderr('smth went wrong')}
   else {console.log('finished')}
  })
