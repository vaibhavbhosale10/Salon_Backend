const ContactModel = require("../Models/Contact-Model");

const ContactCtrl = {
  pickContact(contact) {
    return _.pick(contact, [
      "contactId",
      "firstName",
      "lastName",
      "email",
      "mobile",
      "message",
    ]);
  },

  createContact(req, res) {
    const contact = req.body;

    new ContactModel(contact)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "Thank you for reaching out to us!", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the contact", error: err });
      });
  }, //createContact

  updateContact(req, res) {
    const contact = req.body;
    const { id } = req?.params;

    ContactModel.updateOne({ _id: id }, contact).then((result) => {
      if (!result) throw new Error("Contact is not available!");
      res
        .status(200)
        .send({ message: "Contact Updated", data: result })
        .catch((err) => {
          console.error(err);
          res
            .status(404)
            .send({ message: "Could not updated the contact", error: err });
        });
    });
  }, //updateContact

  deleteContact(req, res) {
    const { id } = req?.params;

    ContactModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Contact Deleted", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the Contact", error: err });
      });
  }, //deleteContact

  fetchOneContact(req, res) {
    const { id } = req?.params;

    ContactModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Contact Record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The contact is not available", error: err });
      });
  }, //fetchOne

  fetchAllContacts(req, res) {
    ContactModel.find()
      .then((result) => {
        res.status(200).send({ message: "Contacts List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The contacts are not available", error: err });
      });
  }, //fetchAll
};

module.exports = ContactCtrl;
