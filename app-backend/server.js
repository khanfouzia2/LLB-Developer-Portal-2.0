
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const routeName = require('./routes/main.js');
const usersRoute = require('./routes/user.js');
const authentication = require('./services/authentication.js');
const port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());

// Middleware
app.use(cors());

app.use('/users', usersRoute);
app.use('/', authentication, routeName);

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});


module.exports = {app};
