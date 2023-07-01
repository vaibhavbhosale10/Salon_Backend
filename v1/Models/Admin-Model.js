const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const adminSchema = new mongoose.Schema({
  adminId: Number,
  firstName: { type: String, minlength: 3, maxlength: 45, required: true },
  lastName: { type: String, minlength: 3, maxlength: 45, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: { type: String, minlength: 6, required: true },
  role: { type: String, required: true },
  status: { type: Number, min: 0, max: 10, required: true },
});

module.exports = mongoose.model("admin", adminSchema);
adminSchema.plugin(autoIncrement, { inc_field: "adminId" });
