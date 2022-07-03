const express = require("express");
const mongoose = require("mongoose");
const invoice = require("../models/invoice");
const user = require("../models/user");
const invoiceNo = require("../module/invoiceNo")

const router = express.Router({ mergeParams: true });
router.post("/create", (req, res, next) => {
  // invoice.find(invoice_id: req.body.invoice_id)
  const newInvoice = new invoice({
    id: new mongoose.Types.ObjectId(),
    invoice_id: '', // String is shorthand for {type: String}
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
    items: [],
    total: req.body.total,
  });
  user.findOne({ user_name: req.body.user_name }).then((result) => {
    console.log("found user");
    let newValue = result.last_invoice_digit++
    newInvoice.invoice_id = invoiceNo(newValue);
    newInvoice.items.push(...req.body.items); //Copy list items from req.body.items into new "items" list in mongoose
    user.last_invoice_digit = newValue; //Create invoice serialized number
    newInvoice
      .save()
      .then((result_0) => {
        console.log("Saved Invoice");

        return user.updateOne(
          { user_name: req.body.user_name },
          { last_invoice_digit: result.last_invoice_digit++ }
        );
      })
      .then((x) => {
        console.log(x)
        console.log("Updated user")
        res.status(200).json(x)
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

router.get("/all", (req, res, next) => {
  invoice
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.delete("/delete/:invoice_id", (req, res, next) => {
  invoice
    .deleteOne({ invoice_id: req.params.invoice_id })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.put("/update/:invoice_id", (req, res, next) => {
  invoice
    .find({ invoice_id: req.params.invoice_id })
    .then((result) => {
      let modifiedItems = req.body;
      let invoiceItemKeys = Object.keys(result[0].toObject());
      invoiceItemKeys.filter((element, index) => {
        // Looks for items to be modified
        if (modifiedItems.hasOwnProperty(element)) {
          // If property exists both in request.body and document
          result[0][element] = modifiedItems[element];
        }
      });
      return result[0].save();
    })
    .then((x) => {
      res.status(200).json(x);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
