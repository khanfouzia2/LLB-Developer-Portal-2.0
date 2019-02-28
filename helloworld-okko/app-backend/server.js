const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.json());

// ---

// Middleware to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/' , (req, res) => {
    res.send("Hello World from LLB project - backend part");
});

app.get('/hello.json', function(req, res) {
    
    res.type('json');
    res.json({
        message: "Hello :3", 
        imgUrl: "https://avatars0.githubusercontent.com/u/5833555?s=460&v=4"
    });
    res.status(200);
    
    //
    console.log("Request params: " + req.params);
   
    
});

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});

module.exports = {app};
