const mongoURI = require('./util/protected').mongoURI;
const path = require('path');

const stats = require('./models/stats');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const helmet = require('helmet');
const compression = require('compression');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const badgeRoutes = require('./routes/badge');

const app = express();
const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'stridestudy secret code',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/badge', badgeRoutes);

app.get('**', (req, res, next)=> {res.sendFile(path.join(__dirname, 'public', 'index.html'))});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(404).json(error);
});

Stats.findOne().then(stats => {
    if (!stats) {
        const statsObj = new Stats({
            totalTimeStamps: 0,
            milestonesCreated: 0,
            totalStudyTime: 0
        })
    }
}).catch()

mongoose.connect(mongoURI)
    .then(()=> {
        console.log('Connected, listening on port 3000');
        app.listen(3000);
    })
    .catch(err => console.log('MongoDB Connection Error: ', err));