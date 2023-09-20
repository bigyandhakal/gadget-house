const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const {validateEmail} = require("./user.validation")

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: { type: String, required:true },
  ...commonSchema,
});

module.exports = model("User", userSchema);
