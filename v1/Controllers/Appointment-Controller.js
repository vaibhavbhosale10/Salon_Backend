const appointmentModel = require("../Models/Appointment-Model");

const AppointmentCtrl = {
  pickAppointment(appointment) {
    return _.pick(appointment, [
      "name.first",
      "name.last",
      "mobile",
      "date",
      "time",
    ]);
  },

  createAppointment(req, res) {
    const appointment = req.body;

    new appointmentModel(appointment)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Appointment Created", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the appointment", error: err });
      });
  }, //createAppointment

  updateAppointment(req, res) {
    const appointment = req.body;
    const { id } = req?.params;

    appointmentModel.updateOne({ _id: id }, appointment).then((result) => {
      if (!result) throw new Error("Appointment is not available!");
      res
        .status(200)
        .send({ message: "Appointment Updated", data: result })
        .catch((err) => {
          console.error(err);
          res
            .status(404)
            .send({ message: "Could not updated the appointment", error: err });
        });
    });
  }, //updateAppointment

  deleteAppointment(req, res) {
    const { id } = req?.params;

    appointmentModel
      .deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Appointment Deleted", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the appointment", error: err });
      });
  }, //deleteAppointment

  fetchOneAppointment(req, res) {
    const { id } = req?.params;

    appointmentModel
      .findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Appointment Record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The appointment is not available", error: err });
      });
  }, //fetchOne

  fetchAllAppointment(req, res) {
    appointmentModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "Appointments List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The appointments are not available", error: err });
      });
  }, //fetchAll
};

module.exports = AppointmentCtrl;
