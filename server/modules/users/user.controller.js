const bcrypt = require("bcrypt");
const saltRounds = 10;
const Model = require("./user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password))
    throw new Error(
      "Password must be 8 characters long with at least one uppercase, lowercase and number"
    );
  rest.password = await bcrypt.hash(password, saltRounds);
  return await Model.create(rest);
};

const login = async (email, password) => {
  const isValidUser = await Model.findOne({ email });
  if (!isValidUser) throw new Error("User not found");
  const isValid = await bcrypt.compare(password, isValidUser.password);
  if (!isValid) throw new Error("Email or password invalid");
  return true;
};

module.exports = { create, login };
