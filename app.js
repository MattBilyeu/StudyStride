const mongoURI = require('./util/protected').mongoURI;
const path = require('path');

const Stats = require('./models/stats');
const Admin = require('./models/admin');
const bcrypt = require('bcrypt');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const secret = require('./util/protected').secret;
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
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/badge', badgeRoutes);

app.get('/landing', (req, res, next)=> {res.sendFile(path.join(__dirname, 'public', 'landing.html'))});

app.get('**', (req, res, next)=> {res.sendFile(path.join(__dirname, 'public', 'index.html'))});

Admin.findOne().then(admin => { //Checks if there is an admin.  If there isn't then it creates one.  This is to ensure that one can never delete the last admin.
    if (!admin) {
        bcrypt.hash('TempPassword', 12)
            .then(hashedPassword => {
                const newAdmin = new Admin({
                    name: 'Admin',
                    email: 'admin@admin.com',
                    password: hashedPassword,
                });
                newAdmin.save()
            })
            .catch(err => {
                console.log(err)
            }) 
    }
})

Stats.findOne().then(stats => { //Ensures that the stats object exists.  This is for use on the admin side to access app statistics.
    if (!stats) {
        const statsObj = new Stats({
            totalTimeStamps: 0,
            milestonesCreated: 0,
            totalStudyTime: 0
        });
        statsObj.save()
    }
}).catch()

mongoose.connect(mongoURI)
    .then(()=> {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log('MongoDB Connection Error: ', err));