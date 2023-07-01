const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userId: Number,
  firstName: { type: String, minlength: 3, maxlength: 45, required: true },
  lastName: { type: String, minlength: 3, maxlength: 45, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("users", userSchema);
userSchema.plugin(autoIncrement, { inc_field: "userId" });
