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
  process.exitCode = 1;
}

const checkShift = (shift) => {
  if (shift) {
    if (Number.isInteger(+shift)) {
      // console.log(`shift ${shift} is good`);
      return;
    }
  }
  console.error("error: shift must be an integer");
  process.exitCode = 1;
}

const checkActionShift = (action, shift) => {
  checkAction(action);
  checkShift(shift);
}

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
    process.exitCode = 1;
  }

  try {
    fs.accessSync(file, fs.constants.W_OK);
  } catch (err) {
    console.error("error: file is not written");
    process.exitCode = 1;
  }
}

module.exports = { checkActionShift, checkFile };
