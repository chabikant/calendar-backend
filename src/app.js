require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require("cors")
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const User = require('./models/User');

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("DB Connected")
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
 }));
 
app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/auth', authRoutes);
app.use('/event', eventRoutes);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
