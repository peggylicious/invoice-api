const mongoose = require("mongoose");
const { Schema } = mongoose;
const invoiceSchema = mongoose.Schema({
  invoice_id: String, // String is shorthand for {type: String}
  created_at: String,
  payment_due: String,
  description: String,
  payment_terms: String,
  client_name: String,
  client_email: String,
  status: String,
  senderAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  clientAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  items: {
      type: Array
  },
  total: Number
});

module.exports = mongoose.model("invoice", invoiceSchema);
