try {
    require('./config/config');
} catch(err) {
    console.log("No config found. Using default ENV.");
}
const { 
    PORT: port,
} = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express()
    , passport = require('passport')
    , { setupPassport } = require('./passport')
    , session = require("express-session")
    , fs = require('fs');

const { PrismaClient } = require('@prisma/client')
    , LocalStrategy = require('passport-local').Strategy;
const prisma = new PrismaClient();
const { indices } = require('./algolia');

var multer = require('multer');
var upload = multer();

// for parsing multipart/form-data
app.use(upload.any()); 

app.use(cors());
app.use(session({ 
    secret: "tudope",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

setupPassport(passport);

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'/*, 'https://obscure-badlands-88487.herokuapp.com/'*/);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//every 1 day, delete expired verification
const deleteExpiredVerification = () => {
    let date = new Date();
    date = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear(); 
    prisma.userVerification.deleteMany({
        where: {
            expiredAt: date
        }
    })
    .then(res => {
        console.log('Deleted', res, 'items');
    })
    .catch(err => {
        console.log(err);
    })
}

function setDaysTimeout(callback, days) {
    // 86400 seconds in a day
    var msInDay = 86400*1000; 

    var dayCount = 0;
    var timer = setInterval(function() {
        dayCount++;  // a day has passed

        if(dayCount == days) {
           clearInterval(timer);
           callback.apply(this,[]);
        }
    }, msInDay);
}

setDaysTimeout(deleteExpiredVerification, 1); 

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/login' 
    })
);

app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) { 
            return res.sendStatus(500); 
        }
        if (!user) { 
            return res.status(401).send(info);
        }
        req.logIn(user, err => {
            if (err) { return res.sendStatus(500); }
            return res.redirect('/');
        });
    })(req, res, next);
})

// This is local sign up
app.post('/auth/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, info) => {
        if (err) { 
            return res.sendStatus(500); 
        }
        else { 
            return res.status(401).send(info);
        }
    })(req, res, next);
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.use('/user', (req, res) => {
    res.send(req.user);
});

app.use('/cardPost', require('./routes/cardPost.route'));

app.use('/userData', require('./routes/user.route'));

app.use('/photo', require('./routes/photo.route'));

app.use('/verification/:tokenId', (req, res) => {
    const tokenId = req.params.tokenId;
    prisma.userVerification.findOne({
        where: {
            id: tokenId
        }
    })
    .then(token => {
        if(token) {
            return prisma.user.create({
                data: {
                    name: token.email,
                    email: token.email,
                    password: token.password,
                }
            })
        }
        res.redirect('/verifyFail');
        return;
    })
    .then(newUser => {
        if(newUser) {
            newUser.objectID = newUser.id;
            indices.users_index.saveObject(newUser, {
                autoGenerateObjectIDIfNotExist: true,
            });
            prisma.userVerification.delete({
                where: {
                    id: tokenId
                }
            })
            .then(() => {
                req.logIn(newUser, err => {
                    if (err) { 
                        return res.sendStatus(500); 
                    }
                    return res.redirect('/verifySuccessful');
                });
            })
            .catch(err => {
                console.log(err);
            })

        }
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
