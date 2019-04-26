
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const passport = require('passport');
require('dotenv').config()


// Routes
const routeName = require('./routes/main.js');
const usersRoute = require('./routes/user.js');
const newsRoute = require('./routes/news.js');
const toolsRoute = require('./routes/tools.js');
const forumRoute = require('./routes/forum.js');
const googleAuthRoute = require('./routes/googleAuth.js')
const authentication = require('./services/authentication.js');
const mobileAppRoute = require('./routes/mobileApp.js');
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
// Middleware
app.use(cors({credentials: true, origin: true}))
app.use(passport.initialize());

app.use('/users', usersRoute);
app.use('/news', newsRoute);
app.use('/tools', toolsRoute);
app.use('/auth', googleAuthRoute)
app.use('/forum', forumRoute)
app.use('/mobileapps', mobileAppRoute);
app.use('/', routeName);

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});


module.exports = {app};
