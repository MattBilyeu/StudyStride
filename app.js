const mongoURI = require('./util/protected').mongoURI;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'stridestudy secret code',
    resave: false,
    saveUninitialized: false,
    store: store
}));

mongoose.connect(mongoURI)
    .then(()=> {
        console.log('Connected, listening on port 3000');
        app.listen(3000);
    })
    .catch(err => console.log('MongoDB Connection Error: ', err));