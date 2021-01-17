"use strict";
// Envairoment file
if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config()
}

//Import
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Log confing
var morgan = require('morgan')
app.use(morgan('HTTP_VERSION(:http-version) :method :url STATUS(:status) REMOTE_ADDR(:remote-addr) RESPONSE_TIME(:response-time[4]) TOTOAL_TIME(:total-time[4])'))

//Route import
const postLogin = require("./route/post.login")

//Route
app.use("/login", postLogin)

//Listen
app.listen(port, () => {
  console.log(`Versioner_Auth_Service listening PORT:${port}`)
})