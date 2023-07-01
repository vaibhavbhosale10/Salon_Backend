const resumeModel = require("../Models/Resume-Model");

const resumeCtrl = {
  createResume(req, res) {
    const resume = req.body;
    console.log("Resume Received: ", resume);

    console.log("File: ", req.file);
    if (req.file) resume.proof = `Received-Resumes/${req.file.filename}`;

    new resumeModel(resume)
      .save()
      .then((result) => {
        res.status(201).send({
          message: "Resume sent..We will get back to you soon..",
          data: result,
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the resume", error: err });
      });
  }, //createResume

  updateResume(req, res) {
    const resume = req.body;
    const { id } = req?.params;
    if (req.file) resume.proof = `Received-Resumes/${req.file.filename}`;

    resumeModel.updateOne({ _id: id }, resume).then((result) => {
      res
        .status(200)
        .send({ message: "Resume updated", data: result })
        .catch((err) => {
          console.error(err);
          res
            .status(404)
            .send({ message: "Could not updated the resume", error: err });
        });
    });
  }, //updateResume

  deleteResume(req, res) {
    const { id } = req?.params;

    resumeModel
      .deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Resume deleted", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the resume", error: err });
      });
  }, //deleteResume
  fetchOneResume(req, res) {
    const { id } = req?.params;

    resumeModel
      .findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Resumes record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Resume is not available", error: err });
      });
  }, //fetchOneResume

  fetchAllResume(req, res) {
    resumeModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "Resume List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The resumes are not available", error: err });
      });
  }, //fetchAllResume
};

module.exports = resumeCtrl;
