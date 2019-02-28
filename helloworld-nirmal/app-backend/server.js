const express = require('express');
const bodyParser = require('body-parser');
const port = 8081;

var app = express();

app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.send("Hello World from LLB project - backend part");
});

app.get('*' , (req, res) => {
    res.send("Error. Please check the URL");
});

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});

module.exports = {app};
