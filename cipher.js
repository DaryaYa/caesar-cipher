const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].join('');

const cipherFunc = (string) => {
  let number = -3;
  if (!string || !number) {
    throw new Error();
  }

  let cipherText = "";

  for (let i = 0; i < string.length; i++) {
    if (LETTERS.includes(string[i])) {
      let index = LETTERS.indexOf(string[i]);
      let indexShift = 0;
      if (index + number >= 0) {
        indexShift = (index + number) % LETTERS.length;
      } else if (index + number < 0) {
        indexShift =
          LETTERS.length - Math.abs((index + number) % LETTERS.length);
      }
      cipherText += LETTERS[indexShift];
    } else {
      cipherText += string[i];
    }
  }
  return cipherText;
};

module.exports = cipherFunc;