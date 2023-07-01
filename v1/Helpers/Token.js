const jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn = 60 * 15) => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn });
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createToken, verifyToken };
