// npm i bcryptjs
const { hashSync, compareSync } = require("bcryptjs");

const encryption = {
  encrypt(plainText) {
    try {
      return hashSync(plainText);
    } catch (err) {
      console.error(err);
    }
    return null;
  },

  compare(plainText, ciperText) {
    try {
      return compareSync(plainText, ciperText);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
};

module.exports = encryption;
