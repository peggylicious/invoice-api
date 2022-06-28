const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


const invoiceRoutes = require('./routes/invoice')
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
module.exports = app;