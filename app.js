const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


const invoiceRoutes = require('./routes/invoice');
userRoutes = require('./routes/user')
mongoose.connect(`${process.env.MONGODB_URI}`, {
    // useMongoClient: true
    // useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors())

app.use('/invoice', invoiceRoutes)
app.use('/user', userRoutes)

// error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
      res.status(error.status || 500).json({
        // error: {
          status: error.status || 500,
          message: error.message || 'Internal Server Error',
        // },
      });
    });
module.exports = app;