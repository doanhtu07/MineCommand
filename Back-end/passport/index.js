const { PrismaClient } = require('@prisma/client'),
    loginStrategy = require("./strategies/login.strategy"),
    signupStrategy = require("./strategies/signup.strategy"),
    facebookStrategy = require("./strategies/facebook.strategy");
const prisma = new PrismaClient();

const setupPassport = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
      
    passport.deserializeUser(function(email, done) {
        prisma.user.findOne({
            where: {
                email
            },
        })
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
    });

    passport.use('local-login', loginStrategy);
    passport.use('local-signup', signupStrategy);
    passport.use(facebookStrategy);
}

module.exports = { setupPassport };