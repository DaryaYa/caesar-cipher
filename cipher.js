
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const cipherFunc = (number, action, string) => {
   if (number < 0) {
     if (action === "encode" || action === "en") action = "decode";
     else action = "encode";
     number *= -1;
   }
   if (action === "decode" || action === "de") {
     letters.reverse();
   }

   let cipherText = "";
   for (symbol of string) {
     if (!letters.includes(symbol.toLowerCase())) {
       cipherText += symbol;
       continue;
     }
     let symbolIndex = letters.indexOf(symbol.toLowerCase());
     let newSymbolIndex = symbolIndex + +number;

     if (newSymbolIndex > letters.length - 1) {
       newSymbolIndex = newSymbolIndex % letters.length;
     }

     /^[A-Z]$/.test(symbol)
       ? (cipherText += letters[newSymbolIndex].toUpperCase())
       : (cipherText += letters[newSymbolIndex]);
   }

   return cipherText;
}

module.exports = cipherFunc;