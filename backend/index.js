const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const env= require('dotenv');
const api = require('./routes/user.routes')
env.config();
mongoose
  .connect(process.env.DB_CONNECTION)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)


app.use(cors())
app.use('/public', express.static('public'))
app.use('/api', api)
const PORT = process.env.PORT || 4000

// ----------------------deployment----------------------

if(process.env.NODE_ENV =="production"){
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}

// ----------------------deployment----------------------

const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'))
  })
})
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})