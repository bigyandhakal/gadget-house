const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const { validateEmail, validatePassword } = require("./user.validation");

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
  password: {
    type: String,
    required: true,
    // validate: [
    //   validatePassword,
    //   "Password must contain at least one number, uppercase, lowercase and at least 8 or more characters",
    // ],
  },
  ...commonSchema,
});

module.exports = model("User", userSchema);
