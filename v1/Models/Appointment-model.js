const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const AppointmentSchema = new mongoose.Schema({
  apptId: Number,
  firstName: { type: String, minlength: 3, maxlength: 45, required: true },
  lastName: { type: String, minlength: 3, maxlength: 45, required: true },
  mobile: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
  date: Date,
  time: String,
  services: String,
});

module.exports = mongoose.model("appointments", AppointmentSchema);
AppointmentSchema.plugin(autoIncrement, { inc_field: "apptId" });
