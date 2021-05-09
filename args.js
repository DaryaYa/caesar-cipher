const program = require("commander");
const args =() => {
  program
  // .usage("[options] <file>")
  .requiredOption("-a, --action <type>", "encode/decode")
  .requiredOption("-s, --shift <number>", " a shift")
  .option("-i, --input <inputFile>", "an input file")
  .option("-o, --output <outputFile>", "an output file")
  // more hanlder: require('../lib/moreHandler')(options);

  .parse(process.argv);
  return program.opts();
}
  //const args = program.opts();
  module.exports = args;
