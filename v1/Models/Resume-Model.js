const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const resumeSchema = new mongoose.Schema({
  resumeId: Number,
  firstName: { type: String, minlength: 3, maxlength: 45, required: true },
  lastName: { type: String, minlength: 3, maxlength: 45, required: true },
  mobile: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  country: String,
  state: String,
  city: String,
  resume: String,
});

module.exports = mongoose.model("resumes", resumeSchema);
resumeSchema.plugin(autoIncrement, { inc_field: "resumeId" });
