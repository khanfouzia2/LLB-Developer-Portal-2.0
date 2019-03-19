
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
var cookieParser = require('cookie-parser')

// Routes
const routeName = require('./routes/main.js');
const usersRoute = require('./routes/user.js');
const newsRoute = require('./routes/news.js');
const toolsRoute = require('./routes/tools.js');

const authentication = require('./services/authentication.js');
const port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
// Middleware
app.use(cors({credentials: true, origin: true}))

app.use('/users', usersRoute);
app.use('/news', newsRoute);
app.use('/tools', toolsRoute);
app.use('/', authentication, routeName);

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});


module.exports = {app};
