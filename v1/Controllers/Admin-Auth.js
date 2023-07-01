const { compare } = require("../Helpers/Encryption");
const { createToken } = require("../Helpers/Token");
const { pickAdmin } = require("./Admin-Controller");
const AdminModel = require("../Models/Admin-Model");

module.exports = {
  adminLogin(req, res) {
    const handleErrorResponse = (status, message, error) => {
      res.status(status).send({ message, error });
    };

    const { email, password } = req.body;
    //validate email
    AdminModel.findOne({ email, status: 1 })
      .then((result) => {
        if (!result) {
          //invalid email
          return handleErrorResponse(404, "Invalid email or user is disabled!");
        }

        //validate password
        if (compare(password, result?.password)) {
          //valid password
          //generate token
          const accessToken = createToken(
            {
              id: result?._id,
              role: result?.role,
              type: "access",
            },
            60 * 15
          );

          const refreshToken = createToken(
            {
              id: result?._id,
              role: result?.role,
              type: "refresh",
            },
            60 * 30
          );

          //add token in response
          res.set("x-accessToken", accessToken);
          res.set("x-refreshToken", refreshToken);

          //send response
          res
            .status(200)
            .send({ message: "Login successful", data: pickAdmin(result) });
        } else {
          //invalid password
          return handleErrorResponse(404, "Invalid password!");
        }
      })
      .catch((err) => {
        //invalid email
        return handleErrorResponse(404, "Could not login", err);
      });
  },

  validateToken(req, res) {
    const { token } = req.body;
    const status = verifyToken(token);

    if (status) {
      // valid token
      res.status(200).send({ message: "Token is valid", data: { token } });
    } else {
      // invalid token
      res.status(403).send({ error: null, message: "Invalid Token" });
    }
  }, //validateToken

  refreshToken(req, res) {
    const { accessToken, refreshToken } = req.body;

    // validate the refreshToken if it is valid then generate the accessToken
    const payload = verifyToken(refreshToken);
    if (payload) {
      // generate accessToken
      const atoken = createToken(
        {
          id: payload.id,
          role: payload.role,
          type: "access",
        },
        60 * 15
      );

      const rtoken = createToken(
        {
          id: payload.id,
          role: payload.role,
          type: "refresh",
        },
        60 * 30
      );

      res
        .status(200)
        .send({ data: { atoken, rtoken }, message: "Token Refreshed..." });
    } else {
      // invalid refreshToken

      // send error response
      res.status(406).send({ message: "Token is Expired", error: null });
    }
  },
};
