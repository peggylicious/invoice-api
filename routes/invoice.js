const express = require("express");
const mongoose = require("mongoose");
// const invoice = require("../models/invoice");
// const user = require("../models/user");
// const invoiceNo = require("../module/invoiceNo")

const router = express.Router({ mergeParams: true });
const isLoggedIn = require("../middleware/isLoggedIn");
const invoice = require("../controllers/invoice");
const { body, validationResult, check } = require("express-validator");
const isValid = require("../middleware/validator")
router.post(
  "/create",
  isValid.check,
  // check(['client_name', "client_email"]).isLength({min: 1 , max: 50}).withMessage("Wrong").withMessage("Empty value"),
  invoice.createInvoice
);

router.get("/all", isLoggedIn, invoice.getAllInvoices);
router.get("/invoice/:invoice_id", invoice.getInvoice)
router.delete("/delete/:invoice_id", invoice.deleteInvoice);
router.put("/update/:invoice_id", invoice.updateInvoice);

module.exports = router;
