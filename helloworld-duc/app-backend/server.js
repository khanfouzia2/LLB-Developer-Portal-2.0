
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
// Middleware to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/' , (req, res) => {
    res.send("Hello World from LLB project - backend part");
});

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});

module.exports = {app};
