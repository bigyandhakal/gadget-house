const Model = require("./user.model");

const create = async (payload) => {
  return await Model.create(payload);
};

const login = async (email, password) => {
//   return await Model.create(email, password);
};

module.exports = { create, login };
