const adminModel = require("../Models/Admin-Model");
const { encrypt } = require("../Helpers/Encryption");
const _ = require("lodash");

const adminCtrl = {
  pickAdmin(admin) {
    return _.pick(admin, [
      "_id",
      "name.first",
      "name.last",
      "email",
      "status",
      "role",
      "adminId",
    ]);
  },

  createAdmin(req, res) {
    const admin = req.body;

    // "abcd123"  -> "vnoanv nciaoj naknfcoap" -->   encryption
    if (admin.password) admin.password = encrypt(admin.password);

    new adminModel(admin)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Admin Created", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the admin", error: err });
      });
  }, //createAdmin

  updateAdmin(req, res) {
    const admin = req.body;
    const { id } = req?.params;
    if (admin.password) admin.password = encrypt(admin.password);

    adminModel.updateOne({ _id: id }, admin).then((result) => {
      if (!result) throw new Error("admin is not available!");
      res
        .status(200)
        .send({ message: "admin Updated", data: result })
        .catch((err) => {
          console.error(err);
          res
            .status(404)
            .send({ message: "Could not updated the admin", error: err });
        });
    });
  }, //updateAdmin

  deleteAdmin(req, res) {
    const { id } = req?.params;

    adminModel
      .deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "admin Deleted", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the admin", error: err });
      });
  }, //deleteAdmin

  fetchOneAdmin(req, res) {
    const { id } = req?.params;

    adminModel
      .findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "admin Record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The admin is not available", error: err });
      });
  }, //fetchOneAdmin

  fetchAllAdmin(req, res) {
    adminModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "admins List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The admins are not available", error: err });
      });
  }, //fetchAllAdmin
};

module.exports = adminCtrl;
