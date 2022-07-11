const express = require("express");


const { body, validationResult, check } = require('express-validator');
module.exports.check =  [check('client_name').isLength({ min: 5 }).withMessage('The username at least more than 5 characters!'),
check('client_email').isEmail().withMessage('Is your email correct? Please be correct!')]
// (req, res, next) => {
//   // console.log("REQ")

//       // username must be an email
//       // console.log(check('client_name').isEmpty().withMessage("Wrong"))
  
//   const errors = validationResult(req);
//   console.log("Hi", errors)
//   if (!errors.isEmpty()) {
//     console.log(errors.array());
//     return res.status(400).json(errors.array());
//   }
//   // password must be at least 5 chars long
//   // body('password').isLength({ min: 5 })
//   next()
// }

// module.exports = bodyValidator