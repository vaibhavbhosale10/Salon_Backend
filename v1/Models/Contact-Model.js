const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ContactSchema = new mongoose.Schema({
  contactId: Number,
  firstName: { type: String, minlength: 3, maxlength: 45, required: true },
  lastName: { type: String, minlength: 3, maxlength: 45, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true,
    required: true,
  },
  mobile: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
  message: String,
});

module.exports = mongoose.model("contacts", ContactSchema);
ContactSchema.plugin(autoIncrement, { inc_field: "contactId" });
