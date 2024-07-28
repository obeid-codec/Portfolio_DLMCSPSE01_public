var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const createAdminUser = require('./scripts/createAdmin'); // Include the script


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const study = require('./routes/studyGroups');
const posts = require('./routes/post');
const events = require('./routes/event');
var app = express();

// configure cors
app.use(cors());
// configure dotEnv
dotEnv.config({ path: './.env' });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/studygroups', study);
app.use('/api/posts', posts);
app.use('/api/events', events);



// configure mongodb connection


const mongoURI = process.env.MONGO_URI;
console.log('Environment Variables:', process.env);
console.log('Connecting to MongoDB with URI:', mongoURI);



mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected...')
        createAdminUser()
    })
    .catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

module.exports = app;
