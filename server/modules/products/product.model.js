const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");

const { ObjectId } = Schema.Types;

const productSchema = new Schema({
  category: { type: ObjectId, ref: "Category" },
  name: { type: String, required: true },
  sku: { type: String },
  details: { type: String },
  images: [{ type: String }],
  brand: { type: String },
  price: { type: String },
  quantity: { type: String },
  ...commonSchema,
});

module.exports = model("Product", productSchema);
