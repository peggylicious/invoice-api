const express = require("express");
const mongoose = require("mongoose");
const invoice = require("../models/invoice");

const router = express.Router({ mergeParams: true });
router.post("/create", (req, res, next) => {
    // invoice.find(invoice_id: req.body.invoice_id)
  const neInvoice = new invoice({
    id: new mongoose.Types.ObjectId(),
    invoice_id: req.body.invoice_id, // String is shorthand for {type: String}
    created_at: req.body.created_at,
    payment_due: req.body.payment_due,
    description: req.body.descr,
    payment_terms: req.body.payment_terms,
    client_name: req.body.client_name,
    client_email: req.body.client_email,
    status: req.body.status,
    senderAddress: {
      street: req.body.sender_address.street,
      city: req.body.sender_address.city,
      postCode: req.body.sender_address.post_code,
      country: req.body.sender_address.country,
    },
    clientAddress: {
      street: req.body.client_address.street,
      city: req.body.client_address.city,
      postCode: req.body.client_address.post_code,
      country: req.body.client_address.country,
    },
    items: req.body.items,
    total: req.body.total,
  });

  neInvoice
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;