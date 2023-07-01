const { verifyToken } = require("../Token");
const Authorize = (roles = []) => {
  return (req, res, next) => {
    // get the token from request
    const token = req.headers.authorization;
    console.log("Token: ", token);
    // validate the received token;
    const payload = verifyToken(token);
    if (!payload) {
      // invalid
      // if token is invalid then send the forbidden response
      res.status(403).send({ error: null, message: "Login to access the API" });
    } else if (roles.includes(payload.role)) {
      //   if token is valid and user role is available then the allowed role forward
      //     req to next api or endpoint
      next();
    } else {
      // if user does not have permission then response with error
      res
        .status(401)
        .send({ message: "You do not have the permission to access the API" });
    }
  };
};

module.exports = Authorize;
