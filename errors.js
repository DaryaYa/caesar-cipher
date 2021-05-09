const fs = require("fs");

const checkAction = (action) => {
  if (action) {
    if (
      action === "encode" ||
      action === "decode" ||
      action === "en" ||
      action === "de"
    ) {
      return;
    }
  }
  console.error('error: action must be "encode" or "en", or "decode" or "de"');
  process.exit(1);
};

const checkShift = (shift) => {
  if (shift) {
    if (Number.isInteger(+shift)) {
      return;
    }
  }
  console.error("error: shift must be an integer");
  process.exit(1);
};

const checkActionShift = (action, shift) => {
  checkAction(action);
  checkShift(shift);
};

const checkFile = (file) => {
  try {
    fs.accessSync(file, fs.constants.F_OK);
  } catch (err) {
    console.error(`error: file '${file}' does not exist`);
    process.exitCode = 1;
  }

  try {
    fs.accessSync(file, fs.constants.R_OK);
  } catch (err) {
    console.error("error: file is not read");
    process.exit(1);
  }
  try {
    fs.accessSync(file, fs.constants.W_OK);
  } catch (err) {
    console.error("error: file is not written");
    process.exit(1);
  }
};

module.exports = { checkActionShift, checkFile };
