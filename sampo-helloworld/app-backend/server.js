
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.send("Hello World from LLB project - backend part");
});

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});

module.exports = {app};
