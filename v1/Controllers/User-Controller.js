const UsersModel = require("../Models/Users-Model");
const { encrypt } = require("../Helpers/Encryption");
const _ = require("lodash");

const userCtrl = {
  pickUser(user) {
    return _.pick(user, [
      "_id",
      "name.first",
      "name.last",
      "email",
      "status",
      "role",
      "userId",
    ]);
  },

  createUser(req, res) {
    const user = req.body;

    // "abcd123"  -> "vnoanv nciaoj naknfcoap" -->   encryption
    if (user.password) user.password = encrypt(user.password);

    new UsersModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User Created successfully", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the user", error: err });
      });
  }, //createUser

  updateUser(req, res) {
    const user = req.body;
    const { id } = req?.params;
    if (user.password) user.password = encrypt(user.password);

    UsersModel.updateOne({ _id: id }, user).then((result) => {
      if (!result) throw new Error("User is not available!");
      res
        .status(200)
        .send({ message: "User Updated", data: result })
        .catch((err) => {
          console.error(err);
          res
            .status(404)
            .send({ message: "Could not updated the user", error: err });
        });
    });
  }, //updateUser

  deleteUser(req, res) {
    const { id } = req?.params;

    UsersModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "User Deleted", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the user", error: err });
      });
  }, //deleteUser

  fetchOne(req, res) {
    const { id } = req?.params;

    UsersModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "User Record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The user is not available", error: err });
      });
  }, //fetchOne

  fetchAll(req, res) {
    UsersModel.find()
      .then((result) => {
        res.status(200).send({ message: "Users List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The users are not available", error: err });
      });
  }, //fetchAll
};

module.exports = userCtrl;
