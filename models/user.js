const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
  user_name: String,
  deleted_invoice_id: Array,
//   items: [],
  last_invoice_digit: Number,
  company_name: String
});

module.exports = mongoose.model("user", userSchema);