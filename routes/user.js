const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../models/user");

const router = express.Router({ mergeParams: true });

router.post('/create', (req, res, next) => {
    let user = new userSchema({
    id: new mongoose.Types.ObjectId(),
    user_name: req.body.user_name,
    company_name: req.body.company_name,
    last_invoice_digit: 0
    })
    user.save().then(result => {
        res.status(200).json({result})
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router