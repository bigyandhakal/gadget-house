const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

module.exports = {
  isActive: { type: Boolean, default: true },
  
  isArchived: { type: Boolean, default: false },

  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },

  created_by: { type: ObjectId, ref: "User" },
  updated_by: { type: ObjectId, ref: "User" },
};
